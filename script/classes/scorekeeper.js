class Scorekeeper {
    constructor(requiredObjects) {
        this._attempts        = 0;
        this._attemptDuration = [];
        this._requiredObjects = requiredObjects;
        this._responses       = [];
        this._events          = [];
        this._startTime       = null;
    }

    assessStudent(inventory, level) {

        // Select object set to assess against
        let requiredObjects = level === "low" ? this._requiredObjects.low : this._requiredObjects.high;

        // Create response object
        let response = {
            acquired:      [],
            missing:       [],
            requiredCount: requiredObjects.length
        };

        // Determine whether required objects are missing
        for (let requiredObjectId of requiredObjects) {
            let found = false;
            inventory.objects.forEach((obj) => {
                found = (found || obj.id === requiredObjectId);
            });

            if (found)
                response.acquired.push(app.getObjectAny(requiredObjectId));
            else
                response.missing.push(app.getObjectAny(requiredObjectId));
        }

        return response;
    }

    addEvent(type, label) {
        if (this._startTime !== null)
            this._events.push({time: Date.now() - this._startTime, type: type, label: label, attempt: this._attempts + 1});
    }

    clearEvents() {
        this._events.clear();
    }

    setName(name) {
        this._name = name;
    }

    setResponse(id, text) {
        this._responses[id] = text;
    }

    startActivity() {
        this._startTime = Date.now();
    }

    finishActivity() {
        if (this._startTime === null)
            throw "Cannot calculate activity duration - start time was null";

        this._attemptDuration[this._attempts] = Date.now() - this._startTime;

        return this._attemptDuration[this._attempts];
    }

    isAttempt(attempt) {
        return attempt === this._attempts;
    }

    nextAttempt() {
        this._attempts++;
        this.startActivity();
    }

    static calculateScore() {
        let sum = 0;
        let count = 0;
        for (let object of app.inventory.objects) {
            sum += object.value;
            count ++;
            console.log(object);
        }

        let score = count > 0 ? (sum / count) : 0;

        console.log(score);

        let score_remainder = score - Math.round(score);
        score = Math.round(score) + (score_remainder < 0.5 ? 0 : 1);

        console.log(score);

        return score;
    }

    generateReport() {
        let div_report = document.createElement("div");
        div_report.append(DOMSugar.h(4, "Participant: " + this._name));

        div_report.append(DOMSugar.p("Date: " + Scorekeeper.currentDate()));

        div_report.append(DOMSugar.p("Attempt 1: " + Scorekeeper.formatTime(this._attemptDuration[0])));
        div_report.append(DOMSugar.p("Attempt 2: " + Scorekeeper.formatTime(this._attemptDuration[1])));

        div_report.append(DOMSugar.p("Response to \"Are you or your patient injured?\":"));
        div_report.append(DOMSugar.p("\"" + this._responses[0] + "\""));
        div_report.append(DOMSugar.p("Response to \"Is there any damage to your room?\":"));
        div_report.append(DOMSugar.p("\"" + this._responses[1] + "\""));
        div_report.append(DOMSugar.p("Response to \"Please do a repeat back\":"));
        div_report.append(DOMSugar.p("\"" + this._responses[2] + "\""));

        div_report.append(DOMSugar.p("Events:<br/>"));
        let list = "<ul>";

        for (let i = 0; i < this._events.length; i++) {
            let e = this._events[i];
            list += "<li>" + "Attempt: " + e.attempt + ", time " + Scorekeeper.formatTime(e.time) + ", action " + e.type + ", on " + e.label;
        }
        list += "</ul>";

        div_report.innerHTML += list;

        return div_report.innerHTML;
    }

    submitReport() {
        let report = {};
        report.name = this._name;
        report.date = Scorekeeper.currentDate();
        report.attempt1_duration = Math.floor(this._attemptDuration[0] / 1000);
        report.attempt2_duration = Math.floor(this._attemptDuration[1] / 1000);
        report.responses = this._responses;

        report.events = [];
        for (let i = 0; i < this._events.length; i++) {
            let e = this._events[i];
            report.events.push({
                attempt: e.attempt,
                time: Math.round(e.time / 1000),
                action: e.type,
                object: e.label
            });
        }

        $.ajax({
            url:     app.descriptor.ajaxEndpoint,
            method:  "post",
            data: {
                report: report,
            },
            success: function (result) {
                console.log("Report submitted!");
                console.log(result);
            }
        });
    }

    timeElapsed() {
        return Date.now() - this._startTime;
    }

    static formatTime(time) {
        let minutes = Math.floor(time / 60000);
        time -= minutes * 60000;
        let seconds = Math.floor(time / 1000);

        return minutes + " minutes, " + seconds + " seconds";
    }

    static currentDate() {
        let today = new Date();
        let dd    = today.getDate();
        let mm    = today.getMonth() + 1; //January is 0!
        let yyyy  = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + "-" + mm + '-' + dd;
        return today;
    }

}