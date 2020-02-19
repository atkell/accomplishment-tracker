// Overall workflow for this script
// 1. Get an accomplishment from sync storage (this returns an object / array)
// 2. Loop through the array in order to retrieve key values: summary, details, date, status
// 3. Assign these key values to variables
// 4. For the date value, use an if-else statement in order to set the appropriate "unit of time"
// 5. For the status value, use an if-else statement in order to set the appropriate "badge"
// 6. Build the HTML blocks necessary to construct a card
// 7. Place our key values into the appropriate HTML blocks of our card
// 8. "Stack" our blocks into the shape of a card and then place it all into the HTML file

document.getElementById("home").addEventListener("click", function () {
    location.reload();
    }
);


function getItems() {
    var accomplishment = new Accomplishment();


    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {


        // let keysInStorage = Object.keys(result);
        let storageBox = Object.values(result);


        for (let i = 0; i < storageBox.length; i++) {
            accomplishment.summary = storageBox[i][0]['summary'];
            accomplishment.details = storageBox[i][1]['details'];
            accomplishment.date = storageBox[i][2]['date'];
            accomplishment.status = storageBox[i][3]['status'];
            accomplishment.duration = 0;

            // console.log(accomplishment);
            // console.log(Object.keys(accomplishment));
            // console.log(Object.values(accomplishment));

            // accomplishment.findUnitOfTime();
            // console.log(accomplishment.timePassedTexttimePassedText)
            // console.log(accomplishment);
            accomplishment.calcDuration();
            // console.log(accomplishment);
            accomplishment.buildCard();
            // accomplishment.setBadgeClass();
            // console.log(accomplishment.duration)
        }

    });
}

getItems();

