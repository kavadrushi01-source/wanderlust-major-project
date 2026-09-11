const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const { cloudinary } = require('../config/cloudinary');

module.exports.index = async (req, res) => {
    const { q, category } = req.query;
    let filter = {};

    if (q && q.trim()) {
        const escaped = q.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, "i");
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
            { description: regex },
        ];
    }

    if (category && category.trim()) {
        filter.category = category.trim();
    }

    let allListings = await Listing.find(filter);

    const categories = [
        { name: "Beachfront", icon: "fa-solid fa-umbrella-beach" },
        { name: "Cabins", icon: "fa-solid fa-house" },
        { name: "Camping", icon: "fa-solid fa-campground" },
        { name: "Castles", icon: "fa-solid fa-chess-rook" },
        { name: "Farms", icon: "fa-solid fa-seedling" },
        { name: "Rooms", icon: "fa-solid fa-bed" },
        { name: "Lakefront", icon: "fa-solid fa-water" },
        { name: "Pools", icon: "fa-solid fa-person-swimming" },
        { name: "Islands", icon: "fa-solid fa-landmark-dome" },
        { name: "Arctic", icon: "fa-solid fa-snowflake" },
        { name: "Caves", icon: "fa-solid fa-mountain" },
        { name: "Beach", icon: "fa-solid fa-sailboat" },
        { name: "Villas", icon: "fa-solid fa-hotel" },
        { name: "Iconic Cities", icon: "fa-solid fa-city" },
        { name: "Desert", icon: "fa-solid fa-sun" },
        { name: "Mountains", icon: "fa-solid fa-mountain-sun" },
        { name: "Treehouses", icon: "fa-solid fa-tree" },
        { name: "Ski-in/Ski-out", icon: "fa-solid fa-person-skiing" },
    ];

    res.render("listings/index", {
        allListings,
        coordinates: allListings.map(l => ({
            id: l._id,
            title: l.title,
            location: l.location,
            country: l.country,
            lat: l.geometry.coordinates[1],
            lng: l.geometry.coordinates[0],
            image: l.image,
            price: l.price,
        })),
        categories,
        selectedCategory: category || "",
        searchTerm: q || "",
    });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        throw new ExpressError("Listing you requested does not exist", 404);
    }
    const mapCoords = { lat: listing.geometry.coordinates[1], lng: listing.geometry.coordinates[0] };
    res.render("listings/show", { listing, mapCoords });
};

module.exports.createListing = async (req, res) => {
    let listingData = req.body.listing;
    if (listingData.price) listingData.price = Number(listingData.price);
    const newListing = new Listing(listingData);
    if (req.file) {
        newListing.image = req.file.path;
        newListing.imageFilename = req.file.filename;
    }
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressError("Listing you requested does not exist", 404);
    }
    res.render("listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listingData = { ...req.body.listing };
    if (listingData.price) listingData.price = Number(listingData.price);
    const listing = await Listing.findByIdAndUpdate(id, listingData);
    if (!listing) {
        throw new ExpressError("Listing you requested does not exist", 404);
    }
    if (req.file) {
        if (listing.imageFilename) {
            await cloudinary.uploader.destroy(listing.imageFilename);
        }
        listing.image = req.file.path;
        listing.imageFilename = req.file.filename;
        await listing.save();
    }
    req.flash("success", "Successfully listing updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        throw new ExpressError("Listing you requested does not exist", 404);
    }
    if (deletedListing.imageFilename) {
        await cloudinary.uploader.destroy(deletedListing.imageFilename);
    }
    req.flash("success", "Successfully deleted the listing!");
    res.redirect("/listings");
};
