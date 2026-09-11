const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wanderlust";

main().then(() => {
    console.log("Connected to MongoDB");
}).catch(err => {
    console.error(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}
