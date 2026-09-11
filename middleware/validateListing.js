const { listingschema } = require('../schema');
const ExpressError = require('../utils/ExpressError');

module.exports.validateListing = (req, res, next) => {
    let { error } = listingschema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
};
