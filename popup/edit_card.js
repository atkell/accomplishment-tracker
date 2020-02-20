document.addEventListener("DOMContentLoaded", function() {
    // Create a new object with undefined properties
    // Call out to storage to get the values
    // Set the values of our input fields to the values from storage
    // Update the object once the button is clicked (we assume the user has changed the values of some fields)
    // Overwrite the existing item in storage by passing along the original date when we call storage SET

    const updatedAccomplishment = new Accomplishment();
    var card_id = updatedAccomplishment.parseURLforID();
    updatedAccomplishment.update(card_id);
    document.getElementById("update").addEventListener("click", function() {
        updatedAccomplishment.summary = document.getElementById('summary').value;
        updatedAccomplishment.status = document.getElementById('status').value;
        updatedAccomplishment.details = document.getElementById('details').value;
        updatedAccomplishment.date = card_id;
        updatedAccomplishment.save();
    });
});



