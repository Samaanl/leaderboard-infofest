# 🔐 Fix Google Apps Script Permissions

## 🚨 Problem Identified

Your Google Apps Script works when you're logged in, but shows "Sorry, unable to open the file" for others. This is a **permission issue**.

## 🛠️ Solution Steps

### Step 1: Update Deployment Permissions

1. **Go to your Google Apps Script editor**
2. **Click "Deploy" → "Manage Deployments"**
3. **Click the Edit icon (✏️)** next to your deployment
4. **Update these settings:**
   ```
   Type: Web app
   Execute as: Me (samaan@youremail.com)
   Who has access: Anyone, even anonymous  ← CHANGE THIS
   ```
5. **Click "Deploy"**
6. **Authorize permissions** when prompted

### Step 2: Share Your Google Sheet (Important!)

1. **Open your Google Sheet**
2. **Click "Share" button** (top right)
3. **Change access to:**
   ```
   General access: Anyone with the link
   Role: Viewer
   ```
4. **Click "Done"**

### Step 3: Test the Fix

1. **Open incognito/private browser window**
2. **Visit:** https://script.google.com/macros/s/AKfycbxdqya2kM_CZ0GoEwNGTvnva3qdXPS7hBc81PKkfJ829-kdvNdrxa4EeET1TB0onBrM/exec
3. **Should now show your JSON data!**

## 🎯 Expected Result

After fixing permissions, anyone should see:

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
    "Rank": 3,
    "Player Name": "vivek",
    "Matches Played": 3,
    "Wins": 1,
    "Points": 21
  },
  {
    "Rank": 2,
    "Player Name": "sanjeet",
    "Matches Played": 7,
    "Wins": 0,
    "Points": 12
  }
]
```

## 🔒 Security Note

- **"Execute as: Me"** = Script runs with your permissions
- **"Anyone, even anonymous"** = Anyone can call the script
- **Sheet sharing** = Script can read the sheet data
- **This is safe** for read-only public leaderboards

## ✅ After This Fix

- ✅ Your website will work from any browser
- ✅ No more CORS errors
- ✅ Real Google Sheets data will load
- ✅ Auto-refresh will work perfectly

## 🆘 If Still Not Working

Try this alternative approach:

1. **Create a NEW deployment** instead of editing the old one
2. **Make sure to select "New Version"** when deploying
3. **Copy the NEW URL** and update it in your `script.js` file

The key is making sure the script has public access permissions! 🔓
