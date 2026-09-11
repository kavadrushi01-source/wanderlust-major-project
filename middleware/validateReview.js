const { reviewschema } = require('../schema');
const ExpressError = require('../utils/ExpressError');

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};
