const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'listingImages',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    },
});

// 4 MB cap: Vercel Hobby serverless requests reject bodies above ~4.5 MB,
// so reject oversized/foreign files here with a clean 400 instead of a 500/504.
const upload = multer({
    storage,
    limits: { fileSize: 4 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (/^image\/(jpeg|png|gif|webp)$/.test(file.mimetype)) return cb(null, true);
        cb(new Error("Only JPG, PNG, GIF or WEBP images are allowed"));
    },
});

module.exports = { cloudinary, upload };
