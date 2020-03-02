document.addEventListener("DOMContentLoaded", function() {
    const accomplishment = new Accomplishment();
    accomplishment.getQuote();

    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {

        let storageBox = accomplishment.sortByCreatedDate(result);
        let randomIndex = accomplishment.getRandomInt(0, storageBox.length);
        let csv = 'date,summary,details,mood,favorite' + '\r\n';

        accomplishment.summary = storageBox[randomIndex][0]['summary'];
        accomplishment.details = storageBox[randomIndex][1]['details'];
        accomplishment.date = storageBox[randomIndex][2]['date'];
        accomplishment.status = storageBox[randomIndex][3]['status'];
        accomplishment.favorite = storageBox[randomIndex][4]['favorite'];
        accomplishment.duration = 0;
        accomplishment.calcDuration();
        accomplishment.checkFavorite();
        accomplishment.buildCardColumns();

        csv += (storageBox[randomIndex][2]['date']
            + ',' + storageBox[randomIndex][0]['summary']
            + ',' + storageBox[randomIndex][1]['details']
            + ',' + storageBox[randomIndex][3]['status']
            + ',' + storageBox[randomIndex][4]['favorite']
            + '\r\n');

        // Remember when we used encodeURIComponent as part of our GET request to edit a card? Similar concept applies here
        document.getElementById('export').setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
        document.getElementById('export').setAttribute('download', 'random_export.csv');
    });
});

