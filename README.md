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
│   ├── server.js          # Main server file
│   ├── .env.example       # Environment variables template
│   └── package.json       # Backend dependencies
├── frontend/              # Static frontend files
│   ├── css/              # Stylesheets
│   │   └── style.css
│   ├── js/               # JavaScript files
│   │   ├── main.js
│   │   └── api.js        # API service
│   ├── assets/           # Images and media
│   ├── index.html        # Homepage
│   ├── characters.html   # Characters page
│   ├── news.html         # News page
│   └── updates.html      # Updates page
├── package.json          # Root package configuration
└── README.md            # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd detective-conan-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env with your configuration
   ```

4. **Start MongoDB**
   - For local MongoDB: `mongod`
   - Or update `MONGODB_URI` in `.env` for cloud MongoDB

### Running the Application

#### Option 1: Full Stack (Recommended)
```bash
npm run fullstack
```
This starts both the backend server (port 3000) and frontend server (port 8080) concurrently.

#### Option 2: Backend Only
```bash
npm start          # Production
# or
npm run dev        # Development with nodemon
```

#### Option 3: Frontend Only
```bash
npm run frontend
```

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
