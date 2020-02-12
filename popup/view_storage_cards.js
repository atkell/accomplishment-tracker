// Load our list with any items already stored
viewAllItems();

// Things can get out of control if we don't clear before we load
// Source https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
function clearOurList(elementID) {
    document.getElementById(elementID).innerHTML = "";
}


function viewAllItems() {

    // clearOurList('list-group');

    chrome.storage.sync.get(null, function(result) {

        // Let's do some research: What data type is returned to us?
        // console.log(result); // Answer: an object
        // var result = JSON.stringify(result);
        let obj = Object.keys(result);
        let arr = Object.values(result); // Can we access just the values?
        console.log(result); // What data type is this? An object.
        console.log(obj[0]); // What data type is this? An object.
        console.log(arr[0][0]['summary']); // What data type is this? An object.
        console.log(arr[0][1]['details']); // What data type is this? An object.
        console.log(arr[0][2]['date']); // What data type is this? An object.
        console.log(arr[0][3]['status']); // What data type is this? An object.
        // console.log(arr); // What data type is this? An object.
        // console.log(arr.length); // This returns the length of the new array (see below)

        // Now that we know how to find the length of the array of items, we can loop to add new list items instead of
        // them all displaying within a single list item
        // Inspired by https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript#9329496
        for (let i = 0; i < arr.length; i++) {
            // Use our incrementer to find the correct values for...
            let entryID = document.createTextNode(obj[i]); // Right now, ~date~ entry ID is our key
            let summary = document.createTextNode(arr[i][0]['summary']); // Right now, summary is our value
            let details = document.createTextNode(arr[i][1]['details']);
            let date = document.createTextNode(arr[i][2]['date']);
            let status = arr[i][3]['status'];
            let statusTextNode = document.createTextNode(status);
            // let details = document.createTextNode("This string of wonderful words."); // Place holder
            // console.log(summary);
            // console.log(entryID);

            // Find the correct HTML element: <div class="row" id="grid-row">
            let gridRow = document.getElementById('grid-row');

            // Create the column: <div class="col-md-4">
            let gridRowColumn = document.createElement('div');
            gridRowColumn.classList.add('col-md-4');

            // Create the card container: <div class="card mt-4">
            let gridRowCardContainer = document.createElement('div');
            gridRowCardContainer.classList.add('card');
            gridRowCardContainer.classList.add('mt-4'); // Cleaner to have this, I think...

            // Create the card body: <div class="card-body">
            let gridRowCardBody = document.createElement('div');
            gridRowCardBody.classList.add('card-body');

            // Create the card title (summary): <h5 class="card-title">
            let gridRowCardTitle = document.createElement('h5');
            gridRowCardTitle.classList.add('card-title');

            // Create the details paragraph: <p class="card-text">
            let gridRowCardText = document.createElement('p');
            gridRowCardText.classList.add('card-text');

            // Create the flex box for status and time: <div class="d-flex justify-content-between align-items-center">
            let gridRowCardFlexBox = document.createElement('div');
            gridRowCardFlexBox.classList.add('d-flex');
            gridRowCardFlexBox.classList.add('justify-content-between');
            gridRowCardFlexBox.classList.add('align-items-center');

            // Create the status badge: <span class="badge badge-primary">
            // TODO: We'll have to add a condition to update the badge color based on status
            let gridRowCardBadge = document.createElement('span');
            gridRowCardBadge.classList.add('badge');
            if (status.includes('In Progress')) {
                gridRowCardBadge.classList.add('badge-primary');
            } else if (status.includes('On Hold')) {
                gridRowCardBadge.classList.add('badge-warning');
            } else if (status.includes('Won\'t Do')) {
                gridRowCardBadge.classList.add('badge-danger');
            } else {
                gridRowCardBadge.classList.add('badge-success');
            }


            // Create the status badge: <small class="text-muted">
            // TODO: We'll need to build a new function to calculate the difference between NOW and date
            let gridRowCardDate = document.createElement('small');
            gridRowCardDate.classList.add('text-muted');

            // Add the summary as title
            gridRowCardTitle.appendChild(summary);

            // Add our details as paragraph text
            gridRowCardText.appendChild(details);

            // Add our status as badge, time as time
            gridRowCardBadge.appendChild(statusTextNode);
            gridRowCardDate.appendChild(date);

            // Add our status and time to the flex box
            gridRowCardFlexBox.appendChild(gridRowCardBadge);
            gridRowCardFlexBox.appendChild(gridRowCardDate);

            // Build the card itself from its components
            gridRowCardBody.appendChild(gridRowCardTitle);
            gridRowCardBody.appendChild(gridRowCardText);
            gridRowCardBody.appendChild(gridRowCardFlexBox);
            console.log(gridRowCardBody);

            // Add the card body to the container
            gridRowCardContainer.appendChild(gridRowCardBody);
            console.log(gridRowCardContainer);

            // Add the container to the column
            gridRowColumn.appendChild(gridRowCardContainer);
            console.log(gridRowColumn);

            // And finally, add the column to the row
            gridRow.appendChild(gridRowColumn);
            console.log(gridRow);
        }



        // gridRowItem.appendChild(gridRowValue);
        // gridRowItem.classList.add('list-group-item');
        // gridRow.appendChild(gridRowItem);

    });
}
