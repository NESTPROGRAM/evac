class UIElement {
    constructor(div, parent) {
        if (div === undefined || div === null)
            this._container = document.createElement("div");
        else
            this._container = div;

        if (parent === undefined || parent === null)
            this._defaultParent = document.querySelector("body");
        else
            this._defaultParent = parent;
    }


    get container() {
        if (this._container === undefined || this._container === null)
            throw "Broken UI element - container missing or broken";

        return this._container;
    }

    get defaultParent() {
        if (this._defaultParent === undefined || this._defaultParent === null)
            throw "Broken UI element - default parent missing or broken";

        return this._defaultParent;
    }

    appendChild(child) {
        this._container.appendChild(child);
    }

    destroy() {
        if (this._container === undefined || this._container === null)
            throw "Broken UI element - container missing or broken";

        DOMSugar.clear(this._container);

        if (this._container.parentNode)
            this._container.parentNode.removeChild(this._container);
    }

    _express() {
        throw "Subclasses must override UIElement._express";
    }

    express(parent) {
        if (parent === undefined || parent === null)
            parent = this.defaultParent;

        let newArgs = [];
        newArgs.push(parent);
        for (let i = 1; i < arguments.length; i++)
            newArgs.push(arguments[i]);

        this._express.apply(this, newArgs);
    }

    fadeToggle() {
        $(this.container).fadeToggle("slow", "linear");
    }

    hide() {
        $(this.container).hide();
    }

    show() {
        $(this.container).show();
    }
}

class UIManager {
    constructor(div_pano, div_intro) {
        // Validate DOM Elements
        if (div_pano === undefined || div_pano === null)
            throw("Cannot proceed - Panorama div is missing");
        if (div_intro === undefined || div_intro === null)
            throw("Cannot proceed - Intro dialog is missing");

        this.divHolder       = {};
        this.divHolder.pano  = div_pano;
        this.divHolder.intro = div_intro;

        this.uiHolder                       = {};
        this.uiHolder.activeIntro           = new UI_ActiveIntro(null, this.divHolder.pano);
        this.uiHolder.activePostQuake       = new UI_ActivePostQuake(null, this.divHolder.pano);
        this.uiHolder.activePhoneCallOne    = new UI_ActivePhoneCallPartOne(null, this.divHolder.pano);
        this.uiHolder.activePhoneCallTwo    = new UI_ActivePhoneCallPartTwo(null, this.divHolder.pano);
        this.uiHolder.activeEndChallenge    = new UI_ActiveEndChallenge(null, this.divHolder.pano);
        this.uiHolder.activeFeedback        = new UI_ActiveFeedback(null, this.divHolder.pano);
        this.uiHolder.activeFeedbackHigh    = new UI_ActiveFeedbackHigh(null, this.divHolder.pano);
        this.uiHolder.activeFeedbackLow     = new UI_ActiveFeedbackLow(null, this.divHolder.pano);
        this.uiHolder.activeQuestionsOne    = new UI_ActiveQuestionsPartOne(null, this.divHolder.pano);
        this.uiHolder.activeQuestionsTwo    = new UI_ActiveQuestionsPartTwo(null, this.divHolder.pano);
        this.uiHolder.loadingDialog         = new UI_LoadingDialog();
        this.uiHolder.helpPanel             = new UI_HelpPanel(null, this.divHolder.pano);
        this.uiHolder.inventoryPanel        = new UI_InventoryPanel(null, this.divHolder.pano);
        this.uiHolder.babyPanel             = new UI_BabyPanel(null, this.divHolder.pano);
        this.uiHolder.pumpPanel             = new UI_PumpPanel(null, this.divHolder.pano);
        this.uiHolder.timer                 = new UI_Timer(null, this.divHolder.pano);
        this.uiHolder.trainingEnd           = new UI_TrainingEnd(null, this.divHolder.pano);
        this.uiHolder.trainingIntro         = new UI_TrainingIntro(null, this.divHolder.pano);
        this.uiHolder.trainingLabel         = new UI_TrainingLabel(null, this.divHolder.pano);
        this.uiHolder.tryAgain              = new UI_TryAgain(null, this.divHolder.pano);
        this.uiHolder.finale                = new UI_Finale();
        this.uiHolder.inventoryButton       = new UI_InventoryButton(null, this.divHolder.pano, this.uiHolder.inventoryPanel);
        this.uiHolder.helpButton            = new UI_HelpButton(null, this.divHolder.pano);
    }

    static hideHotspots() {
        let hotspotElements = [];
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".link-hotspot img")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".link-hotspot div")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".invisible-hotspot img")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".invisible-hotspot div")));

        for (let i = 0; i < hotspotElements.length; i++) {
            hotspotElements[i].style.display = "none";
        }
    }

    static showHotspots() {
        let hotspotElements = [];
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".link-hotspot img")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".link-hotspot div")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".invisible-hotspot img")));
        hotspotElements     = hotspotElements.concat([].slice.call(document.querySelectorAll(".invisible-hotspot div")));

        for (let i = 0; i < hotspotElements.length; i++) {
            hotspotElements[i].style.display = "";
        }
    }
}