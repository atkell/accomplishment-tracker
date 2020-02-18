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
}
