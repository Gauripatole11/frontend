# FIDO2 Passkey Authentication System (Frontend)

Frontend implementation for passkey-based authentication system built with React, Vite, and Tailwind CSS.

## Project Structure
```
frontend/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── dashboard.jsx    # Admin dashboard for key management
│   │   │   └── login.jsx        # Admin authentication
│   │   └── users/
│   │       ├── login.jsx        # Passkey login
│   │       ├── profile.jsx      # User profile
│   │       └── register.jsx     # Passkey registration
│   ├── services/
│   │   ├── admin.service.jsx    # Admin API integration
│   │   ├── api.service.jsx      # Base API setup
│   │   ├── auth.service.jsx     # Authentication logic
│   │   └── common.jsx           # Shared utilities
│   └── hooks/
       ├── use-mobile.tsx
       └── use-toast.ts
```

## Getting Started

1. Installation
```bash
git clone https://github.com/Gauripatole11/frontend.git
cd frontend
npm install
```

2. Environment Setup
Create `.env` file:
```env
VITE_API_URL=http://localhost:3000
```

3. Development
```bash
npm run dev
```

4. Build
```bash
npm run build
```

## Tech Stack
- React
- Vite
- Tailwind CSS
- shadcn/ui components
- @simplewebauthn/browser

## Features
- Passkey registration and login
- Admin dashboard for key management
- Responsive design with Tailwind CSS
- Toast notifications for user feedback
- Mobile-responsive layouts

## Repository
[Frontend Repository](https://github.com/Gauripatole11/frontend)