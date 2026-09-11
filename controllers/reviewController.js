const Listing = require('../models/listing');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        throw new ExpressError("Listing you requested does not exist", 404);
    }
    let reviewData = { ...req.body.review };
    reviewData.rating = Number(reviewData.rating);
    let newReview = new Review(reviewData);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "Successfully new review added!");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    let review = await Review.findByIdAndDelete(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "Successfully deleted the review!");
    res.redirect(`/listings/${id}`);
};
