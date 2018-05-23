class StateMachine {
    constructor(uiManager, descriptor) {
        this._currentState = null;
    }

    enterState(state) {
        if (this._currentState !== null) {
            console.log("Leaving State: " + this._currentState.name);
            this._currentState.leave(this);
        }

        console.log("Entering State: " + state.name);
        state.enter(this);
        this._currentState = state;
    }
}

class State {
    static enter() {
        throw "State.enter not yet implemented - should be overridden by subclass";
    }

    static leave() {
        throw "State.leave not yet implemented - should be overridden by subclass";
    }
}

class STATE_OPENING_FORM extends State {
    static enter() {
        $(app.uiManager.divHolder.intro).show();
    }

    static leave() {
        $(app.uiManager.divHolder.intro).hide();
    }
}
class STATE_LOADING extends State {
    static enter() {
        // Keep the user informed
        app.uiManager.uiHolder.loadingDialog.express();

        // Panorama div must be visible during world (viewer) creation
        $(app.uiManager.divHolder.pano).show();
        app.world = new World(app.descriptor, app);

        Promise.resolve()
            .then(() => {
                // Hide panorama div during load
                $(app.uiManager.divHolder.pano).hide();
                return app.world.load();
            })
            .then(() => {
                app.stateMachine.enterState(STATE_TRAINING_MODE_INTRO);
                // $(app.uiManager.divHolder.pano).show();
                // app.stateMachine.enterState(STATE_ACTIVE_MODE_ANSWERED_PHONE);
            });

    }

    static leave() {
        app.uiManager.uiHolder.loadingDialog.destroy();
        app.world.express();
    }
}
class STATE_TRAINING_MODE_INTRO extends State {
    static enter() {
        $(app.uiManager.divHolder.pano).show();
        app.uiManager.uiHolder.trainingIntro.express();
        app.world.currentScene.showAllLayers();
        UIManager.hideHotspots()
    }

    static leave() {
        app.uiManager.uiHolder.trainingIntro.destroy();
        ApplicationController.removeAllObjectsFromInventory();
        app.scorekeeper.startActivity();
    }
}
class STATE_TRAINING_MODE extends State {
    static enter() {
        $(app.uiManager.divHolder.pano).show();
        app.audioManager.loop("audio/effects/background.mp3");
        app.uiManager.uiHolder.helpButton.helpState = STATE_TRAINING_MODE_HELP;
        app.uiManager.uiHolder.helpButton.express();
        app.uiManager.uiHolder.inventoryButton.inventoryState = STATE_TRAINING_MODE_INVENTORY;
        app.uiManager.uiHolder.inventoryButton.express();
        app.uiManager.uiHolder.trainingLabel.express();
        app.inventory.refreshUI();
        UIManager.showHotspots();
        app.world.selectionEnabled = true;
    }

    static leave() {
        app.uiManager.uiHolder.helpButton.destroy();
        app.uiManager.uiHolder.inventoryButton.destroy();
        app.uiManager.uiHolder.trainingLabel.destroy();
        UIManager.hideHotspots();
        app.world.selectionEnabled = false;
    }
}
class STATE_TRAINING_MODE_HELP extends State {
    static enter() {
        app.uiManager.uiHolder.helpPanel.nextState = STATE_TRAINING_MODE;
        app.uiManager.uiHolder.helpPanel.express();
    }

    static leave() {
        app.uiManager.uiHolder.helpPanel.destroy();
    }
}
class STATE_TRAINING_MODE_INVENTORY extends State {
    static enter() {
        app.uiManager.uiHolder.inventoryPanel.nextState = STATE_TRAINING_MODE;
        app.uiManager.uiHolder.inventoryPanel.express();
        app.inventory.refreshUI();
    }

