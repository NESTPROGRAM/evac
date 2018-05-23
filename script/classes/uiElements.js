class UI_ActiveIntro extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeIntro";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "Introduction to Simulation Mode"));
        container.appendChild(DOMSugar.p("Now that you are familiar with the environment you will be introduced to your patient and placed in the actual simulation environment."));
        container.appendChild(DOMSugar.p("You will receive further information about the situation during the simulation."));
        container.appendChild(DOMSugar.p("We acknowledge that simulation cannot exactly match for your work environment and work flow. Please do your best to act as you would in a real situation with the information and equipment given."));
        container.appendChild(DOMSugar.p("When you are ready to begin please press the Start button."));
        app.audioManager.play("audio/03-active/intro_active.mp3");

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Start", null, "centerButton", null, () => {
            $(container).empty();

            container.appendChild(DOMSugar.h(1, "Patient Handoff"));
            container.innerHTML += app.descriptor.textBlocks.patient_signout;

            app.audioManager.stop();
            app.audioManager.play(app.descriptor.audioFiles.patient_signout);

            let buttonContainer = DOMSugar.div("", "centerButtons");
            buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
                app.audioManager.stop();

                if (app.descriptor.debug.testMode)
                    app.stateMachine.enterState(STATE_ACTIVE_MODE_PHONECALL_ONE);
                else
                    app.stateMachine.enterState(STATE_ACTIVE_MODE_QUAKE);
            }));
            container.appendChild(buttonContainer);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActiveEndChallenge extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeEndChallenge";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "Are you ready to evacuate?", "", "", "text-align: center"));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Yes", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_FEEDBACK);
        }));
        buttonContainer.appendChild(DOMSugar.button("No", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE);
        }));
        container.appendChild(buttonContainer);


        parent.appendChild(container);
    }
}

class UI_ActiveFeedback extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeFeedback";
        container.className = "panoPanel";

        let time  = app.scorekeeper.finishActivity();
        let score = Scorekeeper.calculateScore();

        container.appendChild(DOMSugar.h(1, "Feedback", "", "", "text-align: center"));
        container.appendChild(DOMSugar.p("Thank you for preparing your patient for evacuation."));
        container.appendChild(DOMSugar.p("This simulation looks both at the equipment you packed for the evacuation as well as the time it took to be ready to evacuate. The goal is to have critically ill patients ready for evacuation within 5 minutes of the notification to evacuate."));
        container.appendChild(DOMSugar.p("You completed the scenario in <span style=\"font-weight:bold; font-style: italic; color:#ffffa0\">" + Scorekeeper.formatTime(time) + "</span>."));
        container.appendChild(DOMSugar.p("You are scored on which objects you picked up and which you left behind. Objects are scored based on their likelihood of utility for caring for this patient in this scenario and were determined by a panel of expert nursing staff in your unit."));
        container.appendChild(DOMSugar.p("You scored <span style=\"font-weight:bold; font-style: italic; color:#ffffa0\">" + score + " out of 7 points</span>."));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_FEEDBACK_HIGH_PRIORITY);

        }));
        this.container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActiveFeedbackHigh extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent, assessment) {
        let container       = this.container;
        container.id        = "activeFeedbackHigh";
        container.className = "panoPanel";

        // Header
        container.appendChild(DOMSugar.h(1, "High Priority", "", "", "text-align: center"));
        container.appendChild(DOMSugar.p("You collected " + assessment.acquired.length + "/" + assessment.requiredCount + " high priority items for evacuating your patient.   Essential items should be taken for all critical patients. Please take a moment to review the highlighted high priority items that you need to remember to take next time."));

        // Item list - objects acquired
        if (assessment.acquired.length > 0) {
            container.append(DOMSugar.h(3, "You acquired the following necessary items:"));
            for (let object of assessment.acquired) {
                let objectPanel = new UI_InventoryObject(null, this, object);
                objectPanel.express(container);
            }
        }

        // Item list - objects left behind
        if (assessment.missing.length > 0) {
            container.append(DOMSugar.h(3, "You failed to acquire the following necessary items:"));
            for (let object of assessment.missing) {
                let objectPanel = new UI_InventoryObject(null, this, object);
                objectPanel.express(container);
            }
        }

        // Buttons
        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_FEEDBACK_LOW_PRIORITY);
        }));
        this.container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActiveFeedbackLow extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent, assessment) {
        let container       = this.container;
        container.id        = "activeFeedbackLow";
        container.className = "panoPanel";

        // Header
        container.appendChild(DOMSugar.h(1, "Low Priority", "", "", "text-align: center"));
        container.appendChild(DOMSugar.p("You also collected " + assessment.acquired.length + "/" + assessment.requiredCount + " low priority items. These non-essential items are less likely to be helpful in these types of disaster scenarios and may take extra time to pack, delaying the time to evacuate. Please take a moment to review the highlighted low priority items that can be left behind next time."));

        // Item lists
        if (assessment.acquired.length > 0) {
            container.append(DOMSugar.h(3, "You acquired the following unnecessary items:"));
            for (let object of assessment.acquired) {
                let objectPanel = new UI_InventoryObject(null, this, object);
                objectPanel.express(container);
            }
        }

        if (assessment.missing.length > 0) {
            container.append(DOMSugar.h(3, "You correctly left behind the following unnecessary items:"));
            for (let object of assessment.missing) {
                let objectPanel = new UI_InventoryObject(null, this, object);
                objectPanel.express(container);
            }
        }

        // Buttons
        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_REPEAT);
        }));
        buttonContainer.appendChild(DOMSugar.button("Back to High Priority", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_FEEDBACK_HIGH_PRIORITY);
        }));

        this.container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActivePostQuake extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activePostQuake";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "An earthquake just occurred!!!", "", "", "text-align: center"));

        parent.appendChild(container);
    }

    showPhoneButton() {
        // this.container.appendChild(DOMSugar.img("images/UI/phone.jpg", "", "", "margin: 0 auto"));
        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Answer Phone", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_PHONECALL_ONE);
        }));
        this.container.appendChild(buttonContainer);
    }
}

