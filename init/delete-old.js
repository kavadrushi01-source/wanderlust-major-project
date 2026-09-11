const mongoose = require('mongoose');
const Listing = require('../models/listing');
const User = require('../models/user');

async function run() {
    await mongoose.connect(process.env.MONGO_URL);
    const rushi = await User.findOne({ username: 'rushi' });
    const result = await Listing.deleteMany({ owner: { $ne: rushi._id } });
    console.log('Deleted ' + result.deletedCount + ' old listings');
    const remaining = await Listing.countDocuments();
    console.log('Listings remaining: ' + remaining);
    mongoose.connection.close();
}
run();
