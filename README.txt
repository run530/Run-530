RUN PLAN APP - SETUP

FILES
index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png, apple-touch-icon.png
Keep them all together in one folder. Do not rename them.

OPTION 1: NETLIFY DROP (easiest, needs a computer, about 2 minutes)
1. Unzip this folder.
2. Go to app.netlify.com/drop and sign up for a free account.
3. Drag the whole unzipped folder onto the page.
4. You get a web address (e.g. something.netlify.app). You can rename it in Site settings.

OPTION 2: GITHUB PAGES
1. Create a free GitHub account and a new public repository.
2. Upload all six files to it.
3. Settings > Pages > Deploy from a branch > main > Save.
4. After a minute your site is at https://YOUR-NAME.github.io/REPO-NAME/

ADD TO YOUR HOME SCREEN (iPhone)
1. Open the web address in Safari (not inside another app).
2. Tap Share, then Add to Home Screen, then Add.
Android: open it in Chrome, tap the menu, then Install app / Add to Home screen.

NOTES
- Always open the app from the Home Screen icon so your data stays in one place.
- Your progress is stored on that device. Use Progress > Back up data now and then,
  and Restore backup to move it to a new phone.
- Progress from the claude.ai version does NOT carry over. Re-add runs by importing
  the Garmin files again.
- To update the app later, drag the new folder onto Netlify (or upload to GitHub). Your data is kept.
- Weather uses the free Open-Meteo service for Perth (Mount Claremont). It only needs internet.
- To change the weather location, edit latitude=-31.96 and longitude=115.78 in index.html.
