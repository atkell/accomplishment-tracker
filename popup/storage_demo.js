document.getElementById("add").addEventListener("click", addNewItem);
// document.getElementById("view").addEventListener("click", viewAllItems);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", deleteAllItems);


// Source https://stackoverflow.com/questions/3450593/how-do-i-clear-the-content-of-a-div-using-javascript
// function clearOurList(elementID) {
//     document.getElementById(elementID).innerHTML = "";
// }


// Credit to https://stackoverflow.com/questions/9576615/open-chrome-extension-in-a-new-tab#9578540
function openInNewTab() {
    chrome.tabs.create({url: chrome.extension.getURL('popup/view_storage_cards.html#window')});
}


function deleteAllItems() {
    console.log('All items removed.');
    chrome.storage.sync.clear();

    // viewAllItems();
}


function addNewItem() {
    let summary = document.getElementById('summary').value;
    let details = document.getElementById('details').value;
    let status = document.getElementById('status').value;

    // One way to make our entry unique is by making the date the ID
    // let date = new Date().toISOString();
    // If we use this date format, we can split it at the comma to do fun things...
    // let date = new Date().toLocaleString(); //  12/20/2012, 03:00:00 AM/PM
    let date = Date.now(); //  Milliseconds
    // Another way to make our entries unique is to simply set an ID based on the length
    // of the items in storage + 1
    // chrome.storage.sync.get(null, function(result) {
    //     let obj = Object.keys(result);      // (1) Get the keys
    //     let length = obj.length;            // (2) Count the keys + assign the value
    //     length = length++;
    //     let entryID = "entry-" + length;    // (3) Build the unique ID
    // });
    // length = length + 1;
    // let entryID = "entry-" + length;    // (3) Build the unique ID
    // console.log(entryID, summary, details, date, status);

    let body = [];
    body.push({"summary": summary});
    body.push({"details": details});
    body.push({"date": date});
    body.push({"status": status});
    // var body = JSON.stringify(body);

    // for (let i = 0; i < body.length; i++) {
    //     console.log(body.keys());
    // }
    // // let entryAsJSON = JSON.stringify(entryBody);
    // console.log(entryID, body);

    // Save (set) the value
    chrome.storage.sync.set({[date]: body}, function () {
        console.log('Created new entry!');
    });

    openInNewTab();
}


// function viewAllItems() {
//
//     clearOurList('list-group');
//
//     chrome.storage.sync.get(null, function(result) {
//         // What data type is the result?
//         console.log(result); // An object
//         let obj = Object.keys(result);
//         let arr = Object.values(result); // Can we access just the values?
//         console.log(arr); // What data type is this? An object.
//         console.log(arr.length); // This returns the length of the new array (see below)
//
//         // Get and create our list items; assign to variables
//         // let listGroup = document.getElementById('list-group');
//         // let listGroupItem = document.createElement('li');
//         // // let listGroupValue = document.createTextNode(JSON.stringify(result));
//         // let listGroupValue = document.createTextNode(arr);
//         //
//         // listGroupItem.appendChild(listGroupValue);
//         // listGroupItem.classList.add('list-group-item');
//         // listGroup.appendChild(listGroupItem);
//
//         // Now that we know how to find the length of the array of items, we can loop to add new list items instead of
//         // them all displaying within a single list item
//         // Inspired by https://stackoverflow.com/questions/9329446/for-each-over-an-array-in-javascript#9329496
//         // length = arr.length;
//         for (let i = 0; i < arr.length; i++) {
//             let listGroup = document.getElementById('list-group');
//             let listGroupItem = document.createElement('li');
//             let listGroupIncrementedValue = document.createTextNode(arr[i]);
//             let listGroupIncrementedKey = document.createTextNode(obj[i]);
//             let lineBreak = document.createElement('br');
//
//             listGroupItem.appendChild(listGroupIncrementedKey);
//             listGroupItem.appendChild(lineBreak);
//             listGroupItem.appendChild(listGroupIncrementedValue);
//             listGroupItem.classList.add('list-group-item');
//             listGroup.appendChild(listGroupItem);
//         }
//
//
//
//         // listGroupItem.appendChild(listGroupValue);
//         // listGroupItem.classList.add('list-group-item');
//         // listGroup.appendChild(listGroupItem);
//
//     });
// }


// For testing
function dumpKeysToConsole() {
    chrome.storage.sync.get(null, function(result) {
        let allKeys = Object.keys(result);
        console.log(allKeys);
    });
}

