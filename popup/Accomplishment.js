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

    populateFormFields(value) {

        chrome.storage.sync.get([value], function (result) {
            console.log(result);
        });

        document.getElementById('summary').value = this._summary;

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
        // openInNewTab();
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
}
