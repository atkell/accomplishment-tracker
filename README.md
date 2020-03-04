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
Download a ZIP of this repository. Unzip the archive somewhere you'll remember.

1. Launch the Chrome browser
2. Navigate to chrome://extensions/
3. From the top right hand corner, toggle the slider element in order to enable "Developer Mode"
4. From the top left hand corner, click the button labeled "Load Unpacked"
5. Navigate to the location where you unzipped the archive
6. Click the button labeled "Select"
7. The extension will now display within the Extensions grid
8. From the bottom right hand corner of the card for this new extension, toggle the slider element in order to enable the extension
