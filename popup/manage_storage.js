document.addEventListener("DOMContentLoaded", function() {
    const accomplishment = new Accomplishment();
    accomplishment.freeSpace();
    accomplishment.countStoredItems();

    // // Create new
    // document.getElementById("add").addEventListener("click", function () {
    //     accomplishment.summary = document.getElementById('summary').value;
    //     accomplishment.status = document.getElementById('status').value;
    //     accomplishment.details = document.getElementById('details').value;
    //     accomplishment.date = Date.now();
    //     accomplishment.favorite = false;
    //     accomplishment.save();
    // });

    // // See all
    // document.getElementById("view").addEventListener("click", accomplishment.openNewTab);
    //
    // // Remove all
    // document.getElementById("delete").addEventListener("click", function () {
    //     chrome.storage.sync.clear();
    // });
});
