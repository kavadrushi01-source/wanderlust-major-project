const Review = require('../models/review');

module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect(`/listings/${id}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
