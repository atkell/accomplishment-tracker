class Accomplishment {

    constructor(summary, status, details, date) {
        this._summary = summary;
        this._status = status;
        this._details = details;
        this._date = date;
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

    sortByCreatedDate(value) {
        let unsortedValues = Object.values(value);
        let storageBox = unsortedValues.sort(function (a, b) {
            return b[2]['date'] - a[2]['date'];
        });
        return storageBox;
    }

    save() {
        console.log("Hooray! We just called our save method inside the Accomplishment class");

        // Assemble the body of the accomplishment entry
        // TODO See if this should be its own method or not
        let body = [];
        body.push({"summary": this._summary});
        body.push({"details": this._details});
        body.push({"date": this._date});
        body.push({"status": this._status});
        console.log(body);

        // Save (set) the value
        chrome.storage.sync.set({[this._date]: body}, function () {
            console.log('Created new entry!');
        });

        // Go ahead and close the popup and open a new tab to show the user the item
        openInNewTab();
    }

    parseURLforID() {
        return document.location.href.split('?')[1].split('=')[1];
    }

    update(value) {
        console.log('the update method has been called!');
        // const card_id = document.location.href.split('?')[1].split('=')[1];

        // Now reach out to storage with this key
        chrome.storage.sync.get([value], function (result) {

            const storageBox = Object.values(result);
            // And set the values associated with this key to the values of the input fields
            document.getElementById('summary').value = storageBox[0][0]['summary'];
            document.getElementById('status').value = storageBox[0][3]['status'];
            document.getElementById('details').value = storageBox[0][1]['details'];

            // this._summary = document.getElementById('summary').value;
            // this._status = document.getElementById('status').value;
            // this._details = document.getElementById('details').value;
            // this._date = card_id;

            // document.getElementById("update").addEventListener("click", function() {
            //
            //     this._summary = document.getElementById('summary').value;
            //     this._status = document.getElementById('status').value;
            //     this._details = document.getElementById('details').value;
            //     this._date = card_id;
            //
            //     // const updatedAccomplishment = new Accomplishment(
            //     //     document.getElementById('summary').value,
            //     //     document.getElementById('status').value,
            //     //     document.getElementById('details').value,
            //     //     card_id
            //     // );
            //     // updatedAccomplishment.save();
            // });

        });
    }

    calcDuration() {

        var durationInMinutes = Math.round(((Date.now() - this._date) / 60000));
        // console.log(durationInMinutes);

        if (durationInMinutes > 60) {
            var durationInMinutes = Math.round(durationInMinutes / 60);
            var unitOfTime = 'hours ago';
        } else if (durationInMinutes < 60 && durationInMinutes > 1) {
            var unitOfTime = 'minutes ago';
        } else {
            var durationInMinutes = '';
            var unitOfTime = 'Just now';
        }

        var durationText = durationInMinutes + ' ' + unitOfTime;
        // console.log(this._duration(durationText));
        // console.log(durationText);
        this._duration = durationText;
        // console.log(this._duration);

    }

    buildCard() {
        // TODO Check out card columns as an alternate layout at https://getbootstrap.com/docs/4.0/components/card/#card-columns,
        // https://masonry.desandro.com/ or the card deck layout: https://getbootstrap.com/docs/4.0/components/card/#card-columns
        let card_key = this._date;
        let card_summary = document.createTextNode(this._summary);
        let card_details = document.createTextNode(this._details);
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

        // TODO This is causing an error: TypeError: Cannot read property 'includes' of undefined
        //     at Accomplishment.buildCard...yet it still works?
        if (this._status.includes('Cheerful')) {
            gridRowCardBadge.classList.add('badge-primary');
        } else if (this._status.includes('Reflective')) {
            gridRowCardBadge.classList.add('badge-secondary');
        } else if (this._status.includes('Gloomy')) {
            gridRowCardBadge.classList.add('badge-danger');
        } else {
            gridRowCardBadge.classList.add('badge-warning');
        }

        // Duration
        let gridRowCardDateText = document.createElement('p');
        gridRowCardDateText.classList.add('card-text');
        gridRowCardDateText.classList.add('mt-3');
        // Create the duration: <small class="text-muted">
        let gridRowCardDate = document.createElement('small');
        gridRowCardDate.classList.add('text-muted');
        gridRowCardDate.appendChild(card_duration);
        gridRowCardDateText.appendChild(gridRowCardDate);


        // // TODO Make this better --- demo to FAVORITE a card
        // let card_favorite = document.createTextNode('Favorite card');
        // let gridRowCardFavorite = document.createElement('a');
        // gridRowCardFavorite.setAttribute('href', '#');
        // gridRowCardFavorite.setAttribute('title', 'Favorite card');
        // gridRowCardFavorite.classList.add('favorite-card');
        //
        // // Getting this working was tricky as hell. Finally found inspiration for the solution in the getting started
        // // guide of all places: https://developer.chrome.com/extensions/getstarted#logic
        // gridRowCardFavorite.onclick = function() {
        //     // For testing
        //     console.log('This card has a card_key of ' + card_key + ' which is of type ' + typeof card_key);
        //     chrome.storage.sync.get(card_key, function (result) {
        //         // console.log(result);
        //         console.log(Object.keys(result));
        //     });
        //     location.reload(); // This will be helpful for our users
        // };


        // TODO Make this better --- demo to EDIT a card
        let card_edit = document.createTextNode('Edit card');
        let gridRowCardEdit = document.createElement('a');
        gridRowCardEdit.setAttribute('href', '#');
        gridRowCardEdit.setAttribute('title', 'Edit card');
        gridRowCardEdit.classList.add('edit-card');

        // Getting this working was tricky as hell. Finally found inspiration for the solution in the getting started
        // guide of all places: https://developer.chrome.com/extensions/getstarted#logic
        gridRowCardEdit.onclick = function() {
            // One way to get the ID of the card into the edit_card html is to send it as a
            // query string parameter...
            let url = 'edit_card.html?id=' + encodeURIComponent(card_key);
            window.open(url);
        };

        // TODO Make this better --- demo to DELETE a card
        let card_delete = document.createTextNode('Delete forever');
        let gridRowCardDelete = document.createElement('a');
        gridRowCardDelete.setAttribute('href', '#');
        gridRowCardDelete.setAttribute('title', 'Delete forever');
        gridRowCardDelete.classList.add('delete-card');

        // Getting this working was tricky as hell. Finally found inspiration for the solution in the getting started
        // guide of all places: https://developer.chrome.com/extensions/getstarted#logic
        gridRowCardDelete.onclick = function() {
            // For testing
            // console.log('This card has a card_key of ' + card_key + ' which is of type ' + typeof card_key);
            // chrome.storage.sync.get(card_key, function (result) {
            //     // console.log(result);
            //     console.log(Object.keys(result));
            // });
            chrome.storage.sync.remove([card_key.toString()], function (result) {
                console.log(result);
                console.log('Card with key of ' + card_key + ' has been removed?')
            });
            location.reload(); // This will be helpful for our users
        };


        // Add a title
        // gridRowCardDelete.title('Delete this thing, yo!');

        // Add a href
        // gridRowCardDelete.href('#');

        // Give it some class
        // gridRowCardDelete.classList.add('text-muted');

        // Add the content to it
        // gridRowCardFavorite.appendChild(card_favorite);
        gridRowCardEdit.appendChild(card_edit);
        gridRowCardDelete.appendChild(card_delete);




        // Add the summary as title
        gridRowCardTitle.appendChild(card_summary);

        // Add our details as paragraph text
        gridRowCardText.appendChild(card_details);

        // Add our status as badge, time as time
        gridRowCardBadge.appendChild(card_status);
        // gridRowCardDate.appendChild(card_duration);

        // Add our status and time to the flex box
        gridRowCardFlexBox.appendChild(gridRowCardBadge);
        // gridRowCardFlexBox.appendChild(gridRowCardDate);
        // gridRowCardFlexBox.appendChild(gridRowCardFavorite);
        gridRowCardFlexBox.appendChild(gridRowCardEdit);
        gridRowCardFlexBox.appendChild(gridRowCardDelete);

        // Build the card itself from its components
        gridRowCardBody.appendChild(gridRowCardTitle);
        gridRowCardBody.appendChild(gridRowCardText);
        gridRowCardBody.appendChild(gridRowCardFlexBox);
        gridRowCardBody.appendChild(gridRowCardDateText);
        // console.log(gridRowCardBody);

        // Add the card body to the container
        gridRowCardContainer.appendChild(gridRowCardBody);
        // console.log(gridRowCardContainer);

        // Add the container to the column
        gridRowColumn.appendChild(gridRowCardContainer);
        // console.log(gridRowColumn);

        // And finally, add the column to the row
        gridRow.appendChild(gridRowColumn);
        // console.log(gridRow);
    }
}
