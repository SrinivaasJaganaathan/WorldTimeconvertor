# World Time Converter Pro 🌍⏰

A beautiful, responsive web application for tracking time across multiple locations worldwide with weather integration and an interactive time converter.

![World Time Converter Pro](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop&crop=center)

## ✨ Features

### 🌐 Location Management
- **Automatic Location Detection**: Uses browser geolocation API with intelligent fallbacks
- **Global City Database**: Search from 60+ major cities across all continents
- **Smart Autocomplete**: Keyboard-navigable dropdown with instant search results
- **Country Flags**: Visual country identification for each location

### ⏰ Time Display
- **Real-time Updates**: Automatic time updates every second
- **Multiple Formats**: 12-hour, 24-hour, and ISO date formats
- **Timezone Awareness**: Accurate UTC offsets and timezone handling
- **Day/Night Indicators**: Visual sun/moon icons based on local time

### 🌤️ Weather Integration
- **Current Weather**: Temperature, conditions, and weather icons
- **Mock Data**: Demo-ready with realistic weather simulation
- **API Ready**: Easy integration with OpenWeatherMap API

### 🔄 Time Converter
- **Interactive Conversion**: Manually adjust time for any location
- **Automatic Updates**: All locations update simultaneously
- **Day Labels**: "Same day", "Next day", "Previous day" indicators
- **Reset Function**: Quick return to current time

### 🎨 User Experience
- **Dark/Light Mode**: Toggle with system preference detection
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Smooth Animations**: Polished transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader friendly

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with geolocation support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/world-time-converter-pro.git
   cd world-time-converter-pro
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🔧 Configuration

### Weather API Setup (Optional)
To use real weather data instead of mock data:

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Open `src/services/weatherService.ts`
3. Replace `'demo_key'` with your actual API key:
   ```typescript
   const WEATHER_API_KEY = 'your_actual_api_key_here';
   ```

### Customizing Cities
To add more cities, edit `src/services/locationService.ts` and add entries to the `MOCK_LOCATIONS` array:

```typescript
{
  name: 'Your City',
  country: 'Your Country',
  countryCode: 'CC',
  timezone: 'Continent/City',
  lat: 0.0000,
  lon: 0.0000
}
```

## 📱 Usage

### Adding Locations
1. Click the "Add Location" card
2. Search for a city using the autocomplete dropdown
3. Select from the results to add the location
4. Maximum of 3 locations (1 primary + 2 additional)

### Using Time Converter
1. Click "Time Converter" in the header
2. Adjust the date and time for your primary location
3. All other locations update automatically
4. Click "Reset Time" to return to current time

### Theme Toggle
- Click the sun/moon icon in the header to toggle themes
- Preference is automatically saved and persists across sessions
- Respects system dark mode preference on first visit

## 🏗️ Project Structure

```
world-time-converter-pro/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── LocationCard.tsx      # Individual location display
│   │   ├── LocationInput.tsx     # City search autocomplete
│   │   ├── TimeConverter.tsx     # Manual time adjustment
│   │   └── ThemeToggle.tsx       # Dark/light mode toggle
│   ├── services/
│   │   ├── locationService.ts    # City data and geolocation
│   │   └── weatherService.ts     # Weather API integration
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── timeUtils.ts         # Time formatting and calculations
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **Browser APIs** - Geolocation, Intl.DateTimeFormat

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌐 Deployment

### GitHub Pages
1. Build the project: `npm run build`
2. Deploy the `dist` folder to GitHub Pages
3. Enable GitHub Pages in repository settings

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Import your GitHub repository to Vercel
2. Vercel auto-detects Vite configuration
3. Deploy with zero configuration

### Manual Hosting
1. Run `npm run build`
2. Upload the `dist` folder contents to any web server
3. Ensure server supports client-side routing

## 🔒 Privacy & Security

- **No Data Collection**: All data stays in your browser
- **Local Storage Only**: Theme preferences saved locally
- **API Keys**: Weather API key (if used) stays client-side
- **Geolocation**: Only used with explicit user permission

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Add proper error handling
- Include JSDoc comments for complex functions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather icons from [OpenWeatherMap](https://openweathermap.org/)
- Country flags using Unicode flag emojis
- City data curated from major global metropolitan areas
- Icons from [Lucide](https://lucide.dev/)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/world-time-converter-pro/issues) page
2. Create a new issue with detailed description
3. Include browser version and steps to reproduce

---

**Made with ❤️ for developers who work across timezones**

⭐ Star this repository if you found it helpful!
