# 🧳 Travel Buddy & Meetup Platform

A full-stack social travel platform that helps travelers find compatible travel buddies, plan trips together, and build meaningful connections. The platform blends **social networking**, **travel planning**, and **subscription-based premium features** to turn solo trips into shared adventures.

---

## 🌍 Live URLs
- **Frontend Live URL:** https://travel-buddy-azure.vercel.app
- **Backend Live URL:** https://travel-buddy-backend-kappa.vercel.app

---

## 📌 Project Overview
**Travel Buddy & Meetup** aims to create a vibrant community of travelers by enabling users to:
- Share upcoming travel plans
- Discover travelers going to similar destinations
- Match based on interests, dates, and travel type
- Review and rate travel companions after trips

This platform empowers users to explore the world **together**, not alone.

---

## 🎯 Objectives
- Build a social-travel web platform for connecting travelers
- Enable trip sharing and traveler matching
- Allow users to create detailed travel profiles and itineraries
- Provide a secure and engaging UI/UX
- Implement role-based authentication and data persistence

---

## ✨ Core Features

### 🔐 Authentication & Roles
- Email & Password based authentication
- JWT-based authorization
- Secure password hashing
- **Roles:**
  - **User:** Create travel plans, match with others, review travelers
  - **Admin:** Manage users, travel plans, and platform content

---

### 👤 User Profile Management (CRUD)
- Full Name
- Profile Image (Cloudinary / ImgBB)
- Bio / About section
- Travel Interests (hiking, food tours, photography, etc.)
- Visited Countries
- Current Location
- Public profile view for other users

---

### 🧳 Travel Plan Management (CRUD)
- Destination (Country / City)
- Start Date & End Date
- Budget Range
- Travel Type (Solo, Family, Friends)
- Short itinerary / description
- Plans are publicly visible for discovery and matching

---

### 🔍 Search & Matching System
- Search by destination
- Filter by date range
- Match by travel interests
- View compatible traveler profiles

---

### ⭐ Review & Rating System
- Post-trip reviews between travelers
- Rating system (1–5 stars)
- Edit or delete reviews
- Average rating displayed on user profiles

---

### 💳 Payment & Subscription
- Monthly & Yearly subscription plans
- Verified badge for premium users
- Payment gateway integration:
  - Stripe / SSLCommerz / others

---

## 🧭 Pages & Functional Requirements

### 🧩 Navbar
**Logged Out:**
- Home
- Explore Travelers
- Find Travel Buddy
- Login
- Register

**Logged In (User):**
- Home
- Explore Travelers
- My Travel Plans
- Profile
- Logout

**Logged In (Admin):**
- Home
- Admin Dashboard
- Manage Users
- Manage Travel Plans
- Profile
- Logout

---

### 🏠 Home Page (/)
Minimum **6 sections**, including:
- Hero section with CTA
- How It Works (3 steps)
- Popular Destinations
- Top-Rated Travelers
- Testimonials
- Why Choose Us

---

### 📄 Other Pages
- **/register** – User registration
- **/login** – Secure login
- **/profile/[id]** – User profile & reviews
- **/dashboard** – User/Admin dashboard
- **/travel-plans** – List of user travel plans
- **/travel-plans/add** – Create new travel plan
- **/travel-plans/[id]** – Travel plan details & join request
- **/explore** – Search & match travelers

---

## 🚀 Optional Features
| Feature | Description |
|------|------------|
| 📍 Map Integration | Show nearby travelers using Google Maps API |
| 📨 Notifications | In-app or push notifications |
| 📸 Media Sharing | Share travel photos |

---

## 🗂 Folder Structure

### Frontend
```
frontend/
 ├── app/
 │   ├── (auth)/login, register
 │   ├── (user)/profile, travel-plans
 │   ├── components/
 │   ├── utils/
 │   └── styles/
```

### Backend
```
backend/
 ├── src/
 │   ├── modules/
 │   │   ├── users/
 │   │   ├── travelPlans/
 │   │   ├── reviews/
 │   │   ├── payments/
 │   └── ...
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/users/:id | Get user profile |
| PATCH | /api/users/:id | Update user profile |
| POST | /api/travel-plans | Create travel plan |
| GET | /api/travel-plans | Get all travel plans |
| GET | /api/travel-plans/match | Search & match travelers |
| POST | /api/reviews | Add review |
| POST | /api/payments/create-intent | Create payment intent |

---

## 🛠 Technology Stack

### Frontend
- Next.js
- Tailwind CSS

### Backend
- Node.js
- Express.js
- Prisma / Mongoose

### Database
- PostgreSQL / MongoDB

### Authentication
- JWT (JSON Web Token)

### Payments
- SSLCommerz / Stripe

### Deployment
- Frontend: Vercel
- Backend: Render / Railway

---

## 📦 Installation & Setup (Optional)
```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```

---

## 🤝 Contribution
Contributions, issues, and feature requests are welcome.

---

## 📜 License
This project is developed for educational and portfolio purposes.

---

✨ *Travel together. Explore more. Connect globally.*

