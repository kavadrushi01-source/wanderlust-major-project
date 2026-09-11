const mongoose = require('mongoose');
const Listing = require('../models/listing');
const Review = require('../models/review');
const User = require('../models/user');

async function run() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // 1. Create user hitesh / 666
    let hitesh;
    try {
        hitesh = new User({ email: "hitesh@gmail.com", username: "hitesh" });
        await User.register(hitesh, "666");
        console.log("User 'hitesh' created");
    } catch (e) {
        hitesh = await User.findOne({ username: "hitesh" });
        console.log("User 'hitesh' already exists");
    }

    // 2. Add 6 new listings owned by hitesh
    const newListings = [
        {
            title: "Luxury Villa in Shimla",
            description: "Stunning hillside villa with panoramic views of the snow-capped Himalayas. Private garden, bonfire area, and modern amenities.",
            image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 3800,
            location: "Shimla",
            country: "India",
            geometry: { type: "Point", coordinates: [77.1734, 31.1048] },
            category: "Mountains",
            owner: hitesh._id,
        },
        {
            title: "Heritage Haveli in Udaipur",
            description: "Stay in a 200-year-old restored haveli overlooking Lake Pichola. Traditional Rajasthani architecture meets modern luxury.",
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 5200,
            location: "Udaipur",
            country: "India",
            geometry: { type: "Point", coordinates: [73.6785, 24.5854] },
            category: "Villas",
            owner: hitesh._id,
        },
        {
            title: "Farmhouse in Lonavala",
            description: "Escape to this peaceful farmhouse surrounded by lush green valleys. Swimming pool, BBQ area, and trekking trails nearby.",
            image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 2500,
            location: "Lonavala",
            country: "India",
            geometry: { type: "Point", coordinates: [73.4078, 18.7537] },
            category: "Farms",
            owner: hitesh._id,
        },
        {
            title: "Beach Shack in Varkala",
            description: "Minimalist beach shack perched on the cliffs of Varkala. Wake up to Arabian Sea sunsets every evening.",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 1600,
            location: "Varkala",
            country: "India",
            geometry: { type: "Point", coordinates: [76.7156, 8.7379] },
            category: "Beach",
            owner: hitesh._id,
        },
        {
            title: "Ski Resort Room in Gulmarg",
            description: "Cozy room in a ski resort with direct slope access. Gondola rides, snow activities, and Kashmiri cuisine.",
            image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 4000,
            location: "Gulmarg",
            country: "India",
            geometry: { type: "Point", coordinates: [74.3810, 34.0479] },
            category: "Ski-in/Ski-out",
            owner: hitesh._id,
        },
        {
            title: "Camping in Spiti Valley",
            description: "Rugged riverside camping in the cold desert of Spiti. Star-gazing, monastery visits, and raw Himalayan adventure.",
            image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            price: 1200,
            location: "Spiti Valley",
            country: "India",
            geometry: { type: "Point", coordinates: [78.0000, 32.2500] },
            category: "Camping",
            owner: hitesh._id,
        },
    ];

    const created = await Listing.insertMany(newListings);
    console.log(`Added ${created.length} new listings by hitesh`);

    // 3. Add reviews from hitesh for all listings
    const allListings = await Listing.find({});
    const rushi = await User.findOne({ username: "rushi" });

    const comments = [
        "Absolutely loved this place! Highly recommend.",
        "Great experience, would visit again.",
        "Amazing location and friendly host.",
        "Perfect getaway, exceeded expectations.",
        "Beautiful place, very relaxing.",
        "Worth every rupee, fantastic stay!",
        "Had an wonderful time here.",
        "The views were breathtaking!",
    ];

    let hiteshReviewCount = 0;
    let rushiReviewCount = 0;

    for (let listing of allListings) {
        // Hitesh review
        const hComment = comments[Math.floor(Math.random() * comments.length)];
        const hRating = Math.floor(Math.random() * 2) + 4; // 4 or 5
        const hReview = new Review({
            rating: hRating,
            comment: hComment,
            author: hitesh._id,
        });
        listing.reviews.push(hReview);
        await hReview.save();
        hiteshReviewCount++;

        // Rushi review
        if (rushi) {
            const rComment = comments[Math.floor(Math.random() * comments.length)];
            const rRating = Math.floor(Math.random() * 2) + 4; // 4 or 5
            const rReview = new Review({
                rating: rRating,
                comment: rComment,
                author: rushi._id,
            });
            listing.reviews.push(rReview);
            await rReview.save();
            rushiReviewCount++;
        }

        await listing.save();
    }

    console.log(`Added ${hiteshReviewCount} reviews from hitesh`);
    console.log(`Added ${rushiReviewCount} reviews from rushi`);
    console.log(`Total listings: ${allListings.length}`);

    mongoose.connection.close();
    console.log("Done!");
}

run().catch(err => {
    console.error(err);
    mongoose.connection.close();
});
