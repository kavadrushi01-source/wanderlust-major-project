require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError.js');

// Every host (Koyeb, Back4App, Northflank, Zeabur, Railway, Nginx, ...) puts
// the app behind a TLS-terminating reverse proxy. Trusting the first proxy
// lets Express see the real protocol/IP from the X-Forwarded-* headers.
app.set("trust proxy", 1);

// Config
require('./config/database');
require('./config/session')(app);
require('./config/passport')(app);

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(flash());

// Flash messages middleware
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.searchTerm = "";
    res.locals.selectedCategory = "";
    next();
});

// Routes
const listingRoutes = require('./routes/listing.js');
const reviewRoutes = require('./routes/review.js');
const userRoutes = require('./routes/user.js');

// Redirect root to listings
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// Health check - used by the Docker HEALTHCHECK and by hosting platforms
app.get("/healthz", (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1;
    res.status(dbConnected ? 200 : 503).json({
        status: dbConnected ? "ok" : "degraded",
        database: dbConnected ? "connected" : "disconnected",
        uptime: Math.round(process.uptime()),
    });
});

// Error handling
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    if (err.name === "CastError") {
        statusCode = 404;
        message = "Invalid listing id";
    }
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map(e => e.message).join(", ");
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        statusCode = 400;
        message = "Duplicate value entered. Please use a different value.";
    }
    res.status(statusCode).render("error.ejs", { message, statusCode });
});

const PORT = process.env.PORT || 8080;

// Vercel (serverless) imports this file and serves the exported app itself,
// so only open a listening socket on classic long-lived hosts / localhost.
if (!process.env.VERCEL) {
    const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on port ${PORT}`);
    });

    // Container hosts send SIGTERM when they stop or redeploy an instance,
    // so close the server and the database connection instead of being killed.
    process.on("SIGTERM", () => {
        console.log("SIGTERM received - shutting down gracefully");
        server.close(() => {
            mongoose.connection.close(false).finally(() => process.exit(0));
        });
    });
}

module.exports = app;
