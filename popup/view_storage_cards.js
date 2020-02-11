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
        let obj = Object.keys(result);
        let arr = Object.values(result); // Can we access just the values?
        console.log(obj); // What data type is this? An object.
        console.log(arr); // What data type is this? An object.
        // console.log(arr.length); // This returns the length of the new array (see below)

        // Now that we know how to find the length of the array of items, we can loop to add new list items instead of
        // them all displaying within a single list item
        // Inspired by https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript#9329496
        for (let i = 0; i < arr.length; i++) {
            // Use our incrementer to find the correct values for...
            let entryID = document.createTextNode(obj[i]); // Right now, ~date~ entry ID is our key
            let summary = document.createTextNode(arr[i]); // Right now, summary is our value
            let details = document.createTextNode(arr[i]); // Right now, summary is our value
            let date = document.createTextNode(arr[i]); // Right now, summary is our value
            // let details = document.createTextNode("This string of wonderful words."); // Place holder
            console.log(summary);
            console.log(entryID);

            // Find the correct HTML element
            let gridRow = document.getElementById('grid-row');

            // Create the column element & add add the right class
            let gridRowColumn = document.createElement('div');
            gridRowColumn.classList.add('col-md-4');


            // Create the card container element & and add the right class
            let gridRowCardContainer = document.createElement('div');
            gridRowCardContainer.classList.add('card');

            // Create the card body element & add the right class
            let gridRowCardBody = document.createElement('div');
            gridRowCardBody.classList.add('card-body');

            // Create the h5 element for a card title & and add the right class
            // This will be our "summary"
            let gridRowCardTitle = document.createElement('h5');
            gridRowCardTitle.classList.add('card-title');

            // Create the h6 element for a card subtitle & and add the right class
            // This will be our "date" ... for now
            let gridRowCardSubTitle = document.createElement('h6');
            gridRowCardSubTitle.classList.add('card-subtitle');
            gridRowCardSubTitle.classList.add('mb2');
            gridRowCardSubTitle.classList.add('text-muted');

            // Create the paragraph text element for a card & and add the right class
            // This will be our "details"
            let gridRowCardText = document.createElement('p');
            gridRowCardText.classList.add('card-text');

            // Why not...
            // let lineBreak = document.createElement('br');
            // Use this like
            // gridRowItem.appendChild(lineBreak);

            // Add the summary as the title
            gridRowCardTitle.appendChild(summary);

            // Add the ~date~ entry ID as the subtitle
            gridRowCardSubTitle.appendChild(entryID);

            // Do nothing with the text...
            gridRowCardText.appendChild(details);

            // Build the card itself from its components
            gridRowCardBody.appendChild(gridRowCardTitle);
            gridRowCardBody.appendChild(gridRowCardSubTitle);
            gridRowCardBody.appendChild(gridRowCardText);
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
