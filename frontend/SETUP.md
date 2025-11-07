# Quick Setup Guide

## Step 1: Install Dependencies

```bash
cd frontend
npm install
```

This will install all required packages including:
- React
- Vite
- Tailwind CSS
- Framer Motion
- Clerk
- React Router
- Axios
- Lucide React (icons)

## Step 2: Set Up Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
touch .env
```

Add your Clerk Publishable Key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

**To get your Clerk key:**
1. Go to https://clerk.com
2. Sign up or log in
3. Create a new application
4. Copy the "Publishable Key" from the API Keys section
5. Paste it in your `.env` file

## Step 3: Start Backend

Make sure your backend is running:

```bash
cd ../backend
npm install  # if not already done
npm run dev
```

The backend should be running on `http://localhost:5000`

## Step 4: Start Frontend

In a new terminal:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Step 5: Verify Everything Works

1. Open `http://localhost:3000` in your browser
2. You should see the products page
3. Try signing in (top right)
4. Add products to cart
5. Go to cart and checkout

## Common First-Time Issues

### Issue: "Cannot find module" errors
**Fix**: Make sure you ran `npm install` in the frontend directory

### Issue: Blank page
**Fix**: 
- Check browser console (F12) for errors
- Verify `.env` file exists and has the Clerk key
- Make sure backend is running

### Issue: Products not loading
**Fix**: 
- Verify backend is running on port 5000
- Check `http://localhost:5000/api/products` in browser
- Should return JSON array of products

### Issue: Authentication not working
**Fix**:
- Verify Clerk key is correct in `.env`
- Make sure key starts with `pk_test_` or `pk_live_`
- Check Clerk dashboard to ensure app is active

## Need Help?

Check `TROUBLESHOOTING.md` for more detailed solutions.