    static leave() {
        app.uiManager.uiHolder.inventoryPanel.destroy();
    }
}
class STATE_TRAINING_MODE_BABY extends State {
    static enter() {
        app.uiManager.uiHolder.babyPanel.nextMode = STATE_TRAINING_MODE;
        app.uiManager.uiHolder.babyPanel.express();
    }
    static leave() {
        app.uiManager.uiHolder.babyPanel.destroy();
    }
}
class STATE_TRAINING_MODE_PUMP extends State {
    static enter() {
        app.uiManager.uiHolder.pumpPanel.nextMode = STATE_TRAINING_MODE;
        app.uiManager.uiHolder.pumpPanel.express();
    }
    static leave() {
        app.uiManager.uiHolder.pumpPanel.destroy();
    }
}
class STATE_TRAINING_MODE_END extends State {
    static enter() {
        app.audioManager.stop();
        $(app.uiManager.divHolder.pano).show();
        app.uiManager.uiHolder.trainingEnd.express();
    }

    static leave() {
        app.uiManager.uiHolder.trainingEnd.destroy();
    }
}
class STATE_ACTIVE_MODE_INTRO extends State {
    static enter() {
        $(app.uiManager.divHolder.pano).show();
        app.uiManager.uiHolder.activeIntro.express();
        app.world.currentScene.showAllLayers();
        ApplicationController.removeAllObjectsFromInventory();
        UIManager.hideHotspots();
    }

    static leave() {
        app.uiManager.uiHolder.activeIntro.destroy();
    }
}
class STATE_ACTIVE_MODE_QUAKE extends State {
    static enter() {
        app.audioManager.play("audio/effects/earthquake_scream.mp3");

        setTimeout(() => {
            app.world.showScene(app.descriptor.sceneTags.black);
        }, 4000);
        setTimeout(() => {
            app.world.showScene(app.descriptor.sceneTags.secondSceneId);
        }, 9000);
        setTimeout(() => {
            app.uiManager.uiHolder.activePostQuake.express();
        }, 13000);
        setTimeout(() => {
            app.audioManager.loop("audio/effects/phone.mp3");
            app.uiManager.uiHolder.activePostQuake.showPhoneButton();
        }, 22000);
    }

    static leave() {
        app.uiManager.uiHolder.activePostQuake.destroy();
        app.audioManager.stop();
    }
}
class STATE_ACTIVE_MODE_PHONECALL_ONE extends State {
    static enter() {
        app.uiManager.uiHolder.activePhoneCallOne.express();
    }

    static leave() {
        app.uiManager.uiHolder.activePhoneCallOne.destroy();
    }
}
class STATE_ACTIVE_MODE_QUESTIONS_ONE extends State {
    static enter() {
        app.uiManager.uiHolder.activeQuestionsOne.express();
    }

    static leave() {
        app.uiManager.uiHolder.activeQuestionsOne.destroy();
        app.scorekeeper.startActivity();
    }
}
class STATE_ACTIVE_MODE_PHONECALL_TWO extends State {
    static enter() {
        app.uiManager.uiHolder.activePhoneCallTwo.express();
    }

    static leave() {
        app.uiManager.uiHolder.activePhoneCallTwo.destroy();
    }
}
class STATE_ACTIVE_MODE_QUESTIONS_TWO extends State {
    static enter() {
        app.uiManager.uiHolder.activeQuestionsTwo.express();
    }

    static leave() {
        app.uiManager.uiHolder.activeQuestionsTwo.destroy();
        app.scorekeeper.startActivity();
    }
}
class STATE_ACTIVE_MODE extends State {
    static enter() {
        app.world.showScene(app.descriptor.sceneTags.secondSceneId);
        app.audioManager.loop("audio/effects/background.mp3");
        $(app.uiManager.divHolder.pano).show();
        app.uiManager.uiHolder.helpButton.helpState = STATE_ACTIVE_MODE_HELP;
        app.uiManager.uiHolder.helpButton.express();
        app.uiManager.uiHolder.inventoryButton.inventoryState = STATE_ACTIVE_MODE_INVENTORY;
        app.uiManager.uiHolder.inventoryButton.express();
        app.uiManager.uiHolder.timer.express();
        UIManager.showHotspots();
        app.world.selectionEnabled = true;
    }

