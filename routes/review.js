const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const reviewController = require('../controllers/reviewController');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isReviewAuthor } = require('../middleware/isReviewAuthor');
const { validateReview } = require('../middleware/validateReview');

// Reviews
// Post Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;
