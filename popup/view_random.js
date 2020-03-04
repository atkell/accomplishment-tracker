document.addEventListener("DOMContentLoaded", function() {
    const quote = new Quote();
    quote.getQuote();

    // We're using null here in order to return ALL items in storage
    chrome.storage.local.get(null, function (result) {
        const accomplishment = new Accomplishment();
        let storageBox = accomplishment.sortByCreatedDate(result);
        let randomIndex = accomplishment.getRandomInt(0, storageBox.length);

        accomplishment.summary = storageBox[randomIndex][0]['summary'];
        accomplishment.details = storageBox[randomIndex][1]['details'];
        accomplishment.date = storageBox[randomIndex][2]['date'];
        accomplishment.status = storageBox[randomIndex][3]['status'];
        accomplishment.favorite = storageBox[randomIndex][4]['favorite'];
        accomplishment.duration = 0;
        accomplishment.calcDuration();
        accomplishment.checkFavorite();
        accomplishment.buildCardColumns();

        document.getElementById('export').setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(accomplishment.exportRandom(storageBox, randomIndex)));
        document.getElementById('export').setAttribute('download', 'random_export.csv');
    });
});

