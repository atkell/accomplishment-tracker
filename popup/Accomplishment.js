class Accomplishment {

    constructor(summary, status, details, date, favorite) {
        this._summary = summary;
        this._status = status;
        this._details = details;
        this._date = date;
        this._favorite = favorite;
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

    get favorite() {
        return this._favorite;
    }

    set favorite(value) {
        this._favorite = value;
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

        let body = [];
        body.push({"summary": this._summary});
        body.push({"details": this._details});
        body.push({"date": this._date});
        body.push({"status": this._status});
        body.push({'favorite': this._favorite});
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

    findMood() {
        if (this._status.includes('Cheerful')) {
            return 'badge-primary';
        } else if (this._status.includes('Reflective')) {
            return 'badge-secondary';
        } else if (this._status.includes('Gloomy')) {
            return 'badge-danger';
        } else {
            return 'badge-warning';
        }
    }

    edit(element, value) {
        element.onclick = function() {
            let url = 'edit_card.html?id=' + encodeURIComponent(value);
            window.open(url);
        };
    }

    delete(element, value) {
        element.onclick = function() {
            chrome.storage.sync.remove([value.toString()], function (result) {});
        location.reload();
        };

    }

    checkFavorite() {
        // console.log('called the favorite method');
        // console.log(this._favorite);

        if (this._favorite === true) {
            return 'favorite';
            // console.log('yep, thats a favorite alright.');
        } else {
            return 'favorite_border';
            // console.log('not a favoite.');
        }

        // element.onclick = function () {
        //     console.log('You clicked the heart for card ID ' + value);
        //     chrome.storage.sync.get([value.toString()], function (result) {
        //         const storageBox = Object.values(result);
        //         const is_favorite = storageBox[0][4]['favorite'];
        //         console.log(is_favorite);
        //         // return !!is_favorite; // simplified conditional syntax
        //         element.innerHTML = 'favorite';
        //
        //         if (is_favorite === true) {
        //             return 'favorite';
        //         } else {
        //             return 'favorite_border';
        //         }
        //     });
        //
        // };
    }

    heart_old(element, value) {
        element.onclick = function () {
            console.log('You clicked the heart for card ID ' + value);
            this._favorite = true;

            chrome.storage.sync.get([value.toString()], function (result) {
                const storageBox = Object.values(result);
                let body = [];
                body.push({"summary": storageBox[0][0]['summary']});
                body.push({"details": storageBox[0][1]['details']});
                body.push({"date": storageBox[0][2]['date']});
                body.push({"status": storageBox[0][3]['status']});
                body.push({'favorite': true});
                chrome.storage.sync.set({[value.toString()]: body});
            });

            chrome.storage.sync.get([value.toString()], function (result) {
                const storageBox = Object.values(result);
                console.log(storageBox);
            });

            return true;
        };
    }

    // Has been replaced by buildCardColumns, remove?
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
        let card_favorite = document.createTextNode('Favorite card');
        let gridRowCardFavorite = document.createElement('a');
        gridRowCardFavorite.setAttribute('href', '#');
        gridRowCardFavorite.setAttribute('title', 'Favorite card');
        gridRowCardFavorite.classList.add('favorite-card');
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

    buildCardDeck() {}

    buildCardColumns() {
        let card_key = this._date;
        let card_summary = document.createTextNode(this._summary);
        let card_details = document.createTextNode(this._details);
        let card_status = document.createTextNode(this._status);
        let card_duration = document.createTextNode(this._duration);

        // <div class="card-columns">
        let divCardColumns = document.getElementById('card-columns');

        // <div class="card mt-4">
        let divCardContainer = document.createElement('div');
        divCardContainer.classList.add('card');

        // <div class="card-body">
        let divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');

        // <h5 class="card-title">
        let h5CardTitle = document.createElement('h5');
        h5CardTitle.classList.add('card-title');
        h5CardTitle.classList.add('serif');
        h5CardTitle.classList.add('mb-1');
        h5CardTitle.appendChild(card_summary);

        // <p class="card-text">
        let pCardDetailsText = document.createElement('p');
        pCardDetailsText.classList.add('card-text');
        pCardDetailsText.classList.add('serif');
        pCardDetailsText.appendChild(card_details);

        // 2 column row beneath title
        let divRow = document.createElement('div');
        divRow.classList.add('row');
        divRow.classList.add('mb-3');
        let divColSm1 = document.createElement('div'); // Duration
        divColSm1.classList.add('col-sm');
        let divColSm2 = document.createElement('div'); // Favorite
        divColSm2.classList.add('col-sm');
        divColSm2.classList.add('text-right');

        // 2 column row beneath card detail text
        let divRow2 = document.createElement('div');
        divRow2.classList.add('row');
        divRow2.classList.add('mb-0');
        let divColSm3 = document.createElement('div'); // Mood
        divColSm3.classList.add('col-sm');
        let divColSm4 = document.createElement('div'); // More Actions
        divColSm4.classList.add('col-sm');
        divColSm4.classList.add('text-right');

        // <p class="card-text">
        let pCardDurationText = document.createElement('p');
        pCardDurationText.classList.add('card-text');

        // Duration between Date.now() and then <small class="text-muted">
        let smallCardDurationText = document.createElement('small');
        smallCardDurationText.classList.add('text-muted');
        smallCardDurationText.classList.add('sans-serif');
        smallCardDurationText.appendChild(card_duration);
        divColSm1.appendChild(smallCardDurationText);

        // Favorite a card
        let cardFavorite = document.createElement('a');
        cardFavorite.setAttribute('href', '#');
        // this.setFavorite(cardMoreActionsEdit, card_key);
        cardFavorite.classList.add('material-icons');
        cardFavorite.classList.add('md-18');
        cardFavorite.classList.add('md-dark');
        cardFavorite.classList.add('favorite');
        cardFavorite.innerHTML = this.checkFavorite();

        // Check if favorite is equal to true
        // this.isFavorite(cardFavorite, card_key);


        // If it is not equal to true, make it possible to set it

        // let hearted = this.heart(cardFavorite, card_key);
        // // Check what the property of the object is
        // if (hearted === true) {
        //     cardFavorite.innerHTML = 'favorite';
        // } else {
        //     cardFavorite.innerHTML = 'favorite_border';
        // }

        // cardFavorite.innerHTML = 'favorite_border';
        // cardFavorite.setAttribute('id', 'favorite');
        // cardFavorite.innerHTML = hearted;

        // let love = this.heart(cardFavorite, card_key);
        divColSm2.appendChild(cardFavorite);

        // Mood
        let cardMoodBadge = document.createElement('span');
        cardMoodBadge.classList.add('badge');
        let mood = this.findMood();
        cardMoodBadge.classList.add(mood);
        cardMoodBadge.appendChild(card_status);
        divColSm3.appendChild(cardMoodBadge);

        // More actions drop-down menu
        let cardMoreActionsButtonDiv = document.createElement('div');
        cardMoreActionsButtonDiv.classList.add('dropdown');

        let cardMoreActionsButton = document.createElement('button');
        cardMoreActionsButton.classList.add('btn');
        cardMoreActionsButton.classList.add('btn-light');
        cardMoreActionsButton.classList.add('btn-sm');
        cardMoreActionsButton.classList.add('dropdown-toggle');
        cardMoreActionsButton.setAttribute('type', 'button');
        cardMoreActionsButton.setAttribute('data-toggle', 'dropdown');
        cardMoreActionsButton.setAttribute('aria-haspopup', 'true');
        cardMoreActionsButton.setAttribute('aria-expanded', 'false');

        let cardMoreActions = document.createElement('i');
        cardMoreActions.classList.add('material-icons');
        cardMoreActions.classList.add('md-18');
        cardMoreActions.classList.add('md-dark');
        cardMoreActions.setAttribute('data-toggle', 'dropdown');
        cardMoreActions.setAttribute('id', 'edit_delete');
        cardMoreActions.innerHTML = 'more_horiz';

        let cardMoreActionsDivDropdownMenu = document.createElement('div');
        cardMoreActionsDivDropdownMenu.classList.add('dropdown-menu');
        cardMoreActionsDivDropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuLink');

        // Edit a card
        let cardMoreActionsEdit = document.createElement('a');
        cardMoreActionsEdit.classList.add('dropdown-item');
        cardMoreActionsEdit.classList.add('sans-serif');
        cardMoreActionsEdit.setAttribute('href', '#');
        cardMoreActionsEdit.innerText = 'Edit';
        this.edit(cardMoreActionsEdit, card_key);

        // Delete a card
        let cardMoreActionsDelete = document.createElement('a');
        cardMoreActionsDelete.classList.add('dropdown-item');
        cardMoreActionsDelete.classList.add('sans-serif');
        cardMoreActionsDelete.setAttribute('href', '#');
        cardMoreActionsDelete.innerText = 'Delete';
        this.delete(cardMoreActionsDelete, card_key);

        cardMoreActionsDivDropdownMenu.appendChild(cardMoreActionsEdit);
        cardMoreActionsDivDropdownMenu.appendChild(cardMoreActionsDelete);
        // cardMoreActionsButton.appendChild(cardMoreActions);
        // cardMoreActionsButtonDiv.appendChild(cardMoreActionsButton);
        cardMoreActionsButtonDiv.appendChild(cardMoreActions);
        cardMoreActionsButtonDiv.appendChild(cardMoreActionsDivDropdownMenu);
        divColSm4.appendChild(cardMoreActionsButtonDiv);

        // Build the rows
        divRow.appendChild(divColSm1);
        divRow.appendChild(divColSm2);
        divRow2.appendChild(divColSm3);
        divRow2.appendChild(divColSm4);

        // Build the card from its various lego bricks
        divCardBody.appendChild(h5CardTitle);
        divCardBody.appendChild(divRow);
        divCardBody.appendChild(pCardDetailsText);
        divCardBody.appendChild(divRow2);

        // And add it to the card container, then card column div
        divCardContainer.appendChild(divCardBody);
        divCardColumns.appendChild(divCardContainer);
    }

}
