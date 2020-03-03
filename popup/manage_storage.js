document.addEventListener("DOMContentLoaded", function() {
    const accomplishment = new Accomplishment();
    accomplishment.freeSpace();
    accomplishment.countStoredItems();

    // Remove all
    document.getElementById("delete-all").addEventListener("click", function () {
        chrome.storage.sync.clear();
    });
});
