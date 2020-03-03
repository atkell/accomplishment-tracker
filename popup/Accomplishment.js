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

    sortByFavorites(value) {

        let unsortedValues = Object.values(value);
        let storageBox = unsortedValues.sort(function (a) {
            return a[4]['favorite'];
        });
        return storageBox;
    }

    // TODO This don't work as we'd expect...why?
    getAllStorageKeys() {
        return chrome.storage.sync.get(null, function (result) {
            // let storageKeys = Object.keys(result);
            let storageBox = this.sortByCreatedDate(result);
            console.log(storageBox);
        });
    }

    // TODO This don't work as we'd expect...why?
    getAllStorageValues() {
        return chrome.storage.sync.get(null, function (result) {
            // console.log(Object.values(result));
            Object.values(result);
        });
    }

    validate () {
        if (this._summary == "") {
            alert("Please enter a Summary");
          }
          else if (this._details == "") {
            alert("Please enter Details");
        }
          else {
            this.save();
          }
        }

    save() {

        let body = [];
        body.push({"summary": this._summary});
        body.push({"details": this._details});
        body.push({"date": this._date});
        body.push({"status": this._status});
        body.push({'favorite': this._favorite});

        chrome.storage.sync.set({[this._date]: body}, function () {
            console.log('Created new entry!');
        });

        this.openNewTab();
    }

    parseURLforID() {
        return document.location.href.split('?')[1].split('=')[1];
    }

    update(value) {

        chrome.storage.sync.get([value], function (result) {

            const storageBox = Object.values(result);
            document.getElementById('summary').value = storageBox[0][0]['summary'];
            document.getElementById('status').value = storageBox[0][3]['status'];
            document.getElementById('details').value = storageBox[0][1]['details'];

        });
    }

    calcDuration() {

        var durationInMinutes = Math.round(((Date.now() - this._date) / 60000));

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

        this._duration = durationText;

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

        const is_favorite = this._favorite;

        if (this._favorite === true) {
            return 'favorite';
        } else {
            return 'favorite_border';
        }

    }

    makeFavorite(element, value) {

        element.onclick = function () {

            // Since we're out of the context of the view_cards page, we need to use the storage API plus the card
            // ID in order to get this information
            chrome.storage.sync.get([value.toString()], function (result) {
                const storageBox = Object.values(result);
                let is_favorite = storageBox[0][4]['favorite'];
                console.log(is_favorite);

                if (!is_favorite) {
                    // This is where we "favorite" a card when it is clicked

                    var body = [];
                    body.push({"summary": storageBox[0][0]['summary']});
                    body.push({"details": storageBox[0][1]['details']});
                    body.push({"date": storageBox[0][2]['date']});
                    body.push({"status": storageBox[0][3]['status']});
                    body.push({'favorite': true});
                    chrome.storage.sync.set({[value.toString()]: body});

                    location.reload();

                } else {
                    // And here we may "unfavorite" a card when it is clicked

                    var body = [];
                    body.push({"summary": storageBox[0][0]['summary']});
                    body.push({"details": storageBox[0][1]['details']});
                    body.push({"date": storageBox[0][2]['date']});
                    body.push({"status": storageBox[0][3]['status']});
                    body.push({'favorite': false});
                    chrome.storage.sync.set({[value.toString()]: body});

                    location.reload();

                }

            });
        };
    }

    freeSpace() {
        chrome.storage.sync.getBytesInUse(null, function (result) {
            let current_storage = result;
            let max_storage = 102400;
            let current_storage_as_percent = Math.round(current_storage / max_storage * 100);

            document.getElementById('progressbar').setAttribute('style', 'width: ' + current_storage_as_percent + "%;");
            document.getElementById('progressbar').setAttribute('aria-valuenow', current_storage_as_percent);
            document.getElementById('storage-used').innerHTML = "Used ( " + current_storage_as_percent + "% )";
            document.getElementById('storage-free').innerHTML = "Free ( " + (100 - current_storage_as_percent) + "% )";
        });
    }

    countStoredItems() {
        chrome.storage.sync.get(null, function (result) {
            let count_stored_items = Object.keys(result).length;
            document.getElementById('count-stored-items').innerHTML = "You have added " + count_stored_items + " accomplishments.️ ";

            // How may we find the date of the most recently added accomplishment?
            // We simply need to return the last item in the list of keys.
            // JavaScript apparently does not support using -1 in order to traverse the list backwards
            // It is, instead, recommended to array.length-1, which seems just as sane.
            let last_item_added = Object.keys(result)[count_stored_items - 1];
            // let first_item_added = Object.keys(result)[0];
            // let time_as_array_newest = Date(first_item_added).toLocaleString('en-US').split(' ');
            let time_as_array = Date(last_item_added).toLocaleString('en-US').split(' ');
            // 0 = Day of week, 1 = Month, 2 = Date, 3 = Year, 4 = Time
            // let date_as_string = time_as_array[0] + ', the ' + time_as_array[2] + ' of ' + time_as_array[1];
            let date_as_string = time_as_array[1] + ' ' + time_as_array[2] + ', ' + time_as_array[3];

            document.getElementById('count-stored-items').innerHTML += "The most recent is from " + date_as_string + '.';
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    openNewTab() {
        chrome.tabs.create({url: chrome.extension.getURL('popup/view_all.html#window')});
    }

    exportRandom(value, i) {
        let csv = 'date,summary,details,mood,favorite' + '\r\n';
        csv += (value[i][2]['date']
            + ',' + value[i][0]['summary']
            + ',' + value[i][1]['details']
            + ',' + value[i][3]['status']
            + ',' + value[i][4]['favorite']
            + '\r\n'
        );
        return csv;
    }

    export(value, type) {
        // value is the array object parsed from a get request to storage
        // type is the kind of export: all, favorites, and random
        let csv = 'date,summary,details,mood,favorite' + '\r\n';

        if (type === 'favorites') {
            for (let i = 0; i < value.length; i++) {
                if (value[i][4]['favorite']) {
                    csv += (value[i][2]['date']
                        + ',' + value[i][0]['summary']
                        + ',' + value[i][1]['details']
                        + ',' + value[i][3]['status']
                        + ',' + value[i][4]['favorite']
                        + '\r\n');
                }
            }
        } else {
            for (let i = 0; i < value.length; i++) {
                csv += (value[i][2]['date']
                    + ',' + value[i][0]['summary']
                    + ',' + value[i][1]['details']
                    + ',' + value[i][3]['status']
                    + ',' + value[i][4]['favorite']
                    + '\r\n'
                );
            }
        }

        return csv;
    }

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
        cardFavorite.classList.add('material-icons');
        cardFavorite.classList.add('md-18');
        cardFavorite.classList.add('md-dark');
        cardFavorite.classList.add('favorite');
        cardFavorite.innerHTML = this.checkFavorite();
        this.makeFavorite(cardFavorite, card_key);
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

        // TODO This feels complex, let's simplify it sometime soon
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
