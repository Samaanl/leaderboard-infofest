# 🎮 Valorant Tournament Leaderboard

A responsive, real-time leaderboard for tracking Valorant tournament scores with Google Sheets integration.

![Valorant Leaderboard](https://img.shields.io/badge/Valorant-Leaderboard-ff4655?style=for-the-badge&logo=riot-games)
![Live Demo](https://img.shields.io/badge/Status-Live-00f5d4?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Mobile-Responsive-ffb300?style=for-the-badge)

## 🌟 Features

### 🏆 **Tournament Ready**
- Real-time leaderboard with live Google Sheets sync
- Automatic ranking based on points and wins
- Win rate calculations for each player
- Auto-refresh every 5 minutes

### 🎨 **Valorant-Themed Design**
- Custom Valorant color scheme (red, teal, gold)
- Animated background and smooth transitions
- Crown and medal icons for top 3 players
- Modern glassmorphism UI design

### 📱 **Fully Responsive**
- **Desktop:** Full table with all statistics
- **Mobile:** Optimized condensed view
- **Tablet:** Adaptive layout for all screen sizes
- Touch-friendly interface

### ⚡ **Performance**
- Fast loading with optimized assets
- Automatic HTTPS and CDN delivery
- Cross-browser compatibility
- Error handling with demo data fallback

## 🚀 Live Demo

🔗 **[View Live Leaderboard](https://your-site.netlify.app)** *(Replace with your actual URL)*

## 📊 Data Format

The leaderboard expects Google Sheets data in this format:

```json
[
  {
    "Rank": 1,
    "Player Name": "samaan",
    "Matches Played": 3,
    "Wins": 3,
    "Points": 1000
  },
  {
    "Rank": 2,
    "Player Name": "vivek",
    "Matches Played": 3,
    "Wins": 1,
    "Points": 21
  }
]
```

## 🛠️ Quick Setup

### 1. Google Sheets Setup
1. **Create a Google Sheet** with columns: `Rank | Player Name | Matches Played | Wins | Points`
2. **Add your tournament data**
3. **Go to Extensions → Apps Script**
4. **Replace code** with the provided Google Apps Script (see `google-apps-script.js`)
5. **Deploy as Web App** with "Anyone, even anonymous" access
6. **Copy the deployment URL**

### 2. Website Configuration
1. **Update `script.js`** with your Google Apps Script URL
2. **Share your Google Sheet** with "Anyone with the link" access
3. **Test locally** by opening `index.html`

### 3. Deploy Online
- **Netlify:** Drag & drop folder to [netlify.com](https://netlify.com)
- **Vercel:** Upload to [vercel.com](https://vercel.com)
- **GitHub Pages:** Upload to GitHub repository

*See detailed instructions in `NETLIFY-DEPLOY.md` and `FREE-HOSTING-OPTIONS.md`*

## 📁 Project Structure

```
valorant-leaderboard/
├── index.html              # Main HTML structure
├── styles.css              # Valorant-themed styling
├── script.js               # Google Sheets integration & logic
├── README.md               # Project documentation
├── google-apps-script.js   # Google Apps Script code
├── NETLIFY-DEPLOY.md       # Deployment instructions
├── FREE-HOSTING-OPTIONS.md # Hosting platform comparison
├── CORS-FIX.md            # CORS troubleshooting
└── PERMISSION-FIX.md      # Google Apps Script permissions
```

## 🎮 Usage

### For Tournament Organizers:
- **Update scores** in Google Sheets
- **Leaderboard auto-refreshes** every 5 minutes
- **Share the live URL** with participants
- **Mobile-friendly** for on-the-go updates

### For Participants:
- **View real-time rankings**
- **Check match statistics**
- **Access from any device**
- **Press 'R' to manually refresh**

## 🎨 Customization

### Colors & Theme
The website uses Valorant-inspired colors:
- **Primary Red:** #ff4655 (Valorant brand color)
- **Secondary Teal:** #00f5d4 (accent color)
- **Gold:** #ffd700 (first place)
- **Silver:** #c0c0c0 (second place)
- **Bronze:** #cd7f32 (third place)

### Auto-refresh Interval
Change refresh timing in `script.js`:
```javascript
startAutoRefresh(5); // Change 5 to desired minutes
```

## 🐛 Troubleshooting

### Common Issues:

**CORS Errors (Local Development)**
- ✅ **Normal behavior** when testing locally
- ✅ **Solution:** Deploy to hosting platform or open index.html directly

**Google Sheets Not Loading**
- ✅ Check Google Apps Script URL in `script.js`
- ✅ Verify sheet sharing permissions (Anyone with link)
- ✅ Test script URL directly in browser

**Data Not Updating**
- ✅ Verify Google Sheet has correct column headers
- ✅ Check Google Apps Script deployment permissions
- ✅ Try manual refresh with 'R' key

*See detailed troubleshooting in `CORS-FIX.md` and `PERMISSION-FIX.md`*

## 📱 Browser Support

- ✅ Chrome (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS/Android)

## 🚀 Deployment Options

### Free Hosting Platforms:
1. **Netlify** (Recommended) - Drag & drop deployment
2. **Vercel** - Fast, developer-friendly
3. **GitHub Pages** - Version control included
4. **Surge.sh** - Command line deployment
5. **Firebase Hosting** - Google infrastructure

*See complete comparison in `FREE-HOSTING-OPTIONS.md`*

## 🎯 Tournament Features

### Desktop View:
- Full statistics table
- Win rate percentages
- Hover effects and animations
- Crown/medal icons for top 3

### Mobile View:
- Condensed player information
- Essential stats summary (Matches, Wins, Win Rate)
- Touch-friendly refresh button
- Optimized for portrait/landscape

### Auto-Updates:
- Syncs with Google Sheets every 5 minutes
- Manual refresh with 'R' key
- Loading animations during updates
- Fallback to demo data if connection fails

## 📊 Expected Sheet Format

Your Google Sheet should have these columns:
```
Rank | Player Name | Matches Played | Wins | Points
1    | samaan     | 3              | 3    | 1000
2    | vivek      | 3              | 1    | 21
3    | sanjeet    | 7              | 0    | 12
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 🏆 Acknowledgments

- **Valorant** by Riot Games for design inspiration
- **Google Sheets API** for real-time data integration
- **Netlify/Vercel** for free hosting platforms
- **Font Awesome** for icons and **Google Fonts** for typography

---

### 🎮 Ready to deploy your tournament leaderboard? Check the setup guides in the included .md files!

**Made with ❤️ for the Valorant community**

## 🎯 Quick Setup Instructions

### Step 1: Deploy your Google Apps Script

1. Open your Google Sheet with the leaderboard data
2. Go to **Extensions > Apps Script**
3. Replace the default code with your existing code:
   ```javascript
   function doGet(e) {
     const sheet =
       SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
     const rows = sheet.getDataRange().getValues();
     const headers = rows.shift();
     const data = rows.map((r) =>
       Object.fromEntries(r.map((v, i) => [headers[i], v]))
     );
     return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
       ContentService.MimeType.JSON
     );
   }
   ```
4. Click **Save** (💾)
5. Click **Deploy > New Deployment**
6. Choose **Web app** as the type
7. Set **Execute as**: Me
8. Set **Who has access**: Anyone
9. Click **Deploy**
10. **COPY THE WEB APP URL** (it will look like: `https://script.google.com/macros/s/...../exec`)

### Step 2: Configure the Website

1. Open `script.js` in your code editor
2. Find this line:
   ```javascript
   const GOOGLE_SHEET_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual URL from Step 1

### Step 3: Test the Website

1. Open `index.html` in your web browser
2. Click the "Refresh" button to load data from your Google Sheet
3. The leaderboard should now display your actual data!

## 📱 Features

### Desktop Features:

- ✅ Full leaderboard with all columns (Rank, Player, Matches, Wins, Points)
- ✅ Win rate percentage calculation
- ✅ Top 3 players highlighted with special styling
- ✅ Animated background and smooth transitions
- ✅ Auto-refresh every 5 minutes

### Mobile Features:

- ✅ Responsive design optimized for mobile screens
- ✅ Condensed view showing essential info
- ✅ Mobile stats summary (Matches, Wins, Win Rate)
- ✅ Touch-friendly interface
- ✅ Same auto-refresh functionality

### Keyboard Shortcuts:

- Press **R** to manually refresh the leaderboard

## 🎨 Customization

### Colors & Theme:

The website uses Valorant-inspired colors:

- **Primary Red**: #ff4655 (Valorant brand color)
- **Secondary Teal**: #00f5d4 (accent color)
- **Gold**: #ffd700 (first place)
- **Silver**: #c0c0c0 (second place)
- **Bronze**: #cd7f32 (third place)

### Auto-refresh Interval:

To change the auto-refresh interval, modify this line in `script.js`:

```javascript
startAutoRefresh(5); // Change 5 to desired minutes
```

## 🔧 Troubleshooting

### Common Issues:

1. **"Failed to load leaderboard data"**

   - Check that your Google Apps Script URL is correct
   - Ensure the web app is deployed with "Anyone" access
   - Verify your Google Sheet has the correct column headers

2. **CORS Errors**

   - Make sure you're using the Google Apps Script web app URL, not the script editor URL
   - The URL should end with `/exec`, not `/edit`

3. **Data not updating**
   - Check that your Google Sheet data is being updated
   - Try manually refreshing the website
   - Verify the Google Apps Script permissions are set correctly

### Testing with Demo Data:

If you haven't set up the Google Sheet connection yet, the website will automatically load demo data so you can test the design and functionality.

## 📊 Expected Google Sheet Format

Your sheet should have these exact column headers:

- **Rank** (optional - will be calculated automatically)
- **Player Name**
- **Matches Played**
- **Wins**
- **Points**

Example:

```
Rank | Player Name | Matches Played | Wins | Points
1    | Aryan      | 5              | 4    | 40
2    | Samaan     | 6              | 3    | 30
```

## 🚀 Going Live

### Option 1: GitHub Pages (Free)

1. Create a GitHub repository
2. Upload your files (index.html, styles.css, script.js)
3. Enable GitHub Pages in repository settings
4. Your site will be live at: `https://yourusername.github.io/repository-name`

### Option 2: Netlify (Free)

1. Drag and drop your project folder to netlify.com
2. Get an instant live URL

### Option 3: Vercel (Free)

1. Upload to Vercel.com
2. Get automatic deployments on updates

Enjoy your awesome Valorant leaderboard! 🎮✨
