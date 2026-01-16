# Detective Conan Website

A modern, responsive fan website for Detective Conan (Case Closed) featuring character information, news, case updates, and an admin panel.

## 🏗️ Project Structure

```
detective-conan-website/
├── backend/                 # Node.js/Express API server
│   ├── models/             # MongoDB data models
│   │   ├── News.js
│   │   └── Case.js
│   ├── routes/             # API endpoints
│   │   ├── admin.js
│   │   ├── cases.js
│   │   └── news.js
│   ├── public/             # Admin panel static files
│   │   └── admin.html
│   ├── data/              # Database files

## 🏗️ Architecture

This is a **frontend-only** repository that connects to a separate backend API:

```
Frontend (Static) ←→ Backend API (Separate Repository)
```

### Frontend Features
- Pure HTML, CSS, JavaScript
- No server dependencies
- Ready for static hosting
- Remote API integration

### Backend Features
- Node.js/Express API
- Admin panel for content management
- Supabase database integration
- Authentication and security

## 🚀 Quick Start

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/johan-droid/DC_Webapp.git
   cd DC_Webapp
   ```

2. **Start local server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

3. **Open in browser**:
   ```
   http://localhost:3000
   ```

### API Configuration

The frontend connects to a remote backend API. Configure the backend URL in `frontend/js/api-config.js`:

```javascript
const API_CONFIG = {
    BASE_URL: 'https://your-backend-api.com',
    LOCAL_URL: 'http://localhost:3001'
};
```

## 🌐 Deployment

### Frontend Deployment (This Repository)

Deploy to any static hosting service:

#### Netlify (Recommended)
1. Push to GitHub
2. Connect to Netlify
3. Set build command: `echo "No build required"`
4. Set publish directory: `frontend`
5. Add environment variable: `API_BASE_URL`

#### Vercel
1. Import to Vercel
2. Set root directory: `frontend`
3. Deploy automatically

#### GitHub Pages
1. Push to `gh-pages` branch
2. Enable GitHub Pages in settings

### Backend Deployment (Separate Repository)

The backend is deployed separately with:
- Admin panel for content management
- API endpoints for data
- Database integration
- Authentication system

See [DEPLOYMENT_SEPARATED.md](./DEPLOYMENT_SEPARATED.md) for detailed backend deployment instructions.

## 📡 API Endpoints

### News API
- `GET /api/news` - Get all news (with pagination)
- `GET /api/news/:id` - Get single news article
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article

### Cases API
- `GET /api/cases` - Get all cases (with filtering)
- `GET /api/cases/:id` - Get single case
- `POST /api/cases` - Create new case
- `PUT /api/cases/:id` - Update case
- `DELETE /api/cases/:id` - Delete case

### Admin API
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/news` - Get all news (including unpublished)
- `GET /api/admin/cases` - Get all cases

### Health Check
- `GET /api/health` - Server health status

## 🎨 Frontend Features

- **Responsive Design**: Mobile-first approach with hamburger menu
- **Character System**: Dynamic character cards with theme switching
- **APTX Mode**: Toggle between normal and Black Organization themes
- **Interactive Elements**: Slideshow, quiz, and animated content
- **Modern CSS**: Glassmorphism, animations, and gradient effects
- **Content Security**: CSP headers for security

## 🔧 Admin Panel

Access the admin panel at `http://localhost:3000/admin`

Features:
- Create, edit, and delete news articles
- Manage case files and investigations
- View dashboard statistics
- Content management with validation

## 🗄️ Database Models

### News Schema
```javascript
{
  title: String (required),
  category: ['Fan Theory', 'Merchandise', 'Interview', 'General', 'Spoiler'],
  content: String (required),
  image: String (URL),
  link: String (URL),
  author: String,
  tags: [String],
  published: Boolean
}
```

### Case Schema
```javascript
{
  title: String (required),
  type: ['canon', 'anime', 'movie', 'ova', 'special'],
  description: String (required),
  image: String (URL),
  episodeNumber: Number,
  season: Number,
  airDate: Date,
  difficulty: ['Easy', 'Medium', 'Hard', 'Expert'],
  characters: [String],
  solved: Boolean,
  featured: Boolean
}
```

## 🔒 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API request throttling
- **Input Validation**: Joi schema validation
- **CSP**: Content Security Policy headers

## 🎯 Development Scripts

- `npm start` - Start backend server in production
- `npm run dev` - Start backend server in development
- `npm run frontend` - Start frontend server only
- `npm run fullstack` - Start both backend and frontend

## 🌍 Environment Variables

Create `backend/.env` with:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/detective-conan
FRONTEND_URL=http://localhost:8080
NODE_ENV=development
```

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is for educational purposes only. Detective Conan (Case Closed) is the property of Gosho Aoyama and Shogakukan.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check `MONGODB_URI` in `.env`
   - Verify network connectivity

2. **CORS Errors**
   - Check `FRONTEND_URL` in `.env`
   - Ensure frontend is running on correct port

3. **Module Import Errors**
   - Run `npm install` in root directory
   - Check Node.js version compatibility

4. **Admin Panel Not Loading**
   - Verify backend server is running
   - Check browser console for errors
   - Ensure admin.html is in `backend/public/`

### Development Tips

- Use `npm run dev` for development with auto-restart
- Check browser console for API errors
- Monitor network tab for failed requests
- Use MongoDB Compass for database management

## 📊 Performance

- **Frontend**: Optimized CSS and JavaScript
- **Backend**: Rate limiting and caching
- **Database**: Indexed queries and pagination
- **Images**: Lazy loading and error handling

## 🔮 Future Enhancements

- User authentication system
- Comment system for news and cases
- Search functionality
- Image upload capability
- Email notifications
- Social media integration
- Mobile app development