class UI_ActivePhoneCallPartOne extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activePhoneCall";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.p("This is Elaine, the charge nurse. There has been a major earthquake. Are you or your patient injured? Is there any damage to your room?"));
        app.audioManager.play("audio/03-active/phonecall1.mp3");

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.audioManager.stop();
            app.stateMachine.enterState(STATE_ACTIVE_MODE_QUESTIONS_ONE);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActivePhoneCallPartTwo extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activePhoneCall";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.p("A code yellow is being activated and all communication should go through me as the code yellow Area Leader for our unit."));
        container.appendChild(DOMSugar.p("Our unit has sustained major structural damage and we have multiple staff injured. I have reported our status to the EOC, the Emergency Operations Center.  We have the order from the EOC to evacuate so that we can protect the patients, family, and staff."));
        container.appendChild(DOMSugar.p("Please prepare your patient for evacuation to the Ocean Clinic lobby where we will have shelter but minimal electricity and equipment due to damage to the building. Pack any necessary equipment and supplies for your patient."));
        container.appendChild(DOMSugar.p("The pathway to the lobby is clear so you may move your patient on the bed.  With some staff injured we are spread very thin so you will need to work alone."));
        container.appendChild(DOMSugar.p("When you are ready to go, disconnect from the ventilator and hand-bag your patient as we do not have staff to push the ventilators.  Once you are packed and hand-bagging your patient you can move out."));
        container.appendChild(DOMSugar.p("Please do a repeat back of my instructions."));

        app.audioManager.stop();
        app.audioManager.play("audio/03-active/phonecall2.mp3");

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.audioManager.stop();
            app.stateMachine.enterState(STATE_ACTIVE_MODE_QUESTIONS_TWO);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActiveQuestionsPartOne extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeQuestions1";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "Please answer the following questions", "", "", "text-align: center"));

        let table = document.createElement("table");

        let tr0 = DOMSugar.tr(null);
        tr0.appendChild(DOMSugar.td("Are you or your patient injured?"));
        let input_response0 = DOMSugar.input("response_0", "", "text", "width: 400px;");
        tr0.appendChild(DOMSugar.td(input_response0));
        table.appendChild(tr0);

        let tr1 = DOMSugar.tr(null);
        tr1.appendChild(DOMSugar.td("Is there any damage to your room?&nbsp;&nbsp;"));
        let input_response1 = DOMSugar.input("response_1", "", "text", "width: 400px;");
        tr1.appendChild(DOMSugar.td(input_response1));
        table.appendChild(tr1);

        container.appendChild(table);

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.scorekeeper.setResponse(0, input_response0.value);
            app.scorekeeper.setResponse(1, input_response1.value);

            app.stateMachine.enterState(STATE_ACTIVE_MODE_PHONECALL_TWO);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_ActiveQuestionsPartTwo extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeQuestions2";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "Please answer the following question", "", "", "text-align: center"));


        container.appendChild(DOMSugar.span("Please do a repeat back of my instructions"));
        let input_response = DOMSugar.textarea("response_2", null, null, null, "width: 700px; height: 140px");
        container.appendChild(input_response);

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.scorekeeper.setResponse(2, input_response.value);

            app.stateMachine.enterState(STATE_ACTIVE_MODE);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_HelpPanel extends UIElement {
    constructor(div, parent) {
        super(div, parent);
        this.nextState = STATE_TRAINING_MODE;
    }

    static showInstructions(topic, instructions) {

        // Select content to show
        let header = "";
        let text   = "";
        let audio  = "";
        if (topic === "pick_up") {
            header = "Picking up an object";
            text   = "To select an item, click on it. It will automatically be placed in your packed inventory.";
            audio  = "audio/02-training/pick_up.mp3";
        }
        else if (topic === "inventory") {
            header = "Reviewing your Inventory";
            text   = "Click on the inventory button to view items in the inventory. Click on the inventory button again to close your inventory.";
            audio  = "audio/02-training/inventory.mp3";
        }
        else if (topic === "put_down") {
            header = "Putting an object down";
            text   = "Click on the inventory button to view items that you have packed. To remove an item from your inventory, click on the item. If you need to pick it back up, go back into the room and click on it again.";
            audio  = "audio/02-training/put_down.mp3";
        }
        else if (topic === "look_around") {
            header = "Looking around";
            text   = "To look around, swipe across your touch screen or click and hold your mouse button, then move your mouse from side to side to drag the screen to the side.";
            audio  = "audio/02-training/look_around.mp3";
        }
        else if (topic === "move_around") {
            header = "Moving around";
            text   = "To move around the room, click on an arrow icon to move to that location.";
            audio  = "audio/02-training/move_around.mp3";
        }
        else if (topic === "zoom") {
            header = "Zooming";
            text   = "You can zoom in on an item like the infusion pump to view it more clearly by clicking on it. Click on it again to zoom out.";
            audio  = "audio/02-training/zoom.mp3";
        }
        else if (topic === "speak_aloud") {
            header = "Speaking responses";
            text   = "You may hear from other staff members during the simulation. If you are asked for a response please speak out loud. When you are done speaking click Next.";
            audio  = "audio/02-training/speak_aloud.mp3";
        }
        else if (topic === "end_simulation") {
            header = "Ending the Simulation";
            text   = "You can end the simulation at any time by closing your browser window.";
            audio  = "audio/02-training/end_simulation.mp3";
        }
        else if (topic === "exit_training") {
            header = "Exiting training mode";
            text   = "When you have selected all the items you need and are ready to evacuate your patient, click on the ventilator next to the patient’s bed to disconnect the patient from the ventilator and begin hand bagging. The program will ask if you are ready to leave. Choose Yes to exit the simulation and receive feedback.";
            audio  = "audio/02-training/exit_training.mp3";
        }

        // Show / play content
        $(instructions).show();
        $(instructions).empty();
        $(instructions)[0].appendChild(DOMSugar.h(3, header));
        $(instructions)[0].appendChild(DOMSugar.p(text));

        app.audioManager.play(audio);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "helpPanel";
        container.className = "panoPanel";
        parent.appendChild(container);

        // Header
        container.appendChild(DOMSugar.h(1, "Help Panel"));
        container.appendChild(DOMSugar.p("Click on the buttons below to learn how to use the simulator"));

        // Buttons to select instructions to present
        let instructionButtonContainer = DOMSugar.div("", "instructionButtons");
        instructionButtonContainer.appendChild(DOMSugar.button("Picking things up", "", "", "", () => { UI_HelpPanel.showInstructions("pick_up", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Using your Inventory", "", "", "", () => { UI_HelpPanel.showInstructions("inventory", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Putting things down", "", "", "", () => { UI_HelpPanel.showInstructions("put_down", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Looking around", "", "", "", () => { UI_HelpPanel.showInstructions("look_around", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Moving around", "", "", "", () => { UI_HelpPanel.showInstructions("move_around", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Zooming", "", "", "", () => { UI_HelpPanel.showInstructions("zoom", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Speaking responses", "", "", "", () => { UI_HelpPanel.showInstructions("speak_aloud", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Ending the Simulation", "", "", "", () => { UI_HelpPanel.showInstructions("end_simulation", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Exiting training mode", "", "", "", () => { UI_HelpPanel.showInstructions("exit_training", this.div_instructions); }));
        container.appendChild(instructionButtonContainer);

        // Panel in which to display instructions
        this.div_instructions = DOMSugar.div("", "instructions");
        $(this.div_instructions).hide();
        container.appendChild(this.div_instructions);

        // Footer
        container.appendChild(DOMSugar.p("You can review these instructions at any time by pressing the 'Help' button in the top left hand corner of the screen"));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Close", null, "centerButton", null, () => {
            app.audioManager.stop();
            app.stateMachine.enterState(this.nextState);
        }));
        container.appendChild(buttonContainer);
    }
}

class UI_HelpButton extends UIElement {
    constructor(div, parent, helpPanel) {
        super(div, parent);
        this.helpPanel = helpPanel;
        this.helpState = STATE_TRAINING_MODE_HELP;
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "helpButton";
        container.className = "panoButton";
        container.onclick   = () => {
            app.stateMachine.enterState(this.helpState);
        };

        container.innerHTML = "";
        container.append(DOMSugar.span("Help"));

        parent.append(container);
    }
}

class UI_InventoryButton extends UIElement {
    constructor(div, parent, inventoryPanel) {
        super(div, parent);
        this.inventoryPanel = inventoryPanel;
        this.inventoryState = STATE_TRAINING_MODE_INVENTORY;
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "inventoryButton";
        container.className = "panoButton";
        container.onclick   = () => {
            app.stateMachine.enterState(this.inventoryState);
        };

        container.append(DOMSugar.span("Inventory"));

        parent.append(container);
    }
}

class UI_InventoryPanel extends UIElement {
    constructor(div, parent) {
        super(div, parent);
        this.div_inner = document.createElement("div");
        this.nextState = STATE_TRAINING_MODE;
    }

    clear() {
        if (this.div_inner !== null)
            DOMSugar.clear(this.div_inner);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "inventoryPanel";
        container.className = "panoPanel";

        container.append(DOMSugar.h(1, "Inventory"));
        container.append(this.div_inner);

        this.container.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Close", null, "centerButton", null, () => {
            app.stateMachine.enterState(this.nextState);
        }));
        container.appendChild(buttonContainer);

        parent.append(container);
    }

    showObjects(objects, inventory) {
        this.clear();
        if (objects.length > 0) {
            for (let object of objects) {
                let inventoryObject = new UI_InventoryObject(null, this.div_inner, object);
                inventoryObject.express(null, inventory);
            }
        }
        else {
            $(this.div_inner).html("Your inventory is currently empty");
        }
    }
}

class UI_InventoryObject extends UIElement {
    constructor(div, parent, object) {
        super(div, parent);
        this._object = object;
    }

    _express(parent, inventory) {
        if (parent != null) {
            let div = DOMSugar.div(null, null, "inventoryObject");

            // div.appendChild(DOMSugar.img(this._object.inventory_img, null, "inventoryImage"));
            div.appendChild(DOMSugar.span(this._object.label, null, "inventoryLabel"));
            div.onclick = () => {
                ApplicationController.objectRemovedFromInventory(this._object.id);
            };

            parent.appendChild(div);
        }
    }
}

class UI_LoadingDialog extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container = this.container;
        container.id  = "loadingDialog";

        container.appendChild(DOMSugar.img("images/logo_thin.png", null, null, "width: 100%"));
        container.appendChild(DOMSugar.div("Please wait - your VR experience is loading.<br/> Note - this may take up to a minute."));
        parent.appendChild(container);
    }
}

