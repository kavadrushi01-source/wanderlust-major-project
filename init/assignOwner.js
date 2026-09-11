const mongoose = require('mongoose');
const Listing = require('../models/listing');
const User = require('../models/user');

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    const users = await User.find();
    if (users.length === 0) {
        console.log("No users found in DB. Create a user first.");
        mongoose.connection.close();
        return;
    }

    console.log(`Found ${users.length} user(s): ${users.map(u => u.username).join(', ')}`);

    const listings = await Listing.find({ owner: { $exists: false } });
    if (listings.length === 0) {
        console.log("All listings already have owners. Skipping.");
        mongoose.connection.close();
        return;
    }

    console.log(`Assigning ${listings.length} listings across ${users.length} user(s)...`);

    for (let i = 0; i < listings.length; i++) {
        const user = users[i % users.length];
        await Listing.findByIdAndUpdate(listings[i]._id, { owner: user._id });
        console.log(`  "${listings[i].title}" -> ${user.username}`);
    }

    console.log("Done!");
    mongoose.connection.close();
}

main();
