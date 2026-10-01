// Vercel serverless entry point: every request (see vercel.json rewrites)
// is forwarded here, and @vercel/node serves the exported Express app.
module.exports = require("../app.js");