    static leave() {
        app.uiManager.uiHolder.helpButton.destroy();
        app.uiManager.uiHolder.inventoryButton.destroy();
        app.uiManager.uiHolder.timer.destroy();
        UIManager.hideHotspots();
        app.world.selectionEnabled = false;
    }
}
class STATE_ACTIVE_MODE_HELP extends State {
    static enter() {
        app.uiManager.uiHolder.helpPanel.nextState = STATE_ACTIVE_MODE;
        app.uiManager.uiHolder.helpPanel.express();
    }

    static leave() {
        app.uiManager.uiHolder.helpPanel.destroy();
    }
}
class STATE_ACTIVE_MODE_INVENTORY extends State {
    static enter() {
        app.uiManager.uiHolder.inventoryPanel.nextState = STATE_ACTIVE_MODE;
        app.uiManager.uiHolder.inventoryPanel.express();
        app.inventory.refreshUI();
    }

    static leave() {
        app.uiManager.uiHolder.inventoryPanel.destroy();
    }
}
class STATE_ACTIVE_MODE_PUMP extends State {
    static enter() {
        app.uiManager.uiHolder.pumpPanel.nextMode = STATE_ACTIVE_MODE;
        app.uiManager.uiHolder.pumpPanel.express();
    }
    static leave() {
        app.uiManager.uiHolder.pumpPanel.destroy();
    }
}
class STATE_ACTIVE_MODE_BABY extends State {
    static enter() {
        app.uiManager.uiHolder.babyPanel.nextMode = STATE_ACTIVE_MODE;
        app.uiManager.uiHolder.babyPanel.express();
    }
    static leave() {
        app.uiManager.uiHolder.babyPanel.destroy();
    }
}
class STATE_ACTIVE_MODE_END_CHALLENGE extends State {
    static enter() {
        app.audioManager.stop();
        app.uiManager.uiHolder.activeEndChallenge.express();
    }
    static leave() {
        app.uiManager.uiHolder.activeEndChallenge.destroy();
    }
}
class STATE_ACTIVE_MODE_FEEDBACK extends State {
    static enter() {
        app.uiManager.uiHolder.activeFeedback.express();
    }

    static leave() {
        app.uiManager.uiHolder.activeFeedback.destroy();
    }
}
class STATE_ACTIVE_MODE_FEEDBACK_HIGH_PRIORITY extends State {
    static enter() {
        let assessment = app.scorekeeper.assessStudent(app.inventory, "high");
        app.uiManager.uiHolder.activeFeedbackHigh.express(null, assessment);
    }

    static leave() {
        app.uiManager.uiHolder.activeFeedbackHigh.destroy();
    }
}
class STATE_ACTIVE_MODE_FEEDBACK_LOW_PRIORITY extends State {
    static enter() {
        let assessment = app.scorekeeper.assessStudent(app.inventory, "low");
        app.uiManager.uiHolder.activeFeedbackLow.express(null, assessment);
    }

    static leave() {
        app.uiManager.uiHolder.activeFeedbackLow.destroy();
    }
}
class STATE_ACTIVE_MODE_CHEAT extends State {
    static enter() {
        $(app.uiManager.divHolder.pano).hide();
        app.uiManager.uiHolder.finale.express();
    }

    static leave() {
        app.uiManager.uiHolder.finale.destroy();
    }
}
class STATE_ACTIVE_MODE_REPEAT extends State {
    static enter() {
        if (app.scorekeeper.isAttempt(0)) {
            app.uiManager.uiHolder.tryAgain.express(null);
        }
        else
            app.stateMachine.enterState(STATE_SUBMIT_REPORT);
    }

    static leave() {
        app.scorekeeper.nextAttempt();
        ApplicationController.removeAllObjectsFromInventory();
        app.uiManager.uiHolder.tryAgain.destroy();
    }
}
class STATE_SUBMIT_REPORT extends State {
    static enter() {
        app.scorekeeper.submitReport();
        app.stateMachine.enterState(STATE_FINALE);
    }

    static leave() {
    }
}
class STATE_FINALE extends State {
    static enter() {
        $(app.uiManager.divHolder.pano).hide();
        app.uiManager.uiHolder.finale.express();
    }

    static leave() {
        alert("Attempting to leave STATE_FINISHED. This should never happen");
    }
}