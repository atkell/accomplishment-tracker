document.addEventListener("DOMContentLoaded", function() {
    const nav = new Navbar();
    nav.build();

    const footer = new Footer();
    footer.build();

    const storage = new Storage();
    storage.freeSpace();
    storage.countStoredItems();

    // Remove all
    document.getElementById("delete-all").addEventListener("click", function () {
        storage.deleteAllItems();
    });

    if (document.getElementById("storage-learn-more")) {
        document.getElementById("storage-learn-more").addEventListener("click", function() {
            storage.openNewTab('popup/manage_storage.html#window');
        });
    }
});
