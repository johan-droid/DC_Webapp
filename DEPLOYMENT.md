# Production Deployment Guide

## 🚀 Deploy to Render + Supabase

This guide will help you deploy the Detective Conan website to production using Render for hosting and Supabase for the database.

## 📋 Prerequisites

- Render account (free tier available)
- Supabase account (free tier available)
- GitHub repository with your code

## 🗄️ Step 1: Set Up Supabase Database

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Choose organization and create new project
   - Wait for project to be ready (2-3 minutes)

2. **Get Database Credentials**
   - Go to Project Settings → API
   - Copy the Project URL (SUPABASE_URL)
   - Copy the service_role key (SUPABASE_KEY)

3. **Set Up Database Tables**
   - Go to SQL Editor in Supabase
   - Copy and run the contents of `supabase-setup.sql`
   - This creates the news and cases tables with proper indexes

## 🔧 Step 2: Update Environment Variables

1. **Update .env file**:
   ```env
   PORT=10000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-service-role-secret-key
   ADMIN_SECRET=APTX4869_SECRET_KEY_2024
   FRONTEND_URL=https://your-frontend-name.onrender.com
   ```

2. **Add Environment Variables to Render** (after deployment):
   - Go to your Render service dashboard
   - Add all the above variables in the Environment section

## 🌐 Step 3: Deploy Backend to Render

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for production deployment"
   git push origin main
   ```

2. **Create Backend Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - Name: `detective-conan-api`
     - Environment: `Node`
     - Build Command: `npm install`
     - Start Command: `npm start`
     - Instance Type: `Free`

3. **Set Environment Variables**
   - Add all variables from your .env file
   - Make sure to use the production Supabase credentials

## 🎨 Step 4: Deploy Frontend to Render

1. **Create Frontend Service**
   - Click "New +" → "Static Site"
   - Configure:
     - Name: `detective-conan-frontend`
     - Build Command: `echo "No build needed"`
     - Publish Directory: `frontend`
     - Add Redirect Rule: `/* /index.html 200`

2. **Update Frontend API URL**
   - In `frontend/js/api.js`, update the baseURL:
   ```javascript
   this.baseURL = 'https://your-backend-name.onrender.com/api';
   ```

## 🔐 Step 5: Configure Security

1. **CORS Settings**
   - In Supabase, go to Settings → API
   - Add your frontend URL to CORS origins
   - Add `https://your-backend-name.onrender.com`

2. **Admin Panel Access**
   - Go to `https://your-backend-name.onrender.com/admin`
   - Use the admin key: `APTX4869_SECRET_KEY_2024`

## ✅ Step 6: Test Everything

1. **Frontend**: Visit your frontend URL
2. **API**: Test `https://your-backend-name.onrender.com/api/news`
3. **Admin**: Test admin panel functionality
4. **Database**: Check Supabase dashboard for data

## 🔄 Step 7: Custom Domain (Optional)

1. **Add Custom Domain**
   - In Render dashboard, go to Custom Domains
   - Add your domain name
   - Update DNS records as instructed

2. **Update Environment Variables**
   - Update FRONTEND_URL in both services
   - Update CORS settings in Supabase

## 📊 Monitoring

- **Render Dashboard**: Monitor service health and logs
- **Supabase Dashboard**: Monitor database performance
- **Uptime**: Both services include basic monitoring

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Check SUPABASE_URL and SUPABASE_KEY
   - Ensure service_role key is used (not anon key)

2. **CORS Errors**
   - Add frontend URL to Supabase CORS settings
   - Check FRONTEND_URL environment variable

3. **Admin Panel Not Working**
   - Verify ADMIN_SECRET matches in both places
   - Check browser console for errors

4. **Static Site Issues**
   - Ensure redirect rule is set up correctly
   - Check file paths in frontend

### Debug Steps

1. **Check Render Logs**
   - Go to service dashboard → Logs
   - Look for error messages

2. **Test API Directly**
   ```bash
   curl https://your-backend.onrender.com/api/news
   ```

3. **Check Supabase Connection**
   - Test SQL queries in Supabase editor
   - Verify table permissions

## 🎯 Production Optimizations

1. **Performance**
   - Enable caching in Render (paid plans)
   - Use CDN for static assets
   - Optimize images and assets

2. **Security**
   - Use HTTPS (automatic on Render)
   - Keep admin key secure
   - Monitor for unusual activity

3. **Scaling**
   - Upgrade to paid Render plans for better performance
   - Consider Supabase Pro for higher limits

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **GitHub Issues**: Report issues in repository

Your Detective Conan website is now production-ready! 🕵️‍♂️
