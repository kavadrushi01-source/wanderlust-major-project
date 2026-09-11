const Joi = require('joi');

module.exports.listingschema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null).optional(),
        category: Joi.string().valid(
            "Trending", "Beachfront", "Cabins", "Camping", "Castles", "Farms",
            "Rooms", "Lakefront", "Pools", "Islands", "Arctic", "Caves",
            "Beach", "Villas", "Iconic Cities", "Desert", "Mountains",
            "Treehouses", "Ski-in/Ski-out"
        ).default("Trending"),
        geometry: Joi.object({
            type: Joi.string().valid('Point').default('Point'),
            coordinates: Joi.array().items(Joi.number()).length(2).default([0, 0]),
        }).optional(),
    }).required(),
});


module.exports.reviewschema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required(),
});