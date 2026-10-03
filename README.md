```md
# DevLinks

**One link for everything a developer ships.**

DevLinks is a production-style **MERN** bio-link platform built for developers — not generic creators. Manage GitHub, LinkedIn, portfolio links, and skills from one dashboard, then share a single public URL.

| | |
|---|---|
| **Live App** | [devlinks-bd.vercel.app](https://devlinks-bd.vercel.app) |
| **API** | [devlinks-o399.onrender.com](https://devlinks-o399.onrender.com) |
| **Stack** | React · Express · MongoDB · JWT · Cloudinary |

---

## Table of Contents

- [Why this project](#why-this-project)
- [Features](#features)
- [Demo](#demo)
- [Architecture](#architecture)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [API reference](#api-reference)
- [Client routes](#client-routes)
- [Local setup](#local-setup)
- [Environment variables](#environment-variables)
- [Deployment](#deployment)
- [Security decisions](#security-decisions)
- [Challenges & solutions](#challenges--solutions)
- [What recruiters can evaluate](#what-recruiters-can-evaluate)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why this project

**Problem**

Developers spread their work across GitHub, LinkedIn, portfolios, and side projects. Recruiters waste time collecting context. Consumer tools like Linktree are not designed for developer workflows or for demonstrating backend skills.

**Goal**

Ship a **ready-to-use product** that proves more than UI cloning:

- Authentication with **httpOnly cookies** (not localStorage-only demos)
- **Role-based access control** (user vs admin)
- Clean **REST API** design and modular Express architecture
- Real **CRUD**, soft delete, validation, file upload, and public sharing

**Outcome**

A deployable full-stack app with a public profile page, analytics counters, an admin moderation panel, and a polished dashboard UX.

---

## Features

### For developers (users)

- Email registration and login
- One-click **Guest User** for instant demo access
- Profile: name, bio, skills, avatar (Cloudinary)
- Links:
  - **Platform** — GitHub, LinkedIn, Twitter, and more (username → auto URL)
  - **Portfolio** — custom title + full URL
- Create, edit, and soft-delete links
- Drag-and-drop reorder
- Per-link click tracking
- Profile view counter
- Live mobile-style preview while editing
- Share: copy public URL + QR code
- Theme switcher (DaisyUI themes)
- Public page at `/u/:username` (no login required)

### For admins

- One-click **Guest Admin** demo
- Dashboard stats (users, links, clicks, views)
- List and soft-delete users and links
- **Demo admin** can view everything but delete **only guest accounts**
- **Real admin** has full moderation power
- Admins land on the control panel only (no user profile dashboard)

### Engineering quality

- JWT in **httpOnly** cookies + `credentials: true`
- Zod request validation
- Helmet + rate limiting
- Soft delete with guest-account restore on re-login
- SPA routing configured for Vercel production

---

## Demo

| Role | How to try |
|------|------------|
| **Guest User** | [Login](https://devlinks-bd.vercel.app/login) → **Guest User** |
| **Guest Admin** | [Login](https://devlinks-bd.vercel.app/login) → **Guest Admin** |
| **Public profile** | Open any `/u/{username}` after creating links |

> **Note:** Render free tier may cold-start (15–60 seconds) on the first API request after idle time.

---

## Architecture

```text
┌─────────────────┐       HTTPS + cookies        ┌─────────────────┐
│  React (Vercel) │ ───────────────────────────► │ Express (Render)│
│  Vite + DaisyUI │ ◄─────────────────────────── │ JWT + REST API  │
└─────────────────┘                              └────────┬────────┘
                                                          │
                                                          ▼
                                                 ┌─────────────────┐
                                                 │  MongoDB Atlas  │
                                                 │  Cloudinary     │
                                                 └─────────────────┘
```

**Request flow**

1. User authenticates → server sets httpOnly `token` cookie  
2. Dashboard loads profile + links with credentials  
3. Public visitors hit `/u/:username` → public API (no auth)  
4. Link click → click counter increments → open destination URL  
5. Admin routes guarded by `role === "admin"`

---

## Tech stack

| Area | Choices |
|------|---------|
| **Frontend** | React, Vite, React Router, Tailwind CSS, DaisyUI, Framer Motion, Axios, @dnd-kit, qrcode.react |
| **Backend** | Node.js, Express, Mongoose |
| **Database** | MongoDB Atlas |
| **Auth** | JWT, bcryptjs, cookie-parser |
| **Validation** | Zod |
| **Uploads** | Multer + Cloudinary |
| **Security** | Helmet, express-rate-limit, CORS with credentials |
| **Deploy** | Vercel (frontend), Render (backend) |

---

## Project structure

```text
devlinks/
├── client/
│   ├── src/
│   │   ├── components/        # UI (dashboard, admin, layout, common)
│   │   ├── context/           # Auth provider
│   │   ├── hooks/             # useAuth, useTheme
│   │   ├── layouts/           # MainLayout (Navbar + Outlet + Footer)
│   │   ├── pages/             # Login, Register, Dashboard, Admin, PublicProfile
│   │   ├── routes/            # createBrowserRouter
│   │   ├── services/          # api, auth, links, users, admin, public
│   │   └── utils/             # themes, guest account helpers
│   └── vercel.json            # SPA rewrites
└── server/
    └── src/
        ├── config/            # DB, Cloudinary
        ├── controllers/       # Route handlers
        ├── middleware/        # auth, validate, upload
        ├── models/            # User, Link
        ├── routes/
        ├── validators/        # Zod schemas
        ├── app.js
        └── index.js
