const mongoose = require('mongoose');
const Listing = require('../models/listing');
const Review = require('../models/review');
const User = require('../models/user');

const MONGO_URL = process.env.MONGO_URL;

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    // 1. Delete 6 listings
    const listingsToDelete = await Listing.find().limit(6);
    const deleteIds = listingsToDelete.map(l => l._id);
    await Listing.deleteMany({ _id: { $in: deleteIds } });
    console.log(`Deleted ${deleteIds.length} listings`);

    // 2. Create user rushi / 666
    let user;
    try {
        user = new User({ email: "rushi@gmail.com", username: "rushi" });
        await User.register(user, "666");
        console.log("User 'rushi' created");
    } catch (e) {
        user = await User.findOne({ username: "rushi" });
        console.log("User 'rushi' already exists, using existing");
    }

    // 3. Add 6 new listings owned by rushi
    const newListings = [
        {
            title: "Royal Palace Stay in Jaipur",
            description: "Experience the royal heritage of Rajasthan in this stunning palace hotel. Located in the Pink City with panoramic views of Nahargarh Fort.",
            image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 4500,
            location: "Jaipur",
            country: "India",
            geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
            category: "Castles",
            owner: user._id,
        },
        {
            title: "Houseboat in Kerala Backwaters",
            description: "Float through the serene backwaters of Alleppey on a traditional Kerala houseboat. Includes fresh seafood meals and sunset views.",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 3200,
            location: "Alleppey",
            country: "India",
            geometry: { type: "Point", coordinates: [76.3388, 9.4981] },
            category: "Lakefront",
            owner: user._id,
        },
        {
            title: "Beach Villa in Goa",
            description: "Wake up to the sound of waves in this luxury beachfront villa. Private pool, steps from Baga Beach, perfect for a tropical getaway.",
            image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 5500,
            location: "Goa",
            country: "India",
            geometry: { type: "Point", coordinates: [73.8567, 15.2993] },
            category: "Beachfront",
            owner: user._id,
        },
        {
            title: "Mountain Cottage in Manali",
            description: "Cozy wooden cottage surrounded by snow-capped Himalayan peaks. Perfect for couples seeking a romantic mountain retreat.",
            image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 2800,
            location: "Manali",
            country: "India",
            geometry: { type: "Point", coordinates: [77.1893, 32.2432] },
            category: "Cabins",
            owner: user._id,
        },
        {
            title: "Desert Camp in Jaisalmer",
            description: "Spend a night under the stars in the Thar Desert. Camel ride, folk music, and traditional Rajasthani dinner included.",
            image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 1800,
            location: "Jaisalmer",
            country: "India",
            geometry: { type: "Point", coordinates: [70.9137, 26.9157] },
            category: "Desert",
            owner: user._id,
        },
        {
            title: "Treehouse in Coorg",
            description: "Live among the treetops in this eco-friendly treehouse nestled in the coffee plantations of Coorg, Karnataka.",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 2200,
            location: "Coorg",
            country: "India",
            geometry: { type: "Point", coordinates: [75.7341, 12.3375] },
            category: "Treehouses",
            owner: user._id,
        },
    ];

    const createdListings = await Listing.insertMany(newListings);
    console.log(`Added ${createdListings.length} new listings`);

    // 4. Add reviews for ALL listings
    const allListings = await Listing.find({});
    const reviewers = ["foodlover", "traveler42", "wanderlust_kid", "naturefan", "beachbum"];

    const sampleComments = [
        { rating: 5, comments: [
            "Amazing place! Will definitely come back.",
            "Best stay of my life. Highly recommended!",
            "Incredible views and hospitality.",
        ]},
        { rating: 4, comments: [
            "Great location, minor issues but overall good.",
            "Loved the ambiance. Worth every penny.",
            "Comfortable stay, would recommend to friends.",
        ]},
        { rating: 3, comments: [
            "Decent place, expected a bit more.",
            "Good value for money but room for improvement.",
            "Nice location but service could be better.",
        ]},
    ];

    let reviewCount = 0;
    for (let listing of allListings) {
        // Add 2-3 reviews per listing
        const numReviews = Math.floor(Math.random() * 2) + 2;
        for (let i = 0; i < numReviews; i++) {
            const reviewerName = reviewers[Math.floor(Math.random() * reviewers.length)];
            let reviewer = await User.findOne({ username: reviewerName });
            if (!reviewer) {
                reviewer = new User({ email: `${reviewerName}@demo.com`, username: reviewerName });
                await User.register(reviewer, "demopassword");
            }

            const ratingGroup = sampleComments[Math.floor(Math.random() * sampleComments.length)];
            const comment = ratingGroup.comments[Math.floor(Math.random() * ratingGroup.comments.length)];

            const review = new Review({
                rating: ratingGroup.rating,
                comment: comment,
                author: reviewer._id,
            });

            listing.reviews.push(review);
            await review.save();
            reviewCount++;
        }
        await listing.save();
    }
    console.log(`Added ${reviewCount} reviews across ${allListings.length} listings`);

    mongoose.connection.close();
    console.log("Done!");
}

main().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
