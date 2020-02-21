document.getElementById("home").addEventListener("click", function () {
        location.reload();
    }
);

document.addEventListener("DOMContentLoaded", function() {

    const accomplishment = new Accomplishment();
    let card_id = accomplishment.parseURLforID();
    accomplishment.update(card_id);

    document.getElementById("update").addEventListener("click", function() {
        accomplishment.summary = document.getElementById('summary').value;
        accomplishment.status = document.getElementById('status').value;
        accomplishment.details = document.getElementById('details').value;
        accomplishment.date = card_id;
        accomplishment.save();
    });

});



