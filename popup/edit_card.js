// function demo() {
//
//     // We're passing the unique key of our entry as a query string parameter
//     // Remember, our key is a timestamp so this seems sane and safe
//     // We're also only passing a single query string parameter at this point
//     // so it also seems sane to only grab the first value from the URL and ignore others
//     var card_id = document.location.href.split('?')[1].split('=')[1];
//
//     // Now reach out to storage with this key
//     chrome.storage.sync.get([card_id], function (result) {
//
//         const storageBox = Object.values(result);
//         // And set the values associated with this key to the values of the input fields
//         document.getElementById('summary').value = storageBox[0][0]['summary'];
//         document.getElementById('status').value = storageBox[0][3]['status'];
//         document.getElementById('details').value = storageBox[0][1]['details'];
//
//         document.getElementById("update").addEventListener("click", function() {
//             const updatedAccomplishment = new Accomplishment(
//                 document.getElementById('summary').value,
//                 document.getElementById('status').value,
//                 document.getElementById('details').value,
//                 card_id
//             );
//             updatedAccomplishment.save();
//         });
//
//     });
// }


document.addEventListener("DOMContentLoaded", function() {
    // Create a new object with undefined properties
    // Call out to storage to get the values
    // Set the values of our input fields to the values from storage
    // Update the object once the button is clicked (we assume the user has changed the values of some fields)
    // Overwrite the existing item in storage by passing along the original date when we call storage SET

    const updatedAccomplishment = new Accomplishment();
    var card_id = updatedAccomplishment.parseURLforID();
    updatedAccomplishment.update(card_id);
    document.getElementById("update").addEventListener("click", function() {
        updatedAccomplishment.summary = document.getElementById('summary').value;
        updatedAccomplishment.status = document.getElementById('status').value;
        updatedAccomplishment.details = document.getElementById('details').value;
        updatedAccomplishment.date = card_id;
        updatedAccomplishment.save()
    });
    // updatedAccomplishment.save();

});

// demo();

