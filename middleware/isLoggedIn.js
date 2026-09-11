module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be login");
        req.session.returnTo = req.originalUrl;
        return req.session.save(() => {
            res.redirect("/login");
        });
    }
    next();
};
