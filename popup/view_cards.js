// document.getElementById("home").addEventListener("click", function () {
//     location.reload();
//     }
// );

document.addEventListener("DOMContentLoaded", function() {

    const accomplishment = new Accomplishment();
    accomplishment.getQuote();

    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {

        let storageBox = accomplishment.sortByCreatedDate(result);

        // Find the number of max number rows we'll want to write based on the count of keys in storage
        let storageKeys = Object.keys(result);

        // Find the names of the values (like 'summary' e.g.)
        let storageValues = Object.values(result);

        let csv = 'date,summary,details,mood,favorite' + '\r\n';

        // Why do this loop outside of the loop below where we set properties for our object?
        // 1) No sorting is applied outside of the context of the object
        // 2) Only a single row appears to be written (there's probably an overwrite going on then)
        for (let i = 0; i < storageKeys.length; i++) {
            // When we write the date, it'll be in miliseconds. We may improve upon that.
            csv += (storageValues[i][2]['date']
                + ',' + storageValues[i][0]['summary']
                + ',' + storageValues[i][1]['details']
                + ',' + storageValues[i][3]['status']
                + ',' + storageValues[i][4]['favorite']
                + '\r\n')
        }

        // Remember when we used encodeURIComponent as part of our GET request to edit a card? Similar concept applies here
        document.getElementById('export').setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        document.getElementById('export').setAttribute('download', 'sample_export.csv');


        for (let i = 0; i < storageBox.length; i++) {
            accomplishment.summary = storageBox[i][0]['summary'];
            accomplishment.details = storageBox[i][1]['details'];
            accomplishment.date = storageBox[i][2]['date'];
            accomplishment.status = storageBox[i][3]['status'];
            accomplishment.favorite = storageBox[i][4]['favorite'];
            accomplishment.duration = 0;
            accomplishment.calcDuration();
            accomplishment.checkFavorite();
            accomplishment.buildCardColumns();

            // Export all won't work as expected here, see note above

        }

    });

});

