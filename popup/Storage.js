class Storage {

    countStoredItems() {
        chrome.storage.local.get(null, function (result) {

            // How to determine the date? One of two ways: By the "key" associated with the entry or by the "date" attribute
            // associated with the object. These two time values may become out of sync if we start updating the "date" attribute
            // of an object upon successful update. It could also be premature to consider this.
            // Either way, both methods are shown below. The former is commented out, the latter is in play.

            // Determine time from storage "key"
            // let count_stored_items = Object.keys(result).length;
            // let last_item_added = Object.keys(result)[count_stored_items - 1];
            // let last_as_string = time_as_array[1] + ' ' + time_as_array[2] + ', ' + time_as_array[3];
            // let first_item_added = Date(Object.keys(result)[0]).toLocaleString('en-US').split(' ');
            // let first_as_string = first_item_added[1] + ' ' + first_item_added[2] + ', ' + first_item_added[3];
            //
            // document.getElementById('count-stored-items').innerHTML = "You've added " + count_stored_items + " accomplishments️ ";
            // document.getElementById('count-stored-items').innerHTML += "since " + first_as_string + ". ";
            // document.getElementById('count-stored-items').innerHTML += "The most recent is from " + last_as_string + '.';


            // Determine time from object property
            let values = Object.values(result); // This will return an array of values associated with each stored item
            var arr = []; // We want to create a new array made up ONLY of dates, so let's loop
            for (let i = 0; i < values.length; i++) {
                arr.push(values[i][2]['date']); // Add each date found to our new array
            }
            let newest_item = new Date(arr[arr.length - 1]).toString().split(' ');
            let newest_string = newest_item[1] + ' ' + newest_item[2] + ', ' + newest_item[3];
            let oldest_item = new Date(arr[0]).toString().split(' ');
            let oldest_string = oldest_item[1] + ' ' + oldest_item[2] + ', ' + oldest_item[3];

            document.getElementById('count-stored-items').innerHTML = "You've added " + values.length + " accomplishments️ ";
            document.getElementById('count-stored-items').innerHTML += "since " + oldest_string + ". ";
            document.getElementById('count-stored-items').innerHTML += "The most recent is from " + newest_string + '.';


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
        location.reload();
    }
}
