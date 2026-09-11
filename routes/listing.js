const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const listingController = require('../controllers/listingController');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { isOwner } = require('../middleware/isOwner');
const { validateListing } = require('../middleware/validateListing');
const { upload } = require('../config/cloudinary');

// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Create Route
router.post("/", isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;
