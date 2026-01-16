# 🔍 Detective Conan Website

A modern, responsive fan website for Detective Conan (Case Closed) anime and manga series.

## � Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark Theme**: Mysterious dark interface with red accents
- **Character Profiles**: Interactive character grid with APTX-4869 toggle
- **News & Updates**: Dynamic content from remote API
- **Case Files**: Browse episodes, movies, and special investigations
- **Interactive Quiz**: Test your Detective Conan knowledge
- **Smooth Animations**: Scroll-triggered animations and transitions

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

## 📁 Project Structure

```
detective-conan-website/
├── frontend/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   ├── api-config.js       # API configuration
│   │   ├── main.js           # Main functionality
│   │   └── api.js            # API helpers
│   ├── assets/               # Images and assets
│   │   ├── conan-mystery-hero.png
│   │   ├── gin-villain.png
│   │   └── hero-bg.png
│   ├── index.html           # Homepage
│   ├── characters.html       # Character profiles
│   ├── news.html           # News & updates
│   └── updates.html        # Case files
├── package.json            # Frontend configuration
├── README.md              # This file
├── ADMIN_GUIDE.md         # Admin panel guide
├── DEPLOYMENT.md          # Original deployment guide
└── DEPLOYMENT_SEPARATED.md # Separated deployment guide
```

## 🎨 Features Overview

### 🎭 Character System
- Interactive character grid
- APTX-4869 pill toggle (Normal ↔ Black Organization)
- Smooth hover animations
- Image fallback system
- Mobile-responsive layout

### 📰 Content Management
- News articles from remote API
- Case files and episodes
- Category filtering
- Search functionality
- Pagination support

### 🎯 User Experience
- Smooth scroll animations
- Mobile hamburger menu
- Glassmorphism effects
- Responsive typography
- Touch-friendly interface

### 🔐 Security
- Content Security Policy
- HTTPS ready
- No sensitive data in frontend
- API key protection

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations
- **JavaScript ES6+**: Modern JavaScript features
- **Responsive Design**: Mobile-first approach

### Backend (Separate)
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Supabase**: Database and authentication
- **Helmet**: Security headers

## 🎮 Interactive Elements

### APTX-4869 Toggle
Click the red/white pill in the bottom-right corner to switch between:
- **Normal Mode**: Main character profiles
- **Black Organization Mode**: Villain profiles and dark theme

### Detective Quiz
Test your knowledge with interactive questions about:
- Character relationships
- Plot points
- Mystery elements
- Series trivia

### Dynamic Content
- Real-time news updates
- Episode database
- Character information
- Image galleries

## 📱 Mobile Optimization

- Touch-friendly navigation
- Responsive character grid
- Optimized animations
- Fast loading times
- Progressive enhancement

## 🔧 Customization

### Theme Colors
Easily customize the theme by modifying CSS variables:

```css
:root {
    --bg-primary: #0a0e17;
    --accent-red: #e63946;
    --text-primary: #f1faee;
    /* ... */
}
```

### API Endpoints
Configure backend endpoints in `api-config.js`:

```javascript
ENDPOINTS: {
    NEWS: '/api/news',
    CASES: '/api/cases'
}
```

## 🚨 Important Notes

### Admin Access
- Admin panel is **backend-only**
- Access via separate backend URL
- Protected by admin key
- Not linked from frontend

### Content Sources
- All character data from API
- Images from CDN or backend
- No hardcoded content
- Real-time updates

### Performance
- Optimized for fast loading
- Minimal dependencies
- Efficient animations
- CDN-ready assets

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Test thoroughly
5. Submit pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Detective Conan series by Gosho Aoyama
- Character information from Detective Conan World
- Icons and assets from various sources
- Community contributions and feedback

---

**🔥 "When you have eliminated the impossible, whatever remains, however improbable, must be the truth."**

Visit the live site and explore the world of Detective Conan!

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
