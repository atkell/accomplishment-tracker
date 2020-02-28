// document.getElementById("home").addEventListener("click", function () {
//     location.reload();
//     }
// );

// Example from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    // return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

document.addEventListener("DOMContentLoaded", function() {
    const accomplishment = new Accomplishment();

    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {

        let storageBox = accomplishment.sortByCreatedDate(result);
        let randomIndex = getRandomInt(0, storageBox.length);
        console.log(randomIndex);
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

        console.log(accomplishment);

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