class UI_PumpPanel extends UIElement {
    constructor(div, parent) {
        super(div, parent);

        this._nextMode = null;
    }

    get nextMode() { return this._nextMode; }

    set nextMode(v) { this._nextMode = v; }

    _express(parent) {
        let container = this.container;
        container.id  = "pumpPanel";

        let scene2d = app.world.getScene2D("pump");
        scene2d.express(container);

        container.appendChild(DOMSugar.button("Close", null, "centerButton", null, () => {
            app.stateMachine.enterState(this._nextMode);
        }));
        parent.appendChild(container);
    }
}

class UI_BabyPanel extends UIElement {
    constructor(div, parent) {
        super(div, parent);

        this._nextMode = null;
    }

    get nextMode() { return this._nextMode; }

    set nextMode(v) { this._nextMode = v; }

    _express(parent) {
        let container = this.container;
        container.id  = "babyPanel";

        let scene2d = app.world.getScene2D("baby");
        scene2d.express(container);

        container.appendChild(DOMSugar.button("Close", null, "centerButton", null, () => {
            app.stateMachine.enterState(this._nextMode);
        }));
        parent.appendChild(container);
    }
}

class UI_Timer extends UIElement {
    constructor(div, parent) {
        super(div, parent);

        this._text = DOMSugar.span("&nbsp;");
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "activeModeTimer";
        container.className = "panoButton";
        container.appendChild(DOMSugar.span("Time remaining: "));
        container.appendChild(this._text);

        parent.appendChild(container);

        this.performNextUpdate();
        setInterval(() => { this.performNextUpdate(); }, 250);
    }

