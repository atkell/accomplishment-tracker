document.getElementById("add").addEventListener("click", createNewObject);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", clearAllItems);

console.log("testing free space method");

chrome.storage.sync.getBytesInUse(null, function (result) {
    console.log('Total bytes in storage is ' + result);
    let current_storage = result;
    let max_storage = 102400;
    let current_storage_as_percent = Math.round(current_storage / max_storage * 100);
    console.log(current_storage_as_percent + "%");

    document.getElementById('progressbar').setAttribute('style', 'width: ' + current_storage_as_percent + "%;");
    document.getElementById('progressbar').setAttribute('aria-valuenow', current_storage_as_percent);
    // document.getElementById('progressbar').innerHTML = current_storage_as_percent;
});

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
