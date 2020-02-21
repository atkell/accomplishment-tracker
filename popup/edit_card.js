document.getElementById("home").addEventListener("click", function () {
        location.reload();
    }
);

document.addEventListener("DOMContentLoaded", function() {

    const updatedAccomplishment = new Accomplishment();
    let card_id = updatedAccomplishment.parseURLforID();
    updatedAccomplishment.update(card_id);

    document.getElementById("update").addEventListener("click", function() {
        updatedAccomplishment.summary = document.getElementById('summary').value;
        updatedAccomplishment.status = document.getElementById('status').value;
        updatedAccomplishment.details = document.getElementById('details').value;
        updatedAccomplishment.date = card_id;
        updatedAccomplishment.save();
    });

});



