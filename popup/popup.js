document.getElementById("add").addEventListener("click", createNewObject);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", clearAllItems);

function createNewObject() {

    const accomplishment = new Accomplishment(
        document.getElementById('summary').value,
        document.getElementById('status').value,
        document.getElementById('details').value,
        Date.now(),
        false
    );
    accomplishment.save();
}

function openInNewTab() {
    chrome.tabs.create({url: chrome.extension.getURL('popup/view_all.html#window')});
}


function clearAllItems() {
    chrome.storage.sync.clear();
    console.log('All items removed.');
}
