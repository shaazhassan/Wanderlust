# 🌍 Wanderlust

A full-stack Airbnb-inspired travel accommodation platform built using the MERN backend stack. Users can browse, create, edit and review listings with secure authentication, image uploads, interactive maps, and cloud deployment.

> 🚀 Live Demo:https://wanderlust-explorer-jlz8.onrender.com

---

## 📸 Features

- 🏡 Browse all travel listings
- ➕ Create new listings
- ✏️ Edit your own listings
- 🗑️ Delete listings
- ⭐ Add and delete reviews
- 👤 User Authentication (Sign Up / Login / Logout)
- 🔒 Authorization for listings & reviews
- ☁️ Cloudinary image upload
- 🗺️ Interactive maps using MapTiler
- 📍 Automatic geocoding from location
- 💰 GST price toggle
- 🔍 Search bar UI
- 📱 Responsive design
- 🚀 Deployed on Render
- ☁️ MongoDB Atlas Database

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- EJS
- Bootstrap 5
- HTML5
- CSS3
- JavaScript

### Authentication

- Passport.js
- Passport Local
- Express Session

### Cloud Services

- MongoDB Atlas
- Cloudinary
- MapTiler API
- Render

---

## 📂 Project Structure

```
Wanderlust/
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── public/
│   ├── css/
│   ├── js/
│
├── views/
│
├── utils/
├── app.js
├── cloudConfig.js
├── mapConfig.js
└── package.json
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/shaazhassan/Wanderlust.git
```

Go to project folder

```bash
cd Wanderlust
```

Install dependencies

```bash
npm install
```

Create a `.env` file

```env
ATLASDB_URL=YOUR_MONGODB_ATLAS_URL

CLOUD_NAME=YOUR_CLOUDINARY_NAME
CLOUD_API_KEY=YOUR_API_KEY
CLOUD_API_SECRET=YOUR_API_SECRET

MAP_API_KEY=YOUR_MAPTILER_API_KEY

SECRET=YOUR_SESSION_SECRET
```

Run the project

```bash
nodemon app.js
```

Open

```
http://localhost:8080
```

---

## 🌐 APIs Used

### MongoDB Atlas

Database storage

### Cloudinary

Image upload & hosting

### MapTiler

Maps & Geocoding

---

## 🔐 Authentication

- Passport Local Strategy
- Session Management
- Flash Messages
- Authorization Middleware

---

## 📌 Future Improvements

- Wishlist / Favorites
- Booking System
- Payment Gateway (Stripe/Razorpay)
- Advanced Search & Filters
- User Profile Page
- Messaging System
- Admin Dashboard
- AI Travel Recommendations

---

## 👨‍💻 Author

**Syed Shaaz Hassan**

GitHub:
https://github.com/shaazhassan

---

## ⭐ If you like this project

Please consider giving it a ⭐ on GitHub!
