class Storage {

    countStoredItems() {
        chrome.storage.local.get(null, function (result) {
            let count_stored_items = Object.keys(result).length;
            document.getElementById('count-stored-items').innerHTML = "You have added " + count_stored_items + " accomplishments.️ ";

            // How may we find the date of the most recently added accomplishment?
            // We simply need to return the last item in the list of keys.
            // JavaScript apparently does not support using -1 in order to traverse the list backwards
            // It is, instead, recommended to array.length-1, which seems just as sane.
            let last_item_added = Object.keys(result)[count_stored_items - 1];
            // let first_item_added = Object.keys(result)[0];
            // let time_as_array_newest = Date(first_item_added).toLocaleString('en-US').split(' ');
            let time_as_array = Date(last_item_added).toLocaleString('en-US').split(' ');
            // 0 = Day of week, 1 = Month, 2 = Date, 3 = Year, 4 = Time
            // let date_as_string = time_as_array[0] + ', the ' + time_as_array[2] + ' of ' + time_as_array[1];
            let date_as_string = time_as_array[1] + ' ' + time_as_array[2] + ', ' + time_as_array[3];

            document.getElementById('count-stored-items').innerHTML += "The most recent is from " + date_as_string + '.';
        });
    }

    freeSpace() {
        chrome.storage.local.getBytesInUse(null, function (result) {
            let current_storage = result;
            let max_storage = 102400;
            let current_storage_as_percent = Math.round(current_storage / max_storage * 100);

            document.getElementById('progressbar').setAttribute('style', 'width: ' + current_storage_as_percent + "%;");
            document.getElementById('progressbar').setAttribute('aria-valuenow', current_storage_as_percent);
            document.getElementById('storage-used').innerHTML = "Used ( " + current_storage_as_percent + "% )";
            document.getElementById('storage-free').innerHTML = "Free ( " + (100 - current_storage_as_percent) + "% )";
        });
    }

    openNewTab(value) {
        chrome.tabs.create({url: chrome.extension.getURL(value)});
    }

    deleteAllItems() {
        // console.log("Pretend we deleted");
        chrome.storage.local.clear();
    }
}
