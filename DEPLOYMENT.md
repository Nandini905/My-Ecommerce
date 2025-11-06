# Deployment Guide

This guide will help you deploy the frontend to Vercel and backend to Render.

## Frontend Deployment (Vercel)

### Step 1: Push code to GitHub
Make sure all your code is committed and pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New" → "Project"
4. Import your GitHub repository: `Nandini905/My-Ecommerce`
5. Configure the project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)
6. Add Environment Variables (if needed):
   - `REACT_APP_API_URL`: Your Render backend URL (e.g., `https://ecommerce-backend.onrender.com`)
   - `REACT_APP_RAZORPAY_KEY_ID`: Your Razorpay key (if not already in code)
7. Click "Deploy"

### Step 3: Verify Deployment
- Vercel will provide you with a URL like: `https://my-ecommerce.vercel.app`
- Your React Router routes should work thanks to `vercel.json`

---

## Backend Deployment (Render)

### Step 1: Prepare Render Configuration
The `render.yaml` file is already created in the project root.

### Step 2: Deploy to Render

1. Go to [https://render.com](https://render.com)
2. Sign in with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository: `Nandini905/My-Ecommerce`
5. Configure the service:
   - **Name**: `ecommerce-backend`
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or set to `server` if using manual setup)
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Instance Type**: Free (or choose based on your needs)
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `PORT`: Render sets this automatically (you can leave it)
   - Add any other environment variables your server needs
7. Click "Create Web Service"

### Step 3: Get Backend URL
- Render will provide a URL like: `https://ecommerce-backend.onrender.com`
- Note this URL - you'll need it for your frontend environment variables

### Step 4: Update Frontend Environment Variables
1. Go back to Vercel dashboard
2. Navigate to your project → Settings → Environment Variables
3. Add/Update:
   - `REACT_APP_API_URL`: `https://ecommerce-backend.onrender.com`
4. Redeploy the frontend

---

## Important Notes

### CORS Configuration
The backend server already has CORS enabled, which will allow your Vercel frontend to make requests to the Render backend.

### Environment Variables
- **Frontend (Vercel)**: Use `REACT_APP_` prefix for variables accessible in React
- **Backend (Render)**: Use standard environment variable names

### Database (if needed later)
If you add a database later:
- Render provides PostgreSQL databases
- Update your backend to use the database connection string from Render

### Free Tier Limitations
- **Render**: Services sleep after 15 minutes of inactivity (free tier)
- **Vercel**: No sleeping, but has usage limits
- First request to a sleeping Render service may take 30-60 seconds to wake up

---

## Troubleshooting

### Frontend Issues
- If routes show 404: Check that `vercel.json` is in the root directory
- If API calls fail: Check CORS settings and API URL environment variable

### Backend Issues
- If server won't start: Check logs in Render dashboard
- If CORS errors: Verify `cors()` middleware is enabled in server code
- Slow first request: Normal for free tier (service is waking up)

---

## Next Steps
1. Deploy backend first (Render)
2. Get backend URL
3. Deploy frontend (Vercel) with backend URL as environment variable
4. Test the complete application

