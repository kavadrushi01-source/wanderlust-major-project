const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "https://st4.depositphotos.com/4749861/20384/i/1600/depositphotos_203840130-stock-photo-silhouette-coconut-palm-trees-beach.jpg",
    },
    imageFilename: {
        type: String,
    },
    price: Number,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    location: String,
    country: String,
    category: {
        type: String,
        enum: ["Trending", "Beachfront", "Cabins", "Camping", "Castles", "Farms", "Rooms", "Lakefront", "Pools", "Islands", "Arctic", "Caves", "Beach", "Villas", "Iconic Cities", "Desert", "Mountains", "Treehouses", "Ski-in/Ski-out"],
        default: "Trending",
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
});

listingSchema.post('findOneAndDelete', async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
