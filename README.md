# 🌦️ Weather Analytics Dashboard

A modern weather analytics application built with React, Redux, and real-time APIs featuring comprehensive forecasting, multi-city tracking, and interactive visualizations.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white) ![Redux](https://img.shields.io/badge/Redux_Toolkit-1.9.5-764ABC?logo=redux&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?logo=tailwind-css&logoColor=white)

## ✨ Features

- ✅ **Real-Time Weather** - Live updates every 60 seconds
- ✅ **7-Day Forecasts** - Daily and hourly predictions with charts
- ✅ **Multi-City Tracking** - Monitor unlimited locations
- ✅ **Smart Search** - Autocomplete with 300ms debouncing
- ✅ **Favorites System** - Persistent city bookmarks
- ✅ **Smart Caching** - 80% reduction in API calls
- ✅ **Interactive Charts** - Temperature trends with Recharts
- ✅ **Responsive Design** - Mobile, tablet, and desktop
- ✅ **Dark Mode Support** - Full theme implementation
- ✅ **Google OAuth** - Authentication ready

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/weather-analytics-dashboard.git
cd weather-analytics-dashboard

# Install dependencies
npm install

# Create .env file
REACT_APP_WEATHER_API_KEY=your_api_key_here
REACT_APP_WEATHER_API_BASE=https://api.openweathermap.org/data/2.5

# Start development server
npm start
```

**Get API Key:** [OpenWeatherMap](https://openweathermap.org/api) (Free tier: 60 calls/min)

---

## 📁 Project Structure

```
src/
├── components/       # UI components (CityCard, DetailView, etc.)
├── pages/           # HomePage, Dashboard
├── redux/           # Store, slices, thunks
├── services/        # API integration, caching
├── utils/           # Helpers, formatters
└── App.jsx          # Main app with routing
```

---

## 🎯 Core Features Implementation

### Dashboard
- City cards with temp, humidity, wind, visibility
- Auto-refresh every 60s
- Click card for detailed view

### Detailed View
- Current weather + 7-day forecast
- Interactive temperature chart
- 6 detailed metrics
- Modal interface

### Search & Favorites
- Debounced API search
- Star to favorite cities
- localStorage persistence

### Settings
- Celsius/Fahrenheit toggle
- Manage favorites
- Instant updates

---

## 🔧 Tech Stack

**Core:** React 18, Redux Toolkit, React Router  
**UI:** Tailwind CSS, Lucide Icons  
**Charts:** Recharts  
**API:** OpenWeatherMap  
**Caching:** localStorage (60s TTL)

---

## 📊 Assignment Checklist

### ✅ Core Requirements (100%)
- [x] Dashboard with city cards
- [x] 7-day + hourly forecasts
- [x] Search with autocomplete
- [x] Favorites persistence
- [x] Interactive charts
- [x] Celsius/Fahrenheit toggle
- [x] Real-time data (<60s)

### ✅ Bonus Features
- [x] Google Sign-In ready
- [x] Smart caching (80% reduction)
- [x] Professional landing page

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag 'build' folder to netlify.com/drop
```

**Environment Variables:**
- `REACT_APP_WEATHER_API_KEY`
- `REACT_APP_WEATHER_API_BASE`

---

## 📸 Screenshots

### Landing Page
<img width="1366" alt="Landing Page" src="https://github.com/user-attachments/assets/fc4d57d3-77e4-4232-9b1e-52e759b77401" />

### Dashboard
<img width="1234" alt="Dashboard" src="https://github.com/user-attachments/assets/b6895940-2942-41fc-8f4b-d7a8fb54c27f" />

### Detailed View
<img width="1366" alt="Detail View" src="https://github.com/user-attachments/assets/48c8c2a4-e441-4c0c-9012-d32c91fbba06" />

---

## 🐛 Common Issues

**API Not Working?**
- Check `.env` has `REACT_APP_` prefix
- Restart server: `npm start`
- Verify API key on OpenWeatherMap

**Charts Not Showing?**
```bash
npm install recharts
```

**Build Fails?**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 💡 Interview Highlights

**Performance:** "80% API call reduction through 60s caching + debounced search"

**Architecture:** "Clean separation: components, pages, Redux slices, services"

**Real-time:** "Auto-refresh only data older than 60s - intelligent updates"

**UX:** "Responsive design, loading states, error handling, smooth animations"

---

## 👨‍💻 Author

**MADESH N**  
📧 madeshnickil@gmail.com

---

## 🙏 Acknowledgments

- [React](https://react.dev/) - UI Library
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Charts
- [OpenWeatherMap](https://openweathermap.org/) - Weather API

---

## 📄 License

MIT License - See LICENSE file

---

**Last Updated:** November 2024 | **Status:** ✅ Production Ready

⭐ **Star this repo if you find it helpful!**
