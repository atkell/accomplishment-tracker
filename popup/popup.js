document.getElementById("add").addEventListener("click", createNewObject);
document.getElementById("view").addEventListener("click", openInNewTab);
document.getElementById("delete").addEventListener("click", clearAllItems);

chrome.storage.sync.getBytesInUse(null, function (result) {
    let current_storage = result;
    let max_storage = 102400;
    let current_storage_as_percent = Math.round(current_storage / max_storage * 100);

    document.getElementById('progressbar').setAttribute('style', 'width: ' + current_storage_as_percent + "%;");
    document.getElementById('progressbar').setAttribute('aria-valuenow', current_storage_as_percent);
    // document.getElementById('progressbar').innerHTML = current_storage_as_percent;
    document.getElementById('storage-used').innerHTML = "Used ( " + current_storage_as_percent + "% )";
    document.getElementById('storage-free').innerHTML = "Free ( " + (100 - current_storage_as_percent) + "% )";
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
