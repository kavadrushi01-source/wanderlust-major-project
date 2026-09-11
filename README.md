# Wanderlust

An **Airbnb-style rental listing platform** built with Node.js, Express, MongoDB, and EJS. Users can browse, create, review, and manage property listings with interactive maps, search, and category filters.

**Live Site:** [https://wanderlust-major-project-e5gi.onrender.com](https://wanderlust-major-project-e5gi.onrender.com)

---

## Features

- **Full CRUD Listings** — Create, view, edit, and delete property listings
- **User Authentication** — Sign up, login, logout with Passport.js
- **Image Upload** — Upload listing images via Cloudinary
- **Interactive Maps** — Leaflet.js/OpenStreetMap integration on all pages
- **Search & Filter** — Search by title/location/country and filter by 18 categories
- **Reviews & Ratings** — Leave 1-5 star ratings and comments on listings
- **Tax Toggle** — Switch between base price and 18% GST inclusive price
- **Authorization** — Only owners can edit/delete their listings
- **Flash Messages** — Success/error notifications
- **Responsive Design** — Works on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Frontend** | EJS, Bootstrap 5 |
| **Maps** | Leaflet.js + OpenStreetMap |
| **Auth** | Passport.js (local strategy) |
| **Image Upload** | Multer + Cloudinary |
| **Validation** | Joi |
| **Hosting** | Render (Free Tier) |
| **Database Hosting** | MongoDB Atlas (Free M0) |

---

## Project Structure

```
wanderlust-major-project/
├── app.js                  # Main Express app
├── schema.js               # Joi validation schemas
├── package.json
├── .env                    # Environment variables (not committed)
├── .gitignore
│
├── config/
│   ├── database.js         # MongoDB connection
│   ├── passport.js         # Passport.js config
│   ├── session.js          # Express session config
│   └── cloudinary.js       # Cloudinary + Multer config
│
├── models/
│   ├── listing.js          # Listing schema
│   ├── review.js           # Review schema
│   └── user.js             # User schema
│
├── controllers/
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
│
├── routes/
│   ├── listing.js          # Listing CRUD routes
│   ├── review.js           # Review routes
│   └── user.js             # Auth routes
│
├── middleware/
│   ├── isLoggedIn.js       # Auth check
│   ├── isOwner.js          # Owner check
│   ├── isReviewAuthor.js   # Review author check
│   ├── validateListing.js  # Joi listing validation
│   └── validateReview.js   # Joi review validation
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs       # Home page
│   │   ├── show.ejs        # Single listing
│   │   ├── new.ejs         # Create form
│   │   └── edit.ejs        # Edit form
│   ├── users/
│   │   ├── signup.ejs
│   │   └── login.ejs
│   └── error.ejs
│
├── public/
│   ├── css/style.css
│   └── js/script.js
│
├── utils/
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper
│
└── init/
    ├── data.js             # Sample listing data
    ├── index.js            # Seed script
    └── seed-production.js  # Production seed script
```

---

## API Routes

| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/listings` | Home — all listings | No |
| GET | `/listings/new` | New listing form | Yes |
| POST | `/listings` | Create listing | Yes |
| GET | `/listings/:id` | Show listing | No |
| GET | `/listings/:id/edit` | Edit listing form | Yes (Owner) |
| PUT | `/listings/:id` | Update listing | Yes (Owner) |
| DELETE | `/listings/:id` | Delete listing | Yes (Owner) |
| POST | `/listings/:id/reviews` | Add review | Yes |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review | Yes (Author) |
| GET | `/signup` | Sign up page | No |
| POST | `/signup` | Register user | No |
| GET | `/login` | Login page | No |
| POST | `/login` | Login user | No |
| GET | `/logout` | Logout | Yes |

---

## Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
SESSION_SECRET=your_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

### Setup

```bash
# Clone the repository
git clone https://github.com/kavadrushi01-source/wanderlust-major-project.git
cd wanderlust-major-project

# Install dependencies
npm install

# Create .env file and add your environment variables
# (see Environment Variables section above)

# Seed the database (optional)
node init/index.js

# Start the server
node app.js
```

Server runs at `http://localhost:8080`

---

## Deployment

### MongoDB Atlas
1. Create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a free M0 cluster
3. Create a database user with read/write access
4. Allow access from anywhere (0.0.0.0/0)
5. Get the connection string and add it to `.env` as `MONGO_URL`

### Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo
4. Set build command: `npm install`
5. Set start command: `node app.js`
6. Add environment variables (MONGO_URL, SESSION_SECRET, Cloudinary keys)
7. Deploy — your site will be live in 2-3 minutes

---

## Demo Accounts

| Username | Password | Role |
|---|---|---|
| `rushi` | `666` | Listing owner |
| `hitesh` | `666` | Listing owner |

---

## Categories

The platform supports 18 property categories:

Beachfront, Cabins, Camping, Castles, Farms, Rooms, Lakefront, Pools, Islands, Arctic, Caves, Beach, Villas, Iconic Cities, Desert, Mountains, Treehouses, Ski-in/Ski-out

---

## Key Features Explained

### Interactive Maps
- **Index page:** Toggleable map showing all listing locations with markers
- **Show page:** Map centered on the listing's coordinates
- **Create/Edit:** Click the map or type a location to auto-fill coordinates

### Tax Toggle
A switch in the navbar lets users toggle between:
- Base price (e.g., ₹1,500/night)
- Price with 18% GST (e.g., ₹1,770/night)

### Search & Filter
- **Search bar:** Searches across title, location, country, and description
- **Category filter:** Airbnb-style horizontal scrollable filter bar
- Both can be combined for precise results

### Authorization
- Only the listing owner can edit or delete their listings
- Only the review author can delete their reviews
- Unauthenticated users can browse but not create/edit

---

## License

ISC

---

## Author

**Rushi Kavad**
- GitHub: [kavadrushi01-source](https://github.com/kavadrushi01-source)
