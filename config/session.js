const session = require('express-session');
// connect-mongo v6 ships as an ES module; in CommonJS the store is the named
// "MongoStore" export (the default export is the same class).
const { MongoStore } = require('connect-mongo');

// Sessions are kept in MongoDB instead of the default in-memory store, so
// people stay logged in when the app restarts, redeploys, or wakes up after
// sleeping on a free hosting plan.
const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

const ONE_WEEK_IN_SECONDS = 7 * 24 * 60 * 60;

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGO_URL,
        collectionName: "sessions",
        ttl: ONE_WEEK_IN_SECONDS,
        touchAfter: 24 * 60 * 60, // refresh the stored session at most once a day
    }),
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        // "auto" lets express-session decide per request: HTTPS (behind the
        // hosting platform's proxy, see "trust proxy" in app.js) gets a secure
        // cookie, plain HTTP on localhost gets a normal one. This also survives
        // the session regeneration that passport does when somebody logs in.
        secure: "auto",
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

module.exports = (app) => {
    app.use(session(sessionOptions));
};