    performNextUpdate() {
        let time = 300000 - app.scorekeeper.timeElapsed();

        // Process time
        let overtime = false;
        let minutes  = 0;
        let seconds  = 0;
        if (time >= 0) {
            minutes = Math.floor(time / 60000);
            time -= minutes * 60000;
            seconds = Math.floor(time / 1000);
        }

        else {
            overtime = true;
            minutes  = Math.floor(time / 60000);
            time -= minutes * 60000;
            seconds  = Math.floor(time / 1000);

            seconds = 60 - seconds;
            if (seconds == 60) {
                seconds = 0;
                minutes -= 1
            }

            minutes += 1;
            if (minutes == 0)
                minutes = "-" + minutes;
        }

        // Add leading zero to seconds
        if (seconds < 10) seconds = "0" + seconds;

        // Update timer display
        this._text.innerHTML = minutes + ":" + seconds;

        // Apply overtime color
        if (overtime)
            this._text.style.color = "#ff6060";
        else
            this._text.style.color = "#ffffff";
    }
}

class UI_TrainingLabel extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "trainingLabel";
        container.appendChild(DOMSugar.span("Training Mode"));

        parent.appendChild(container);
    }
}

class UI_TrainingIntro extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "trainingIntro";
        container.className = "panoPanel";
        parent.appendChild(container);

        // Header
        container.appendChild(DOMSugar.h(1, "Training Mode - Introduction"));
        container.appendChild(DOMSugar.p("Click on the buttons below to learn how to use the simulator"));

        // Buttons to select instructions to present
        let instructionButtonContainer = DOMSugar.div("", "instructionButtons");
        instructionButtonContainer.appendChild(DOMSugar.button("Picking things up", "", "", "", () => { UI_HelpPanel.showInstructions("pick_up", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Using your Inventory", "", "", "", () => { UI_HelpPanel.showInstructions("inventory", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Putting things down", "", "", "", () => { UI_HelpPanel.showInstructions("put_down", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Looking around", "", "", "", () => { UI_HelpPanel.showInstructions("look_around", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Moving around", "", "", "", () => { UI_HelpPanel.showInstructions("move_around", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Zooming", "", "", "", () => { UI_HelpPanel.showInstructions("zoom", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Speaking responses", "", "", "", () => { UI_HelpPanel.showInstructions("speak_aloud", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Ending the Simulation", "", "", "", () => { UI_HelpPanel.showInstructions("end_simulation", this.div_instructions); }));
        instructionButtonContainer.appendChild(DOMSugar.button("Exiting training mode", "", "", "", () => { UI_HelpPanel.showInstructions("exit_training", this.div_instructions); }));
        container.appendChild(instructionButtonContainer);

        // Panel in which to display instructions
        this.div_instructions = DOMSugar.div("", "instructions");
        $(this.div_instructions).hide();
        container.appendChild(this.div_instructions);

        // Footer
        container.appendChild(DOMSugar.p("You can review these instructions at any time by pressing the 'Help' button in the top left hand corner of the screen"));
        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.audioManager.stop();
            app.stateMachine.enterState(STATE_TRAINING_MODE);
        }));
        container.appendChild(buttonContainer);
    }
}

class UI_TrainingEnd extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "trainingEnd";
        container.className = "panoPanel";
        container.appendChild(DOMSugar.h(1, "Complete Training?"));
        container.appendChild(DOMSugar.p("Would you like to complete training and proceed to simulation mode?"));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Proceed", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE_INTRO);
        }));
        buttonContainer.appendChild(DOMSugar.button("Cancel", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_TRAINING_MODE);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_TryAgain extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container       = this.container;
        container.id        = "tryAgain";
        container.className = "panoPanel";

        container.appendChild(DOMSugar.h(1, "Try Again"));

        container.appendChild(DOMSugar.p("Always consider whether an item's utility for any given patient outweighs the time to pack them and difficulty in gathering or carrying them."));
        container.appendChild(DOMSugar.p("You have the opportunity to repeat the scenario to improve your score and practice your evacuation packing. "));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        buttonContainer.appendChild(DOMSugar.button("Try Again", null, "centerButton", null, () => {
            app.stateMachine.enterState(STATE_ACTIVE_MODE);
        }));
        container.appendChild(buttonContainer);

        parent.appendChild(container);
    }
}

class UI_Finale extends UIElement {
    constructor(div, parent) {
        super(div, parent);
    }

    _express(parent) {
        let container = this.container;
        container.id  = "finale";

        app.audioManager.play("audio/03-active/finale.mp3");

        container.appendChild(DOMSugar.h(1, "End Simulation"));
        container.appendChild(DOMSugar.p("Great job evacuating your patient with all the items needed in an emergency!"));
        container.appendChild(DOMSugar.p("Your patient was safely evacuated and his family thanks you for your hard work in saving their son. The scenario is now complete and you may exit the program."));
        container.appendChild(DOMSugar.p("Please fill out the post-simulation survey to tell us about your experience."));
        container.appendChild(DOMSugar.p("For questions about this activity please contact the NEST program at <a href=\"www.nestprogram.org\">www.nestprogram.org</a>."));

        container.appendChild(DOMSugar.h(2, "Thank you for participating!"));

        let buttonContainer = DOMSugar.div("", "centerButtons");
        container.appendChild(buttonContainer);

        buttonContainer.appendChild(DOMSugar.button("Print report", null, "centerButton", null, () => {
            container.appendChild(DOMSugar.h(2, "Report:"));
            container.innerHTML += app.scorekeeper.generateReport();
            window.print();
        }));

        buttonContainer.appendChild(DOMSugar.button("Return to home page", null, "centerButton", null, () => {
            location.reload();
        }));

        parent.appendChild(container);
    }
}