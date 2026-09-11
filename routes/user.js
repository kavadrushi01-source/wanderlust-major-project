const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.get("/signup", userController.renderSignupForm);

router.post("/signup", userController.signup);

router.get("/login", userController.renderLoginForm);

router.post("/login", (req, res, next) => {
    res.locals.redirectUrl = req.session.returnTo || "/listings";
    next();
}, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}), userController.login);

router.get("/logout", userController.logout);

router.get("/demouser", userController.demouser);

module.exports = router;
