# 🔧 Environment Variables Setup

## Required Environment Variables

### 1. Supabase Configuration
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 2. Admin Security
```bash
ADMIN_SECRET=your-strong-password-here
```

### 3. Site Configuration (Optional)
```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 🚀 Setup Instructions

### For Vercel:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ADMIN_SECRET
```

### For Heroku:
```bash
heroku config:set NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
heroku config:set NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-service-key
heroku config:set ADMIN_SECRET=your-password
```

### For Render:
1. Go to Dashboard → Your Service → Environment
2. Add each variable:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_SECRET`

---

## 📋 How to Get Supabase Keys

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Settings** → **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

---

## 🔐 Security Best Practices

### Admin Password:
- Minimum 16 characters
- Mix of uppercase, lowercase, numbers, symbols
- Example: `Dc2026!SecurePass#Admin`

### Never commit:
- ❌ `.env.local`
- ❌ `.env.production.local`
- ✅ `.env.example` (template only)

---

## ✅ Verification

Test your setup:
```bash
# Local development
npm run dev

# Check if variables are loaded
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "supabase": "connected"
}
```