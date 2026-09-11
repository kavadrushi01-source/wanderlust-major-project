const session = require('express-session');

const sessionOptions = {
    secret: process.env.SESSION_SECRET || "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
};

module.exports = (app) => {
    app.use(session(sessionOptions));
};
