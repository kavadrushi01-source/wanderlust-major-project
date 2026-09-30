const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Never print credentials that can be part of the connection string
const safeUrl = MONGO_URL.replace(/\/\/[^@]*@/, "//***@");

main().then(() => {
    console.log(`Connected to MongoDB (${safeUrl})`);
}).catch(err => {
    console.error("Could not connect to MongoDB:", err.message);
    console.error("Check that MONGO_URL is correct and that your current IP is allowed in MongoDB Atlas.");
});

async function main() {
    if (!process.env.MONGO_URL) {
        console.warn("MONGO_URL is not set - falling back to a local MongoDB on 127.0.0.1:27017");
    }
    await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 15000 });
}

mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected."));
mongoose.connection.on("reconnected", () => console.log("MongoDB reconnected."));

module.exports = mongoose;
