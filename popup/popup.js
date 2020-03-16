document.addEventListener("DOMContentLoaded", function() {

    if (document.location.href.includes('add_new')) {
        const nav = new Navbar();
        nav.build();

        const footer = new Footer();
        footer.build();
    } else {
        const storage = new Storage();
        storage.freeSpace();
    }



    // Create new
    const accomplishment = new Accomplishment();
    document.getElementById("add").addEventListener("click", function () {
        accomplishment.summary = document.getElementById('summary').value;
        accomplishment.status = document.getElementById('status').value;
        accomplishment.details = document.getElementById('details').value;
        accomplishment.date = Date.now();
        accomplishment.favorite = false;
        accomplishment.validate();
    });

    // See all
    if (document.getElementById("view")) {
        document.getElementById("view").addEventListener("click", function() {
            accomplishment.openNewTab('popup/view_all.html#window');
        });
    }

    if (document.getElementById("storage-learn-more")) {
        document.getElementById("storage-learn-more").addEventListener("click", function() {
            storage.openNewTab('popup/manage_storage.html#window');
        });
    }
});
