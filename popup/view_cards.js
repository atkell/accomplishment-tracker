document.addEventListener("DOMContentLoaded", function() {
    const quote = new Quote();
    quote.getQuote();

    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {
        const accomplishment = new Accomplishment();
        let storageBox = accomplishment.sortByCreatedDate(result);

        document.getElementById('export').setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(accomplishment.export(storageBox, 'all')));
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
        }

    });

});

