const mongoose = require('mongoose');
const initdata = require('./data');
const Listing = require('../models/listing');

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/wanderlust";

main().then(() => {
    console.log("Connected to MongoDB");
    initDB();
}).catch(err => {
    console.error(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB  = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data.map((d) => ({ ...d, image: d.image.url })));
    console.log('data inserted successfully');
    mongoose.connection.close();
}