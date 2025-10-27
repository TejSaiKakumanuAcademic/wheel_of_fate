# 🎡 Wheel of Fate - Random Name Picker

A fun and interactive web application for randomly selecting names using a spinning wheel animation. Perfect for classrooms, teams, or event organizers!

## ✨ Features

### 🎯 Core Features
- **Spinning Wheel Interface**: Beautiful circular wheel with smooth acceleration/deceleration animation
- **Variable Timer**: Configurable countdown timer that starts after selection
- **Groups/Folders System**: Organize participants into groups for different sessions
- **Name Management**: Add, edit, and delete names with ease
- **Data Persistence**: All data saved to browser's local storage
- **Confetti Animation**: Celebratory effects when a winner is selected

### 🎨 Additional Features
- **Color-Coded Names**: Automatic colorful slices on the wheel
- **Export/Import Excel**: Export groups data to Excel and import back
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Sound Effects**: Audio feedback with timer alerts
- **Smooth Animations**: Powered by Framer Motion

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd wheel-of-fate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📖 Usage

1. **Add Names**: Enter names in the input field and click "Add"
2. **Create Groups**: Click "New Group" to organize different sets of people
3. **Spin the Wheel**: Click the "Spin the Wheel!" button to randomly select a name
4. **Set Timer**: Adjust the timer duration in Settings before starting
5. **Export Data**: Use the Export button to save your data as an Excel file

## 🛠️ Technical Stack

- **React 18**: Modern UI library
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Canvas API**: Wheel rendering
- **Howler.js**: Audio effects
- **XLSX**: Excel import/export

## 📁 Project Structure

```
wheel-of-fate/
├── src/
│   ├── components/
│   │   ├── Wheel.jsx       # Main spinning wheel component
│   │   ├── Timer.jsx       # Countdown timer
│   │   ├── NameList.jsx    # Name management
│   │   ├── GroupSelector.jsx  # Groups UI
│   │   ├── Settings.jsx    # App settings
│   │   └── Confetti.jsx    # Confetti animation
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Customization

You can customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#FFE66D',
    },
  },
}
```

## 🐛 Troubleshooting

- **Canvas not rendering**: Make sure your browser supports HTML5 Canvas
- **Data not persisting**: Check if localStorage is enabled in your browser
- **Sound not working**: Check browser permissions for audio

## 📝 License

MIT License - Feel free to use and modify as needed!

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## 📧 Support

For questions or support, please open an issue on the repository.

---

Made with ❤️ for fun and fair random selection!

