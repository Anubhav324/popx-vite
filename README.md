# PopX — Vite + React + Tailwind CSS

## Run

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Pages & Flow

```
LandingPage  →  RegisterPage  →  AccountPage
             →  LoginPage     →  AccountPage  →  Logout  →  LandingPage
```

## Structure

```
src/
├── context/AuthContext.jsx     ← global user state
├── components/FloatingInput.jsx
├── pages/
│   ├── LandingPage.jsx         ← welcome + decorative dots
│   ├── RegisterPage.jsx        ← create account form
│   ├── LoginPage.jsx           ← sign in form
│   └── AccountPage.jsx         ← profile + settings
└── App.jsx                     ← router
```
