# Eventify — Premier Executive Event Suite

> A full-stack event management platform built with a strict **MVC architecture**, delivering a seamless experience for coordinators to create, manage, and share events.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI component library |
| **Vite** | 7 | Build tool & dev server |
| **Tailwind CSS** | v3 | Utility-first styling |
| **Framer Motion** | latest | Micro-animations & transitions |
| **Radix UI** | latest | Accessible dropdowns, dialogs, selects |
| **Lucide React** | latest | Icon system |
| **React Router Dom** | v7 | Client-side routing |
| **Axios** | latest | HTTP client for API calls |
| **Lenis** | latest | Smooth scroll behavior |
| **React Toastify** | latest | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | v18+ | Runtime environment |
| **Express** | v5 | Web framework & REST API |
| **MongoDB** | latest | NoSQL database |
| **Mongoose** | v9 | ODM for MongoDB schemas |
| **JWT** | latest | Stateless authentication tokens |
| **BcryptJS** | latest | Password hashing |
| **Multer** | v2 | File/image uploads |
| **Cookie-Parser** | latest | HTTP-only cookie handling |
| **Connect-Mongo** | latest | MongoDB session store |
| **Express-Session** | latest | Server-side sessions |
| **CORS** | latest | Cross-origin request handling |
| **Dotenv** | latest | Environment variable management |

---

## 🏛️ Architecture — MVC Pattern

The project enforces a clean separation of concerns across both frontend and backend.

```
┌─────────────────────────────────────────────────────┐
│                     FRONTEND                        │
│  View (Pages/Components)                            │
│    └── Controller (Custom Hooks)                    │
│          └── Model (Context API + Axios calls)      │
└─────────────────────────────────────────────────────┘
                        │ HTTP / REST API
┌─────────────────────────────────────────────────────┐
│                      BACKEND                        │
│  Route → Controller → Model (Mongoose Schema)       │
│    └── Middleware (Auth, Multer, CORS)              │
└─────────────────────────────────────────────────────┘
                        │
                   MongoDB Atlas
```

### Backend MVC
- **Model** — `User` and `Event` Mongoose schemas define data structure and validation.
- **Controller** — Express controllers (`authController`, `eventController`) handle business logic.
- **View** — RESTful JSON responses serve structured data to the client.

### Frontend MVC
- **Model** — `AuthContext` and `EventContext` (React Context API) manage global state and API calls via `authModel.js` / `eventModel.js`.
- **Controller** — Custom React hooks (`useLoginController`, `useHomeController`, `useDashboardController`, `useProfileController`, `useEventDetailsController`) encapsulate all state logic and side effects.
- **View** — Pure presentational components and pages styled with Tailwind CSS and animated with Framer Motion.

---

## 🌐 Project Flow

```
User visits app
      │
      ▼
 Not logged in?
      │
  ┌───┴────┐
  │        │
Login   Register
  │        │
  └───┬────┘
      │ JWT issued → stored in HTTP-only cookie
      ▼
  Home Page  ──────────────────────────────────────────────┐
  (Browse all public events)                               │
      │                                                    │
  Click event card                                         │
      ▼                                                    │
  Event Details Modal                                      │
  - View full details (date, location, category, desc)    │
  - Register to attend (name + email form)                 │
  - If creator: View guest list                           │
      │                                                    │
  Navbar dropdown ─────────────────────────────────────────┤
      │                                                    │
  ┌───┴──────────────────┐                                 │
  │                      │                                 │
Dashboard            Profile                               │
(My Events)          (My Info)           Create Event ◄───┘
  │                      │                    │
  ├── Create Event        ├── Edit profile    │
  ├── Edit Event          ├── Upload photo    ▼
  ├── Delete Event        └── View stats   Event saved to DB
  └── View stats                           (Public or Private)
```

---

## ✨ Website Functionalities

### 🔐 Authentication
- **Register** — Create an account with username, email, and password. Password is hashed with BcryptJS before storage.
- **Login** — Email + password authentication. JWT issued and stored securely in an HTTP-only cookie.
- **Logout** — Session cleared, cookie invalidated.
- **Protected Routes** — Unauthenticated users are redirected to `/login` automatically.

### 🏠 Home Page
- Displays all **public events** created by all users.
- Events shown as premium cards with image, title, date, location, and category.
- Clicking a card opens the **Event Details Modal**.
- Infinite-ready event grid with responsive layout.

### 📅 Event Details Modal
- Full event breakdown: image, title, description, date, location, category, coordinator.
- **Register to Attend** form (name + email) — prevents duplicate registrations.
- Registered users see a confirmation badge instead of the form.
- Event creators see a **"View Guests"** button instead of the registration form.
- **Guest List View** — creators can switch to a list of all registered attendees.

### ➕ Create / Edit Event
- Rich form with: title, description, date, location, category, visibility (public/private), image upload.
- Image uploaded via Multer and stored on the server; a premium fallback displays if no image is provided.
- Edit opens the same modal pre-populated with the event's existing data.

### 📊 Dashboard
- Personal portfolio of **your own events** (both public and private).
- Stats grid: Total Events, Public Exhibitions, Private Coordinations.
- Full CRUD: create, edit, delete your events.
- Clicking an event card opens the Event Details Modal with guest view available.

### 👤 Profile
- Displays your avatar (uploadable), username, email, location, and bio.
- **Stats**: Total Events created, Total Attendees across all your events, Success Rate.
- **Edit Profile Modal**: Update username, bio, location, and profile photo.
- Verified badge and account rating display.

### 🧭 Navigation
- Sticky top navbar with the Eventify logo.
- Profile dropdown with: Create Event, Dashboard, Profile, Logout.
- Smooth scroll via Lenis, toast notifications via React Toastify.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB instance (local or Atlas)

### Environment Variables

Create `server/.env`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
PORT=5000
```

### Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/rohith-sunilkumar/Event_Managemnt.git
cd Event_Managemnt

# 2. Start the backend
cd server
npm install
npm run dev

# 3. Start the frontend (new terminal)
cd client
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## 📁 Folder Structure

```
Event Management/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── components/      # Reusable UI components (event, layout, profile)
│       ├── context/         # Global state (AuthContext, EventContext)
│       ├── controllers/     # Custom hooks — business logic layer
│       ├── models/          # API call functions (authModel, eventModel)
│       ├── pages/           # Route-level views (Home, Dashboard, Profile, Login, Register)
│       └── services/        # Axios instance & constants (api.js)
│
└── server/                  # Express backend
    ├── config/              # DB connection
    ├── controllers/         # Route handlers (auth, event, user)
    ├── middleware/          # Auth & upload middleware
    ├── models/              # Mongoose schemas (User, Event)
    ├── routes/              # API route definitions
    └── uploads/             # Stored user/event images
```

---

*Eventify © 2026 — Premier Executive Event Management*
