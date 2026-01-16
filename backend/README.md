# 🔧 Detective Conan Backend API

The backend API server for the Detective Conan website, providing content management and admin functionality.

## 🌟 Features

- **RESTful API**: News and case management endpoints
- **Admin Panel**: Secure content management interface
- **Authentication**: Admin key-based authentication
- **Database Integration**: Supabase connectivity
- **Security**: Rate limiting, CORS, and security headers
- **Validation**: Input validation with Joi schemas

## 🏗️ Architecture

```
Backend API Server
├── Express.js Web Framework
├── Supabase Database
├── Admin Panel (HTML)
├── Authentication Middleware
└── Security Features
```

## 📁 Project Structure

```
detective-conan-backend/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
└── public/
    └── admin.html        # Admin panel interface
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Supabase account and project
- Git

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/johan-droid/detective-conan-backend.git
   cd detective-conan-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Start the server**:
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

5. **Access the API**:
   - API: `http://localhost:3001`
   - Admin Panel: `http://localhost:3001/admin.html`

## 🔧 Environment Variables

Create `.env` file with:

```env
PORT=3001
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_service_key
ADMIN_SECRET=your_admin_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Required Variables

- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase service role key
- `ADMIN_SECRET`: Secret key for admin authentication
- `FRONTEND_URL`: Your frontend URL for CORS

### Optional Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

## 📡 API Endpoints

### News API
- `GET /api/news` - Get all news (with pagination)
- `GET /api/news/:id` - Get single news article
- `POST /api/news` - Create news article (admin only)
- `PUT /api/news/:id` - Update news article (admin only)
- `DELETE /api/news/:id` - Delete news article (admin only)

### Cases API
- `GET /api/cases` - Get all cases (with filtering)
- `GET /api/cases/:id` - Get single case
- `POST /api/cases` - Create new case (admin only)
- `PUT /api/cases/:id` - Update case (admin only)
- `DELETE /api/cases/:id` - Delete case (admin only)

### Admin API
- `GET /api/admin/stats` - Get dashboard statistics (admin only)
- `GET /api/admin/news` - Get all news including unpublished (admin only)
- `GET /api/admin/cases` - Get all cases (admin only)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Authentication

### Admin Key Authentication
All admin endpoints require an `x-admin-key` header:

```javascript
headers: {
    'x-admin-key': 'your_admin_secret'
}
```

### Frontend Integration
The frontend should include the admin key in requests:

```javascript
const adminKey = localStorage.getItem('adminKey');
fetch('/api/admin/news', {
    headers: {
        'x-admin-key': adminKey
    }
});
```

## 🛡️ Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Joi schema validation
- **Admin Authentication**: Key-based access control

## 🗄️ Database Schema

### News Table
```sql
CREATE TABLE news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT CHECK (category IN ('Fan Theory', 'Merchandise', 'Interview', 'General', 'Spoiler')),
    content TEXT NOT NULL,
    image TEXT,
    link TEXT,
    author TEXT,
    tags TEXT[],
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Cases Table
```sql
CREATE TABLE cases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('canon', 'anime', 'movie', 'ova', 'special')),
    description TEXT NOT NULL,
    image TEXT,
    episode_number INTEGER,
    season INTEGER,
    air_date DATE,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard', 'Expert')),
    characters TEXT[],
    solved BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🌐 Deployment

### Render.com (Recommended)

1. **Create new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure**:
   - Name: `detective-conan-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`

4. **Add Environment Variables** in Render dashboard

### Heroku

1. **Create Heroku app**:
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**:
   ```bash
   heroku config:set SUPABASE_URL=your_url
   heroku config:set SUPABASE_KEY=your_key
   heroku config:set ADMIN_SECRET=your_secret
   heroku config:set FRONTEND_URL=your_frontend_url
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

### Docker

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY . .
   EXPOSE 3001
   CMD ["npm", "start"]
   ```

2. **Build and run**:
   ```bash
   docker build -t detective-conan-api .
   docker run -p 3001:3001 detective-conan-api
   ```

## 🧪 Development

### Local Development

1. **Start with nodemon** for auto-restart:
   ```bash
   npm run dev
   ```

2. **Test endpoints**:
   ```bash
   curl http://localhost:3001/api/health
   ```

3. **Access admin panel**:
   ```
   http://localhost:3001/admin.html
   ```

### Testing

- **Health Check**: `GET /api/health`
- **Test API**: Use Postman or curl
- **Admin Panel**: Test with admin key

## 📊 Monitoring

### Health Check Endpoint
```json
{
    "status": "healthy",
    "timestamp": "2024-01-16T12:00:00.000Z",
    "uptime": 3600,
    "database": "connected"
}
```

### Error Handling
- **400**: Bad Request (validation errors)
- **401**: Unauthorized (missing/invalid admin key)
- **404**: Not Found
- **429**: Too Many Requests (rate limit)
- **500**: Internal Server Error

## 🔄 API Usage Examples

### Get News
```javascript
const response = await fetch('http://localhost:3001/api/news');
const news = await response.json();
```

### Create News (Admin)
```javascript
const response = await fetch('http://localhost:3001/api/news', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-admin-key': 'your_admin_secret'
    },
    body: JSON.stringify({
        title: 'New Episode Released',
        category: 'General',
        content: 'Episode 1000 has been released...',
        author: 'Admin'
    })
});
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Related Repositories

- **Frontend**: [Detective Conan Frontend](https://github.com/johan-droid/DC_Webapp)
- **Documentation**: [Deployment Guide](../DEPLOYMENT_SEPARATED.md)

---

**🔧 Backend API ready for deployment!**

This backend provides the complete API infrastructure for the Detective Conan website with secure admin access and robust content management.
