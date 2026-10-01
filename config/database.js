const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Never print credentials that can be part of the connection string
const safeUrl = MONGO_URL.replace(/\/\/[^@]*@/, "//***@");

// Reuse the same connection promise across Vercel serverless invocations
// that share a warm Node process — avoids opening a new connection per request.
if (!global.__wanderlust_mongo_promise__) {
    if (!process.env.MONGO_URL) {
        console.warn("MONGO_URL is not set - falling back to a local MongoDB on 127.0.0.1:27017");
    }
    global.__wanderlust_mongo_promise__ = mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 })
        .then(() => {
            console.log(`Connected to MongoDB (${safeUrl})`);
            return mongoose;
        })
        .catch(err => {
            console.error("Could not connect to MongoDB:", err.message);
            console.error("Check that MONGO_URL is correct and that your current IP is allowed in MongoDB Atlas.");
            // Clear the cached promise so the next request retries instead of
            // reusing a rejected promise forever on a long-lived container.
            global.__wanderlust_mongo_promise__ = null;
            return mongoose;
        });
}

mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected."));
mongoose.connection.on("reconnected", () => console.log("MongoDB reconnected."));

module.exports = mongoose;
