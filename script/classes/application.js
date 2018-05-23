class Application {
    constructor(uiManager, descriptor) {
        if (typeof(descriptor) !== "object")
            throw "Aborted. Application not created correctly - Descriptor is not valid.";

        if (typeof(uiManager) !== "object" || uiManager.constructor.name !== "UIManager")
            throw "Aborted. Application not created correctly - UI Manager not valid.";

        this._currentState = null;
        this._world = null;

        this.descriptor = descriptor;
        this.uiManager = uiManager;
        this.audioManager = new AudioManager();
        this.scorekeeper = new Scorekeeper(this.descriptor.requiredObjects);
        this.inventory = new Inventory(uiManager.uiHolder.inventoryPanel);
        this.stateMachine = new StateMachine();

        this.scorekeeper.setName(participantName);
    }

    get world() {
        if (this._world === null || this._world === undefined)
            throw "World not available. State invoked prematurely?";

        return this._world;
    }

    getObject(id) {
        let object = this._world.descriptor.objects[id];
        if (object !== undefined)
            return object;
        else
            throw "Unable to find object with ID: " + id;
    }


    getObject2D(id) {
        let object = this._world.descriptor.objects2D[id];
        if (object !== undefined)
            return object;
        else
            throw "Unable to find 2D object with ID: " + id;
    }

    getObjectAny(id) {
        let object = this._world.descriptor.objects[id];
        if (object !== undefined)
            return object;
        else {
            object = this._world.descriptor.objects2D[id];
            if (object !== undefined)
                return object;
            else
                throw "Unable to find object of either type with ID: " + id;
        }
    }

    hasObject(id) {
        return this._world.descriptor.objects[id] !== undefined;
    }

    hasObject2D(id) {
        return this._world.descriptor.objects2D[id] !== undefined;
    }

    set world(v) {
        this._world = v;
    }
}
