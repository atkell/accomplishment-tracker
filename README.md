# chrome-extension
Lessons learned in building a Chrome extension

# what is it?
Simply put, it is a way to track your accomplishments via a browser extension. The accomplishments are stored on your local machine via the Chrome browser storage API (https://developer.chrome.com/extensions/storage). Accomplishments are stored chronologically but are displayed in reverse order, with the newest item appearing first.

Current features include:
* Add new item
* Update an item
* Favorite an item
* See all items
* See favorited items
* See a random item
* Delete all items
* Delete an item
* Random quote for fun

Issues and feature requests may be found in the Issues area of the project repository. 

# how to install

1. Locate the green button labeled *Clone or Download* and click it in order to download a ZIP file
2. Unzip the contents of this file to a new folder in a location you'll remember (like Downloads or Desktop, e.g.)
3. In the Chrome browser, navigate to chrome://extensions
4. From the top right hand corner, toggle the slider element in order to enable "Developer Mode"
5. From the top left hand corner, click the button labeled "Load Unpacked", a dialog window will open
6. Navigate to the location chosen above, in Step 2
7. Click the button labeled "Select"
8. The extension will now display within the Extensions grid
9. From the bottom right hand corner of the card for this new extension, toggle the slider element in order to enable the extension
