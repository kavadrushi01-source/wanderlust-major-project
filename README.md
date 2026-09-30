# Wanderlust

**A website where people can list their properties for rent and others can book them.**

Think of it like Airbnb — users can add their houses, villas, beach huts, etc. and other people can browse, search, and contact the owner.

**Live Website:** _(paste your new deployment URL here — see [Deploy It For Free](#deploy-it-for-free-no-render-no-vercel))_

> ⚠️ The old Render link (`wanderlust-major-project-e5gi.onrender.com`) is dead — Render suspended the free web service.
> The same project can be hosted for free somewhere else. Jump to **[Deploy It For Free](#deploy-it-for-free-no-render-no-vercel)**.

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
Click your deployment link (or run the project on your own computer — see [How to Run This on Your Computer](#how-to-run-this-on-your-computer)).

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
| Sessions | MongoDB (`connect-mongo`) |
| Hosting | Any Docker host — see [Deploy It For Free](#deploy-it-for-free-no-render-no-vercel) |

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

3. **Create a file called `.env`** in the main folder (copy `.env.example` and fill it in):
   ```
   MONGO_URL=your_mongodb_connection_string
   SESSION_SECRET=any_random_text
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **(Optional) Fill the database with demo data:**
   ```bash
   npm run seed        # basic listings
   npm run seed:demo   # extra Indian listings + demo users (rushi/666)
   ```

5. **Start the website:**
   ```bash
   npm start
   ```

6. **Open your browser** and go to: `http://localhost:8080`

### Run it with Docker (optional)

```bash
docker compose up --build     # app on http://localhost:8080, MongoDB on localhost:27018
docker compose down           # stop everything
```

---

## Deploy It For Free (no Render, no Vercel)

This project is a normal Node.js server, so **any host that can run a Dockerfile can run it**.
The repository already contains everything those hosts need:

| File | Purpose |
|---|---|
| `Dockerfile` | Builds the production image (Node 24, runs as the non-root `node` user, listens on `$PORT`) |
| `.dockerignore` | Keeps `node_modules`, `.env` and `.git` out of the image |
| `Procfile` | For buildpack-style hosts: `web: node app.js` |
| `docker-compose.yml` | Runs the app + a MongoDB container on your laptop |
| `.env.example` | Every environment variable the app needs |
| `/healthz` route | Health check that also reports the database status |

### Step 0 — Database (do this first, every host needs it)

1. Sign in at [cloud.mongodb.com](https://cloud.mongodb.com) and create a free **M0** cluster.
2. **Database Access** → *Add New Database User* → note the username and password.
3. **Network Access** → *Add IP Address* → **Allow access from anywhere** (`0.0.0.0/0`).
   (Free hosting IPs change constantly, so this is the practical choice for a college project.)
4. **Clusters → Connect → Drivers** → copy the connection string:
   `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority`
   - Include the database name `wanderlust` in the string.
   - If the password contains `@`, `#`, `/` … URL-encode it (`@` → `%40`, `#` → `%23`).
5. *(Optional)* If the old Atlas data is gone, load the demo data again from your computer:
   ```powershell
   $env:MONGO_URL="mongodb+srv://..."; npm run seed:demo
   ```

### Environment variables every host needs

| Variable | Example | Notes |
|---|---|---|
| `MONGO_URL` | `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/wanderlust` | from Step 0 |
| `SESSION_SECRET` | any long random text | signs the login cookie |
| `CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | from the Cloudinary dashboard |
| `CLOUDINARY_API_KEY` | `123456789012345` | from the Cloudinary dashboard |
| `CLOUDINARY_API_SECRET` | `abcdEFGH...` | from the Cloudinary dashboard |
| `NODE_ENV` | `production` | optional, recommended |
| `PORT` | `8080` | optional, most hosts set it for you |

### Which host should I pick?

| Host | Free? | Credit card? | Sleeps when idle? |
|---|---|---|---|
| **Back4App Containers** | yes | no | no |
| **Northflank** (Developer Sandbox) | yes | no | no |
| **Koyeb** (1 free instance, 512 MB) | yes | yes (card validation) | no |
| **Zeabur** | yes | no | yes (wakes in a few seconds) |
| **Railway** | $5 credit for 30 days, then $5/month | no | no |
| **Hugging Face Spaces** | yes | no | yes (after 48 h) |

**Recommended:** start with **Back4App Containers** — free, no credit card, always awake and deploys straight from GitHub.

---

### Option 1 — Back4App Containers (free, no credit card) ⭐ recommended

1. Go to **[containers.back4app.com](https://containers.back4app.com)** → **Sign up** (GitHub login is fastest).
2. **Create new app** → *Select from GitHub* → authorize Back4App → pick
   `kavadrushi01-source/wanderlust-major-project` → branch `main`.
3. In the app settings fill in:
   - **Port:** `8080`
   - **Environment variables:** `MONGO_URL`, `SESSION_SECRET`, `CLOUDINARY_CLOUD_NAME`,
     `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (and optionally `NODE_ENV=production`)
   - Leave the build type on **Dockerfile** (it is detected automatically).
4. Press **Create** and wait for the build (2–5 minutes the first time).
5. Open the URL Back4App gives you — the site should come up on `/listings`.
   Every future `git push` to `main` redeploys it automatically.

*Free plan: 0.25 CPU, 256 MB RAM, 100 GB traffic — plenty for this project.*

### Option 2 — Koyeb (free instance, always awake)

1. Go to **[koyeb.com](https://koyeb.com)** → **Sign up** with GitHub.
   Koyeb asks for a card to verify your account; the free instance itself is not charged.
2. **Create Service** → **GitHub** → pick `wanderlust-major-project` → branch `main`.
3. Builder: **Dockerfile** · **Port:** `8080` · Instance type: the **free** one (512 MB / 0.1 vCPU) ·
   Region: e.g. *Washington, D.C.* or *Frankfurt*.
4. **Environment variables** → add the five variables from the table above → **Deploy**.
5. Wait until the service is **Healthy**, then open the generated
   `https://<app-name>-<org>.koyeb.app` URL.

---

### Option 3 — Northflank (free Developer Sandbox, no credit card)

1. **[northflank.com](https://northflank.com)** → *Get started* → sign up with GitHub.
   The free **Developer Sandbox** plan allows 2 services and needs no card.
2. **Create project** → *Create service* → **Build from Git** → connect GitHub →
   repository `wanderlust-major-project`, branch `main`.
3. Build type: **Dockerfile** · add a **public HTTP port** of `8080` · pick the smallest compute plan.
4. **Environment** → *Add variable* for each of the five variables from the table → **Deploy service**.
5. Open the public URL Northflank generates for the service.

### Option 4 — Zeabur (simplest GitHub flow, free plan sleeps when idle)

1. **[zeabur.com](https://zeabur.com)** → sign in with GitHub — the Free plan needs no credit card.
2. *Create project* → *Deploy new service* → **GitHub** → pick the repository.
3. Zeabur detects the `Dockerfile`; set the public port to `8080`.
4. **Variables** → add `MONGO_URL`, `SESSION_SECRET` and the three Cloudinary variables.
5. *Networking → Generate domain* and open the link (the first request after sleeping takes a few seconds).

### Option 5 — Railway ($5 of free credits for 30 days)

1. **[railway.com](https://railway.com)** → *Login with GitHub* → verify your GitHub account so you
   get the *Full Trial* (the limited trial restricts outbound network access, which MongoDB Atlas needs).
2. **New Project → Deploy from GitHub repo** → `wanderlust-major-project` (the `Dockerfile` is used).
3. **Variables** → add the five variables from the table.
4. *Settings → Networking → Generate Domain* → open the URL.
5. After the credit runs out (or 30 days pass) the project needs the $5/month Hobby plan.

### Option 6 — Any VPS or your own server (plain Docker)

```bash
git clone https://github.com/kavadrushi01-source/wanderlust-major-project.git
cd wanderlust-major-project
docker build -t wanderlust .
docker run -d --name wanderlust --restart unless-stopped -p 80:8080 \
  -e PORT=8080 -e NODE_ENV=production \
  -e MONGO_URL="mongodb+srv://..." -e SESSION_SECRET="..." \
  -e CLOUDINARY_CLOUD_NAME="..." -e CLOUDINARY_API_KEY="..." -e CLOUDINARY_API_SECRET="..." \
  wanderlust
```

### Option 7 — Hugging Face Spaces (free Docker Space, sleeps after 48 h)

A Space's `README.md` must start with YAML front matter, so use a Space as a *mirror* of this repo:

```yaml
---
title: Wanderlust
sdk: docker
app_port: 7860
---
```

Create the Space, clone it, copy this project inside, add the front matter above, set
`PORT=7860` plus the other variables as Space *secrets*, then `git push`.

---

### After deploying — checklist

- [ ] `/listings` loads and shows property cards
- [ ] `/healthz` shows `{"status":"ok","database":"connected"}`
- [ ] Sign up / login works (sessions are stored in MongoDB, so logins survive redeploys)
- [ ] Adding a listing with a photo works (needs the Cloudinary variables)
- [ ] Copy the live URL into the top of this README

### If something goes wrong

| Symptom | Fix |
|---|---|
| Deploy succeeds but pages show the error page / status 500 | Wrong `MONGO_URL`, or your Atlas **Network Access** list does not allow `0.0.0.0/0` |
| `Could not connect to MongoDB` in the logs | Same as above — the logs never print the password, so copy the connection string carefully |
| "No open ports detected" / health check fails | The host is checking a different port — set the service port to `8080` or set `PORT` to the port the host expects |
| Login works, then you get logged out instantly | The session cookie was rejected. This app sets `secure` cookies automatically on HTTPS and trusts the host's proxy (`app.set("trust proxy", 1)` in `app.js`) — do not remove that line |
| Photo upload fails | Missing or wrong `CLOUDINARY_*` variables |
| First request is slow | The free instance was asleep — normal for free plans |

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
