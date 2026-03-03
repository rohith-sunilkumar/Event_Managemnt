# Eventify - Premier Executive Event Suite

Eventify is a modern event management platform built with a strict **Model-View-Controller (MVC)** architecture. It provides a seamless, secure, and visually stunning experience for coordinators to manage events and gatherings.

---

## 🏛️ Architecture: Pure MVC Pattern

The system architecture is bifurcated into two distinct but harmonized MVC stacks:

### 1. Backend (Server-side MVC)
- **Model**: Mongoose schemas (`User`, `Event`) define the data structure and validation logic.
- **View**: RESTful JSON responses orchestrate data flow to the client.
- **Controller**: Express logic (`authController`, `eventController`) handles business rules and security.

### 2. Frontend (Client-side MVC)
- **Model**: React **Context API** (`AuthContext`, `EventContext`) manages global state and data persistence.
- **View**: Premium React Components & Pages styled with Tailwind CSS and animated with Framer Motion.
- **Controller**: Specialized **Custom Hooks** (`useLoginController`, `useProfileController`, etc.) encapsulate UI logic and API interactions.

---

## � Authentication & Security Architecture

Eventify employs an enterprise-grade authentication system designed for both security and user convenience.

### The Security Stack
- **JWT (JSON Web Tokens)**: Decoupled authentication using stateless tokens.
- **Dual-Token System**:
    - **Access Token**: Short-lived token stored in memory for API authorization.
    - **Refresh Token**: Long-lived token stored in a **Secure, HTTP-only Cookie**, preventing XSS-based theft.
- **Silent Refresh**: The client automatically rotates tokens in the background before expiration, ensuring an uninterrupted session.
- **Route Protection**: Higher-Order Components (`ProtectedRoute`) and backend middleware (`verifyToken`) guard sensitive executive areas.

---

## ✨ Feature Set

### 1. Executive Event Portfolio
- **CRUD Mastery**: Create, read, update, and delete events with a refined interface.
- **Visibility Control**: Toggle events between **Public Exhibition** (Homepage) and **Private Coordination** (Personal Dashboard).
- **Curated Categorization**: Sort gatherings into elite categories like *Corporate Gala*, *Innovation Mixer*, *Charity Auction*, or *Wedding Boutique*.
- **Visual Excellence**: Sophisticated image upload system using Multer, with hand-crafted **Premium Fallbacks** for missing assets.

### 2. Event Registration System
- **Precision Enrollment**: Attendees can register for public events with a minimalist, non-invasive form.
- **Conflict Prevention**: Intelligent logic prevents creators from registering for their own events.
- **Real-time Synchronization**: Modal-based registration updates the attendee count and status instantly.

### 3. Identity & Profile Orchestration
- **Refined Portraits**: Custom profile image uploads with elegant placeholders.
- **Executive Biographies**: Detail your vision and base of operations (Global Base).
- **Verified Status**: All accounts feature a verified executive badge and account rating system.

### 4. Dynamic Dashboard Reflection
- **Portfolio Insights**: Real-time calculation of total events, attendee reach, and success rates.
- **Unified Loading**: Graceful skeleton states and transitions while data is being fetched.

---

## 🛠️ Technology Stack & Third-Party Orchestration

Eventify leverages a curated selection of elite third-party libraries to achieve its executive-grade performance and boutique aesthetics.

### 🎨 Frontend (Client-side)
- **React 19 & Vite 7**: The core foundation for high-performance UI rendering and development.
- **Tailwind CSS v3**: Utility-first CSS for rapid, bespoke styling of premium interfaces.
- **Framer Motion**: Production-ready motion library for fluid boutique micro-animations.
- **Radix UI Primitives**: Unstyled, accessible components used for robust **Dialogs**, **Dropdowns**, and **Select** interfaces.
- **Lucide React**: A minimalist icon toolkit for consistent, high-end iconography.
- **Lenis**: Integrated for sophisticated, smooth-scroll behavior across the platform.
- **Axios**: Promise-based HTTP orchestration for seamless API communication.
- **React Router Dom v7**: Declarative routing system for complex executive navigation.

### ⚙️ Backend (Server-side)
- **Express v5**: The latest minimalist web framework for high-speed API orchestration.
- **Mongoose v9**: Elegant object modeling for seamless MongoDB data interactions.
- **JSONWebToken & Cookie-Parser**: A secure duo for managing stateless authentication and HTTP-only cookie rotation.
- **BcryptJS**: Advanced password hashing to ensure executive-level data security.
- **Multer v2**: Sophisticated middleware for handling multi-part image uploads for portraits and events.
- **CORS**: Middleware configured for secure cross-origin resource sharing between elite domains.
- **Dotenv**: Centralized environment variable management.

---

## 🚀 Deployment & Installation

### Prerequisites
- Node.js v18.0.0+
- MongoDB instance

### Quick Start
```bash
# Backend Setup
cd server && npm install && npm start

# Frontend Setup
cd client && npm install && npm run dev
```

---
*Eventify © 2026*
