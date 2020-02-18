// Overall workflow for this script
// 1. Get an accomplishment from sync storage (this returns an object / array)
// 2. Loop through the array in order to retrieve key values: summary, details, date, status
// 3. Assign these key values to variables
// 4. For the date value, use an if-else statement in order to set the appropriate "unit of time"
// 5. For the status value, use an if-else statement in order to set the appropriate "badge"
// 6. Build the HTML blocks necessary to construct a card
// 7. Place our key values into the appropriate HTML blocks of our card
// 8. "Stack" our blocks into the shape of a card and then place it all into the HTML file


class Accomplishment {

    constructor(summary, status, details, date, duration) {
        this._summary = summary;
        this._status = status;
        this._details = details;
        this._date = date;
        this._duration = duration;
    }

    get summary() {
        return this._summary;
    }

    set summary(value) {
        this._summary = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get details() {
        return this._details;
    }

    set details(value) {
        this._details = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        this._duration = value;
    }

    calcDuration() {

        var durationInMinutes = Math.round(((Date.now() - this._date) / 60000));
        console.log(durationInMinutes);

        var suffix = '';

        if (durationInMinutes > 60) {
            var durationInMinutes = Math.round(durationInMinutes / 60);
            var unitOfTime = 'hour';
        } else if (durationInMinutes < 60 && durationInMinutes > 1) {
            var unitOfTime = 'minute';
            var suffix = 's'
        } else {
            var durationInMinutes = 1;
            var unitOfTime = 'minute';
        }

        var durationText = 'Posted ' + durationInMinutes + ' ' + unitOfTime + suffix + ' ago';
        // console.log(this._duration(durationText));
        // console.log(durationText);
        this._duration = durationText;
        // console.log(this._duration);

    }

    buildCard() {

        let card_summary = document.createTextNode(this._summary);
        let card_details = document.createTextNode(this._details);
        let card_date = document.createTextNode(this._date);
        let card_status = document.createTextNode(this._status);
        let card_duration = document.createTextNode(this._duration);

        // Find the correct HTML element: <div class="row" id="grid-row">
        let gridRow = document.getElementById('grid-row');

        // Create the column: <div class="col-md-4">
        let gridRowColumn = document.createElement('div');
        gridRowColumn.classList.add('col-md-4');

        // Create the card container: <div class="card mt-4">
        let gridRowCardContainer = document.createElement('div');
        gridRowCardContainer.classList.add('card');
        gridRowCardContainer.classList.add('mt-4'); // Cleaner to have this, I think...

        // Create the card body: <div class="card-body">
        let gridRowCardBody = document.createElement('div');
        gridRowCardBody.classList.add('card-body');

        // Create the card title (summary): <h5 class="card-title">
        let gridRowCardTitle = document.createElement('h5');
        gridRowCardTitle.classList.add('card-title');

        // Create the details paragraph: <p class="card-text">
        let gridRowCardText = document.createElement('p');
        gridRowCardText.classList.add('card-text');

        // Create the flex box for status and time: <div class="d-flex justify-content-between align-items-center">
        let gridRowCardFlexBox = document.createElement('div');
        gridRowCardFlexBox.classList.add('d-flex');
        gridRowCardFlexBox.classList.add('justify-content-between');
        gridRowCardFlexBox.classList.add('align-items-center');

        // Create the status badge: <span class="badge badge-primary">
        let gridRowCardBadge = document.createElement('span');
        gridRowCardBadge.classList.add('badge');
        if (this._status.includes('In Progress')) {
            gridRowCardBadge.classList.add('badge-primary');
        } else if (this._status.includes('On Hold')) {
            gridRowCardBadge.classList.add('badge-warning');
        } else if (this._status.includes('Won\'t Do')) {
            gridRowCardBadge.classList.add('badge-danger');
        } else {
            gridRowCardBadge.classList.add('badge-success');
        }

        // Create the duration: <small class="text-muted">
        let gridRowCardDate = document.createElement('small');
        gridRowCardDate.classList.add('text-muted');

        // Add the summary as title
        gridRowCardTitle.appendChild(card_summary);

        // Add our details as paragraph text
        gridRowCardText.appendChild(card_details);

        // Add our status as badge, time as time
        gridRowCardBadge.appendChild(card_status);
        gridRowCardDate.appendChild(card_duration);

        // Add our status and time to the flex box
        gridRowCardFlexBox.appendChild(gridRowCardBadge);
        gridRowCardFlexBox.appendChild(gridRowCardDate);

        // Build the card itself from its components
        gridRowCardBody.appendChild(gridRowCardTitle);
        gridRowCardBody.appendChild(gridRowCardText);
        gridRowCardBody.appendChild(gridRowCardFlexBox);
        console.log(gridRowCardBody);

        // Add the card body to the container
        gridRowCardContainer.appendChild(gridRowCardBody);
        console.log(gridRowCardContainer);

        // Add the container to the column
        gridRowColumn.appendChild(gridRowCardContainer);
        console.log(gridRowColumn);

        // And finally, add the column to the row
        gridRow.appendChild(gridRowColumn);
        console.log(gridRow);

    }


}



function getItems() {

    var accomplishment = new Accomplishment();


    // We're using null here in order to return ALL items in storage
    chrome.storage.sync.get(null, function (result) {

        // We're not doing anything with this yet...but maybe we will want to down the road when we add filtering
        // or search.

        // let keysInStorage = Object.keys(result);
        let storageBox = Object.values(result);


        for (let i = 0; i < storageBox.length; i++) {
            accomplishment.summary = storageBox[i][0]['summary'];
            accomplishment.details = storageBox[i][1]['details'];
            accomplishment.date = storageBox[i][2]['date'];
            accomplishment.status = storageBox[i][3]['status'];
            accomplishment.duration = 0;

            // console.log(accomplishment);
            // console.log(Object.keys(accomplishment));
            // console.log(Object.values(accomplishment));

            // accomplishment.findUnitOfTime();
            // console.log(accomplishment.timePassedTexttimePassedText)
            // console.log(accomplishment);
            accomplishment.calcDuration();
            console.log(accomplishment);
            accomplishment.buildCard();
            // accomplishment.setBadgeClass();
            // console.log(accomplishment.duration)
        }

    });
}

getItems();
