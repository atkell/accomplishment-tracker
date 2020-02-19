document.getElementById("add").addEventListener("click", makeThing);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", clearAllItems);

function makeThing() {

    const newAccomplishment = new Accomplishment(
        document.getElementById('summary').value,
        document.getElementById('status').value,
        document.getElementById('details').value,
        Date.now()
    );
    newAccomplishment.save();
}

function openInNewTab() {
    chrome.tabs.create({url: chrome.extension.getURL('popup/view_all.html#window')});
}


function clearAllItems() {
    chrome.storage.sync.clear();
    console.log('All items removed.');
}
