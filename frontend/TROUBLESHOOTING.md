# Troubleshooting Guide

## Common Issues and Solutions

### 1. Frontend Not Starting

**Issue**: `npm run dev` fails or shows errors

**Solutions**:
- Make sure you've installed dependencies:
  ```bash
  cd frontend
  npm install
  ```

- Check if Node.js is installed:
  ```bash
  node --version
  ```
  Should be v16 or higher.

- Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

### 2. Blank Screen or White Page

**Possible Causes**:
- Missing Clerk publishable key
- Backend not running
- CORS issues

**Solutions**:
- Create `.env` file in frontend directory:
  ```env
  VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
  ```

- Make sure backend is running on port 5000:
  ```bash
  cd backend
  npm run dev
  ```

- Check browser console for errors (F12)

### 3. Products Not Loading

**Issue**: Products page shows loading spinner forever or error

**Solutions**:
- Verify backend is running: `http://localhost:5000/api/products`
- Check browser console for CORS errors
- Verify backend has CORS enabled in `backend/index.js`

### 4. Cart Not Working

**Issue**: Can't add items to cart or cart is empty

**Solutions**:
- Make sure you're signed in (Clerk authentication required)
- Check that cart routes are enabled in `backend/index.js`
- Verify Clerk authentication is working
- Check browser console for API errors

### 5. Authentication Issues

**Issue**: Sign in/Sign up not working

**Solutions**:
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly in `.env`
- Make sure Clerk application is set up at https://clerk.com
- Check that the publishable key matches your Clerk dashboard

### 6. Styling Issues

**Issue**: Page looks unstyled or Tailwind not working

**Solutions**:
- Verify Tailwind is configured:
  ```bash
  # Check if tailwind.config.js exists
  ls frontend/tailwind.config.js
  ```

- Rebuild CSS:
  ```bash
  npm run dev
  ```

### 7. Module Not Found Errors

**Issue**: `Cannot find module` errors

**Solutions**:
- Reinstall dependencies:
  ```bash
  npm install
  ```

- Check if all required packages are in `package.json`
- Delete `node_modules` and reinstall

### 8. Port Already in Use

**Issue**: `Port 3000 is already in use`

**Solutions**:
- Kill the process using port 3000:
  ```bash
  lsof -ti:3000 | xargs kill -9
  ```

- Or change port in `vite.config.js`:
  ```js
  server: {
    port: 3001, // Change to different port
  }
  ```

## Getting Help

1. Check browser console (F12) for error messages
2. Check terminal for build/run errors
3. Verify all environment variables are set
4. Ensure backend is running and accessible
5. Check that all dependencies are installed

## Quick Health Check

Run these commands to verify setup:

```bash
# Check Node version
node --version

# Check if dependencies are installed
cd frontend && ls node_modules

# Check if backend is running
curl http://localhost:5000/api/products

# Check if frontend can start
cd frontend && npm run dev
```

