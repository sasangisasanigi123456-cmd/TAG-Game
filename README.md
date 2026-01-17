# Tag Game - Setup Instructions

## Files Created/Fixed

✅ **icons/** - SVG game icons (128x128, 256x256, 512x512)
✅ **appmanifest.json** - Progressive Web App manifest with proper configuration
✅ **sw.js** - Service Worker for offline caching and PWA support
✅ **index.html** - Updated with canvas element and startup scripts
✅ **patch/js/poki-sdk.js** - Poki SDK mock for local testing
✅ **All dependencies** - Game engine scripts and analytics

## How to Run the Game

### Option 1: Using Python (Recommended)

**For Python 3.x:**
```bash
cd "c:\Users\Dharu\Desktop\Tag game"
python -m http.server 8000
```

**For Python 2.x:**
```bash
cd "c:\Users\Dharu\Desktop\Tag game"
python -m SimpleHTTPServer 8000
```

Then open your browser and go to: **http://localhost:8000**

### Option 2: Using Node.js HTTP Server

Install http-server globally (if not already installed):
```bash
npm install -g http-server
```

Run it:
```bash
cd "c:\Users\Dharu\Desktop\Tag game"
http-server -p 8000
```

Then open: **http://localhost:8000**

### Option 3: Using VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Project Structure

```
Tag game/
├── index.html              # Main game page
├── style.css              # Game styles
├── appmanifest.json       # PWA manifest
├── sw.js                  # Service Worker
├── icons/                 # App icons
│   ├── icon-128.svg
│   ├── icon-256.svg
│   └── icon-512.svg
├── js/
│   ├── analytics_ubg_v1_4.js
│   └── ubg235_client_v1_2.js
├── scripts/
│   ├── main.js
│   ├── supportcheck.js
│   ├── offlineclient.js
│   ├── register-sw.js
│   └── c3runtime.js
└── patch/
    └── js/
        └── poki-sdk.js
```

## Features

- 🎮 **Full Game Support** - Construct 3 game engine
- 📱 **PWA Compatible** - Progressive Web App support
- 🔌 **Offline Support** - Service Worker for offline caching
- 🎨 **Icons** - SVG icons for all platforms
- 📊 **Analytics** - Google Analytics integration
- 🎯 **Poki SDK** - Local Poki SDK mock

## Important Notes

1. **HTTPS Warning**: Some features work best on HTTPS. For local development with HTTP, most features should still work.

2. **Service Worker**: Registered automatically on first load. Check browser DevTools > Application > Service Workers to verify.

3. **Browser Requirements**:
   - Modern browser with WebGL support
   - JavaScript enabled
   - WebAssembly support (for Construct 3)

4. **File Protocol Issue**: Running via `file://` protocol (double-clicking HTML) will show a warning. Use a local server instead.

## Troubleshooting

### Game doesn't load?
- Check browser console (F12) for errors
- Make sure you're using a local server (not file://)
- Check that all script files are present

### Service Worker not registering?
- Check that sw.js file exists in root directory
- Use HTTPS or localhost for SW registration
- Clear browser cache and reload

### Canvas not visible?
- Check CSS - the canvas element is automatically filled
- Verify JavaScript is enabled
- Check browser console for runtime errors

## Testing on Mobile

1. Find your computer's IP address: `ipconfig` (Windows)
2. On your phone, go to: `http://YOUR_IP:8000`
3. Bookmark or install as PWA

## Additional Resources

- Construct 3: https://www.construct.net/
- Poki SDK: https://sdk.poki.io/
- Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
