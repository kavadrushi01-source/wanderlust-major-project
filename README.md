# Wanderlust

**A website where people can list their properties for rent and others can book them.**

Think of it like Airbnb — users can add their houses, villas, beach huts, etc. and other people can browse, search, and contact the owner.

**Live Website:** [https://wanderlust-major-project-e5gi.onrender.com](https://wanderlust-major-project-e5gi.onrender.com)

---

## What Can You Do on This Website?

- **Browse Listings** — See all available properties with photos, prices, and locations
- **Search** — Find properties by name, city, or country
- **Filter by Category** — Filter by Beach, Mountains, Villas, Camping, Castles, and more (18 categories)
- **View on Map** — See where each property is located on an interactive map
- **Add Your Property** — List your own property with photos, price, and location
- **Leave Reviews** — Rate and review properties you've visited
- **See Total Price** — Toggle to see price with 18% GST included
- **Sign Up / Login** — Create an account to add listings and reviews

---

## How to Use the Website

### Step 1: Open the Website
Click this link: [https://wanderlust-major-project-e5gi.onrender.com](https://wanderlust-major-project-e5gi.onrender.com)

### Step 2: Browse Listings
You'll see all properties on the home page. Click any listing to see full details, photos, location on map, and reviews.

### Step 3: Sign Up (Optional)
If you want to add your own property or leave a review:
1. Click **Sign Up** in the top right
2. Enter your username, email, and password
3. Click **Sign Up**

### Step 4: Login
After signing up, click **Login** and enter your username and password.

### Step 5: Add Your Property
1. Click **Add New Listing** in the top menu
2. Fill in the title, description, price, country, and location
3. Upload a photo of your property
4. Click on the map to set the exact location
5. Click **Add** — your property is now live!

### Step 6: Leave a Review
1. Open any listing
2. Scroll down to **Leave a Review**
3. Click the stars to give a rating (1-5)
4. Write a comment
5. Click **Submit**

### Step 7: Search and Filter
- Use the **search bar** at the top to find properties by name or location
- Click the **category icons** (Beach, Mountains, etc.) to filter properties

---

## Demo Accounts (Try These)

| Username | Password |
|---|---|
| `rushi` | `666` |
| `hitesh` | `666` |

Use these to login without creating a new account.

---

## What Categories Are Available?

You can filter properties by these categories:

| | | | |
|---|---|---|---|
| Beachfront | Cabins | Camping | Castles |
| Farms | Rooms | Lakefront | Pools |
| Islands | Arctic | Caves | Beach |
| Villas | Iconic Cities | Desert | Mountains |
| Treehouses | Ski-in/Ski-out | | |

---

## Screenshots

### Home Page
- Grid of property cards with photos and prices
- Category filter bar at the top (like Airbnb)
- Search bar to find properties
- Toggle button to show all properties on a map

### Property Details Page
- Large photo of the property
- Price per night (with tax toggle)
- Location on map
- Owner name
- Reviews section with star ratings
- Edit/Delete buttons (only if you own the listing)

### Add/Edit Property Form
- Simple form to fill in property details
- Upload photo from your computer
- Click on the map to set location
- Choose a category from dropdown

---

## Technology Used

This website is built using:

| What | Technology |
|---|---|
| Server | Node.js + Express |
| Database | MongoDB Atlas (cloud) |
| Frontend | HTML, CSS, Bootstrap |
| Maps | OpenStreetMap + Leaflet |
| Image Storage | Cloudinary |
| Hosting | Render (free) |

---

## How to Run This on Your Computer

### What You Need
- [Node.js](https://nodejs.org/) installed on your computer
- A MongoDB account (free at [mongodb.com](https://www.mongodb.com))

### Steps

1. **Download the code:**
   ```bash
   git clone https://github.com/kavadrushi01-source/wanderlust-major-project.git
   cd wanderlust-major-project
   ```

2. **Install everything:**
   ```bash
   npm install
   ```

3. **Create a file called `.env`** in the main folder and paste this:
   ```
   MONGO_URL=your_mongodb_connection_string
   SESSION_SECRET=any_random_text
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start the website:**
   ```bash
   node app.js
   ```

5. **Open your browser** and go to: `http://localhost:8080`

---

## How This Website Was Deployed (Made Live)

1. **Database:** MongoDB Atlas (free cloud database) stores all listings, users, and reviews
2. **Hosting:** Render (free hosting) runs the website 24/7
3. **Code:** GitHub stores all the code

---

## About This Project

This is a college major project built by **Rushi Kavad** as part of a Web Development course. It demonstrates:

- Full-stack web development (frontend + backend + database)
- User authentication (sign up, login, logout)
- CRUD operations (Create, Read, Update, Delete)
- Image upload and storage
- Interactive maps
- Search and filtering
- Responsive design (works on mobile and desktop)

---

## Author

**Rushi Kavad**
- GitHub: [kavadrushi01-source](https://github.com/kavadrushi01-source)
