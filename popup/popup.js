document.getElementById("add").addEventListener("click", makeThing);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", clearAllItems);

function makeThing() {
    // const newAccomplishment = new Accomplishment();
    // newAccomplishment.summary = document.getElementById('summary').value;
    // newAccomplishment.status = document.getElementById('status').value;
    // newAccomplishment.details = document.getElementById('details').value;
    // newAccomplishment.date = Date.now();

    // Look how we save time!
    // TODO Move our class to its own file, and make the extension run from a single class
    const newAccomplishment = new Accomplishment(
    document.getElementById('summary').value,
    document.getElementById('status').value,
    document.getElementById('details').value,
    Date.now());

    // console.log("Summary: " + newAccomplishment.summary);
    // console.log("Status: " + newAccomplishment.status);
    // console.log("Details: " + newAccomplishment.details);
    // console.log("Date: " + newAccomplishment.date);

    // Now let's call the save() method within our class
    newAccomplishment.save();
}

function openInNewTab() {
    chrome.tabs.create({url: chrome.extension.getURL('popup/view_all.html#window')});
}


function clearAllItems() {
    chrome.storage.sync.clear();
    console.log('All items removed.');
}
