# 🚀 Netlify Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Files Ready

- [x] `index.html` - Main website
- [x] `styles.css` - Valorant styling
- [x] `script.js` - Google Sheets integration
- [x] Google Apps Script URL is correct

### 2. Test Locally

- [x] Double-click `index.html` to test
- [x] Verify Google Sheets data loads
- [x] Check mobile responsiveness

## 🎯 Netlify Deployment Steps

### Method 1: Drag & Drop (Recommended)

1. **Visit:** [netlify.com](https://netlify.com)
2. **Sign up** for free account
3. **Drag your project folder** to the deploy area
4. **Get your live URL!**

### Method 2: GitHub Integration

1. **Create GitHub repo** with your files
2. **Connect to Netlify** via "New site from Git"
3. **Auto-deploy** on every update

## 🌐 After Deployment

### Your live site will:

- ✅ **Work perfectly** - no CORS issues
- ✅ **Load real Google Sheets data**
- ✅ **Auto-refresh** every 5 minutes
- ✅ **Work on all devices** (mobile/desktop)
- ✅ **Have a custom URL** you can share

### Custom Domain (Optional)

- Netlify gives you: `random-name-123.netlify.app`
- You can change to: `valorant-leaderboard.netlify.app`
- Or use your own domain: `yoursite.com`

## 🔧 Configuration

### Environment Variables (if needed)

```
GOOGLE_SHEET_URL = https://script.google.com/macros/s/.../exec
```

### Build Settings

```
Build command: (none needed - static site)
Publish directory: . (root)
```

## 🎮 Post-Deployment Testing

1. **Visit your live URL**
2. **Test the refresh button**
3. **Check mobile view** (resize browser)
4. **Verify Google Sheets connection**
5. **Share with your team!**

## 🔗 Useful Links

- **Netlify Dashboard:** [app.netlify.com](https://app.netlify.com)
- **Domain Settings:** Site settings → Domain management
- **Deploy Logs:** Deploys → View details
- **Analytics:** Site overview

## 💡 Pro Tips

1. **Custom Name:** Change site name in Site settings
2. **Deploy Previews:** Test changes before going live
3. **Form Handling:** Netlify can handle contact forms
4. **Analytics:** Built-in visitor stats
5. **HTTPS:** Automatic SSL certificates

## 🚨 Troubleshooting

### Common Issues:

- **404 Error:** Make sure `index.html` is in root folder
- **CORS Issues:** These disappear on Netlify (yay!)
- **Google Sheets not loading:** Check your script URL

### Support:

- **Netlify Docs:** [docs.netlify.com](https://docs.netlify.com)
- **Community:** [community.netlify.com](https://community.netlify.com)

---

🎉 **Once deployed, your Valorant leaderboard will be live and accessible to everyone!**
