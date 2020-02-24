// document.getElementById("home").addEventListener("click", function () {
//     location.reload();
//     }
// );

document.addEventListener("DOMContentLoaded", function() {
    const accomplishment = new Accomplishment();

    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {

        let storageBox = accomplishment.sortByCreatedDate(result);

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

