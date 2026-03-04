# RESERVO — React Booking App

A frontend-only React booking application with localStorage authentication.

## Tech Stack

- **React 18** (Hooks, Context API)
- **React Router v6** (with protected / guest routes)
- **Vite** (dev server & build)
- **CSS Modules** (scoped styles per component)
- **localStorage** (auth sessions, user accounts, bookings — no backend)

## Project Structure

```
reservo-react/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                   # Entry: providers + BrowserRouter
    ├── App.jsx                    # Routes + ProtectedRoute / GuestRoute
    ├── assets/
    │   └── global.css             # CSS variables & body styles
    ├── context/
    │   ├── AuthContext.jsx        # login / register / logout + session
    │   ├── BookingsContext.jsx    # bookings CRUD + localStorage sync
    │   └── ToastContext.jsx       # global toast notifications
    ├── hooks/
    │   ├── useForm.js             # controlled form helper
    │   └── useLocalStorage.js    # typed localStorage hook
    ├── data/
    │   └── services.js            # service catalogue + time slots
    ├── components/
    │   ├── AuthLayout.jsx / .module.css   # split-panel auth wrapper
    │   ├── AppNav.jsx / .module.css       # sticky top nav
    │   ├── ServiceCard.jsx / .module.css  # service card
    │   ├── BookingModal.jsx / .module.css # date + time-slot picker
    │   └── Toast.jsx / .module.css        # toast notification
    └── pages/
        ├── LoginPage.jsx          # /login
        ├── RegisterPage.jsx       # /register
        ├── AuthPage.module.css    # shared auth form styles
        ├── ServicesPage.jsx       # / (home)
        ├── ServicesPage.module.css
        ├── BookingsPage.jsx       # /bookings
        └── BookingsPage.module.css
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and register a new account.

## localStorage Keys

| Key | Description |
|-----|-------------|
| `reservo_users` | Array of registered user objects |
| `reservo_session` | Currently logged-in user (persists on refresh) |
| `reservo_bookings` | Array of all bookings across all users |

## Features

- Register / Login with client-side validation
- Persistent sessions — stays logged in on page refresh
- Protected routes — unauthenticated users redirected to `/login`
- Browse & filter services by category
- Book sessions — date picker + time slot grid (taken slots disabled in real-time)
- My Bookings — stats dashboard, upcoming vs completed labels, cancel anytime
- Toast notifications for booking confirmation and cancellation
