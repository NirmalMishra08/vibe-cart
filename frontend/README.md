# Vibe Cart - Frontend

A modern, interactive e-commerce frontend built with React, Vite, Tailwind CSS, and Framer Motion.

## Features

- 🎨 Beautiful, modern UI with gradient colors and smooth animations
- 🛍️ Product browsing with search and category filtering
- 🛒 Shopping cart with real-time updates
- 💳 Stripe checkout integration
- 🔐 Clerk authentication integration
- 📱 Fully responsive design
- ✨ Smooth animations and transitions

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the frontend directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

3. Make sure your backend is running on `http://localhost:5000`

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Backend Requirements

Make sure your backend has the following routes enabled:
- `GET /api/products` - Fetch all products
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Initialize Stripe checkout

Note: The cart and checkout routes are currently commented out in `backend/index.js`. Uncomment them to enable full functionality.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Clerk** - Authentication
- **Axios** - HTTP client

## Color Scheme

The app uses a vibrant color scheme:
- Primary: Blue gradient (#0ea5e9 to #0284c7)
- Accent: Purple gradient (#d946ef to #c026d3)
- Background: Soft gradient from slate to blue to purple