```

---

## API reference

**Base (local):** `http://localhost:5000/api`  
**Base (prod):** `https://devlinks-o399.onrender.com/api`

Authenticated routes expect the JWT **cookie** (sent automatically when the client uses `withCredentials: true`).

### Auth — `/auth`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Create account |
| `POST` | `/login` | Public | Login |
| `POST` | `/guest` | Public | Body: `{ "role": "user" \| "admin" }` |
| `POST` | `/logout` | Public | Clear auth cookie |
| `GET` | `/me` | Private | Current user |

### Users — `/users`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/me` | Private | Full profile |
| `PUT` | `/me` | Private | Update name, bio, skills |
| `PUT` | `/me/avatar` | Private | Multipart avatar upload |

### Links — `/links`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Private | List my links |
| `POST` | `/` | Private | Create platform or portfolio link |
| `PUT` | `/:id` | Private | Update link |
| `DELETE` | `/:id` | Private | Soft delete |
| `PUT` | `/reorder` | Private | Body: `{ "orderedIds": ["..."] }` |

### Public — `/public`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/:username` | Public | Profile + links; increments views |
| `POST` | `/click/:id` | Public | Increments clicks; returns destination URL |

### Admin — `/admin`

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/stats` | Admin | Aggregate stats |
| `GET` | `/users` | Admin | All non-deleted users |
| `DELETE` | `/users/:id` | Admin | Soft-delete user and their links |
| `GET` | `/links` | Admin | All non-deleted links |
| `DELETE` | `/links/:id` | Admin | Soft-delete link |

### Example request bodies

**Platform link**

```json
{
  "type": "platform",
  "platform": "github",
  "username": "octocat"
}
```

**Portfolio link**

```json
{
  "type": "portfolio",
  "title": "My Portfolio",
  "url": "https://example.com"
}
```

---

## Client routes

| Path | Guard | Description |
|------|-------|-------------|
| `/` | Public | Landing; redirects if logged in |
| `/login` | Guest only | Login + guest demos |
| `/register` | Guest only | Registration |
| `/dashboard` | User only | Profile, links, stats, preview, share |
| `/admin` | Admin only | Moderation panel |
| `/u/:username` | Public | Shareable profile |

---

## Local setup

### Requirements

- Node.js 18+
- MongoDB Atlas connection string
- Cloudinary account (for avatar uploads)

### Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

- Client: `http://localhost:5173`
- API: `http://localhost:5000`

---

## Environment variables

### Server

| Variable | Purpose |
|----------|---------|
| `PORT` | Server port (Render sets this automatically) |
| `MONGODB_URI` | MongoDB Atlas URI |
| `JWT_SECRET` | JWT signing secret |
| `CLIENT_URL` | Frontend origin (**no trailing slash**) |
| `NODE_ENV` | `development` or `production` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

### Client

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | API base URL, e.g. `http://localhost:5000/api` |

> Never commit real `.env` files. Keep a `.env.example` without secrets.

---

## Deployment

| Part | Platform | Config |
|------|----------|--------|
| Frontend | **Vercel** | Root directory `client`; env `VITE_API_URL` |
| Backend | **Render** | Root directory `server`; Node web service |
| Database | **MongoDB Atlas** | Network access allowed for Render |

### Production checklist

- [x] `CLIENT_URL=https://devlinks-bd.vercel.app` (no trailing slash)
- [x] CORS `origin` matches frontend exactly
- [x] Cookies use `secure: true` and `sameSite: "none"` in production
- [x] `vercel.json` rewrites SPA routes to `index.html`
- [x] Cloudinary and MongoDB env vars set on Render

---

## Security decisions

| Decision | Why |
|----------|-----|
| httpOnly cookie for JWT | Reduces XSS token theft compared to localStorage |
| RBAC middleware | Separates user product surface from admin tools |
| Soft delete | Recoverable moderation; guest re-login restores demo accounts |
| Demo admin limits | Safe public demo without wiping real users |
| Zod validation | Reject bad input before database writes |
| Helmet + rate limit | Baseline hardening for a public API |

---

## Challenges and solutions

| Challenge | Solution |
|-----------|----------|
| Cross-origin auth (Vercel ↔ Render) | `credentials: true` + `sameSite: "none"` + `secure` cookies |
| CORS mismatch | Strip trailing slash from `CLIENT_URL` |
| Soft-deleted guest + unique username | Restore guest document on guest login instead of inserting again |
| SPA 404 on hard refresh | Vercel rewrite all routes to `index.html` |
| Demo vs real admin power | Backend enforcement + frontend hide delete actions |

---

## Skills demonstrated

1. End-to-end product thinking — public page, dashboard, admin panel, deployment
2. Auth with httpOnly cookies, roles, and route guards
3. Modular REST API design with validation
4. Data modeling — User/Link relations, ordering, counters
5. UX details — live preview, drag-and-drop, QR share, themes
6. Production setup — env, CORS, SPA hosting, deployment 

---

## Future improvements

- [ ] OAuth (Google / GitHub)
- [ ] Advanced click analytics
- [ ] Open Graph tags for public profiles
- [ ] Automated tests

---

## License

[ISC](https://opensource.org/licenses/ISC)
