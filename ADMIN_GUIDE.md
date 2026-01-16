# 🔐 Detective Conan Website - Admin Guide

## 📋 Overview
The Detective Conan website includes a powerful admin panel that allows you to manage news articles and case files dynamically. This guide will walk you through accessing and using the admin features.

## 🚀 How to Access Admin Panel

### Method 1: Direct URL
- Navigate to: `http://localhost:3000/admin.html`

### Method 2: Navigation Link
- Click the "🔐 Admin" link in the main navigation menu (red colored)

## 🔑 Authentication

### Admin Access Key
You need to enter the secret admin key to access posting features:

**Default Key:** `APTX4869_SECRET_KEY_2024`

This is set in your `.env` file:
```
ADMIN_SECRET=APTX4869_SECRET_KEY_2024
```

## 📝 Admin Features

### 1. 📰 Post News Articles
Create news articles that appear on the News & Gossip page.

**Fields:**
- **Headline**: News title (e.g., "New Black Org Member Revealed?")
- **Category**: Choose from:
  - Fan Theory
  - Merchandise  
  - Interview
  - Breaking News
- **Image URL**: Optional image for the news article
- **Story/Teaser**: The news content/summary

**Steps:**
1. Enter admin key in the security field
2. Make sure "Post News" tab is active
3. Fill in all required fields
4. Click "Publish News"

### 2. 🗂️ Add Case Files
Add detective cases that appear in the Investigations section.

**Fields:**
- **Case Title/Episode**: Case name (e.g., "Ep 1150: The Silent Killer")
- **Type**: Choose from:
  - Manga Canon (from original manga)
  - Anime Original (anime-only episodes)
  - Feature Film (movies)
- **Evidence Image URL**: Optional case-related image
- **Investigation Details**: Case description and details

**Steps:**
1. Enter admin key in the security field
2. Click "Add Case File" tab
3. Fill in all required fields
4. Click "File Case Report"

## 💾 Data Storage

### With Supabase Database
When you set up Supabase credentials in `.env`:
- News and cases are stored in your Supabase database
- Data persists across server restarts
- Multiple admin users can add content

### Without Database (Fallback Mode)
If Supabase is not configured:
- Content is stored in memory only
- Data resets when server restarts
- Good for testing and development

## 🛠️ Setup Instructions

### 1. Configure Environment
Edit your `.env` file:
```env
# Supabase (optional - for persistent storage)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-secret-key

# Admin security
ADMIN_SECRET=APTX4869_SECRET_KEY_2024
FRONTEND_URL=http://localhost:3000
```

### 2. Start Server
```bash
cd backend
node server.js
```

### 3. Access Admin Panel
Open browser to: `http://localhost:3000/admin.html`

## 🔒 Security Features

### Admin Key Protection
- All POST requests require valid admin key
- Key is sent as `x-admin-key` header
- Invalid keys return 401 Unauthorized error

### Rate Limiting
- API endpoints are rate-limited to prevent abuse
- 100 requests per 15 minutes per IP

### Input Validation
- All inputs are validated using Joi schemas
- Prevents malicious data injection
- Ensures data consistency

## 🎨 Admin Interface Features

### Responsive Design
- Works on desktop and mobile devices
- Touch-friendly interface
- Dark theme matching main site

### User Experience
- Tab-based interface for easy switching
- Form validation with helpful error messages
- Success confirmations for published content
- Automatic form reset after successful submission

### Visual Feedback
- Security section highlighted in red
- Active tab clearly indicated
- Hover effects on interactive elements
- Loading states during API calls

## 📱 Mobile Usage

The admin panel is fully responsive:
- Forms adapt to mobile screens
- Touch-optimized buttons and inputs
- Maintains functionality on all devices

## 🚨 Troubleshooting

### Common Issues

**"Please enter Admin Access Key first!"**
- Make sure you entered the admin key before submitting
- Check the key matches your `.env` ADMIN_SECRET

**"Database not available"**
- Supabase credentials are missing or invalid
- Content will work in fallback mode

**"Network Error"**
- Server might not be running
- Check if backend is started on port 3000

**401 Unauthorized**
- Admin key is incorrect
- Verify key in `.env` file

### Debug Mode
Open browser developer tools (F12) to see:
- API request/response details
- Error messages in console
- Network activity

## 🔄 Content Management

### Editing Content
Currently, the admin panel supports adding new content. To edit existing content:

1. **Database Method**: Use Supabase dashboard to directly edit tables
2. **File Method**: Add edit functionality to the admin panel (advanced)

### Deleting Content
1. **Database Method**: Use Supabase dashboard
2. **API Method**: Add DELETE endpoints to server (advanced)

## 🎯 Best Practices

1. **Use meaningful headlines** that grab attention
2. **Choose appropriate categories** for better organization
3. **Add quality images** to enhance visual appeal
4. **Write engaging descriptions** for case files
5. **Test all links** before publishing
6. **Keep admin key secure** and change it regularly

## 📞 Support

If you encounter issues:
1. Check server console for error messages
2. Verify `.env` configuration
3. Ensure all dependencies are installed
4. Test with different browsers

---

**🎉 Congratulations!** You now have full control over your Detective Conan website content. Use your admin powers wisely to keep the mystery alive!
