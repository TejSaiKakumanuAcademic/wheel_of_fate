# Installation & Setup Guide

## Quick Start

### Option 1: If you have npm/node installed

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser at `http://localhost:5173`

### Option 2: Using Docker (if you prefer)

```bash
docker build -t wheel-of-fate .
docker run -p 5173:5173 wheel-of-fate
```

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Features Overview

### 🎡 Spinning Wheel
- Beautiful circular wheel animation
- Smooth spin with realistic physics
- Winner highlighted with confetti animation
- Works with any number of names

### ⏱️ Timer
- Configurable duration (5-120 seconds)
- Circular progress indicator
- Visual countdown display
- Audio alert when time expires
- Pause/Resume functionality

### 📁 Groups System
- Create multiple groups for different sessions
- Switch between groups easily
- Each group stores its own names
- Export/Import to Excel

### 📝 Name Management
- Add names with unique colors
- Edit names inline
- Delete unwanted names
- Color-coded wheel slices

### 💾 Data Persistence
- All data saved to browser's localStorage
- Groups, names, and settings persist between sessions
- Export to Excel for backup
- Import from Excel to restore

## Troubleshooting

### Node/npm not found
If you see "command not found" errors, you need to install Node.js:
- Download from https://nodejs.org/
- Or use a package manager like Homebrew on macOS:
  ```bash
  brew install node
  ```

### Port already in use
If port 5173 is busy, Vite will automatically use the next available port (5174, 5175, etc.)

### Canvas not rendering
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Clear browser cache if issues persist

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported
- Safari: ✅ Fully supported
- Mobile browsers: ✅ Responsive design

## Production Deployment

### Build Static Files
```bash
npm run build
```

This creates a `dist` folder with static files ready to deploy to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

## Need Help?

- Check the main README.md for detailed documentation
- Review the code comments for implementation details
- Open an issue if you encounter bugs

