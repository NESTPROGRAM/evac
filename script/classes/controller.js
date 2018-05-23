class ApplicationController {

    static objectHoveredInScene(objectId) {
        console.log("Object " + objectId + " hovered in scene");

        let object = app.getObject(objectId);
        object.layer.showLabel();
    }

    static objectUnHoveredInScene(objectId) {
        console.log("Object " + objectId + " unhovered in scene");

        let object = app.getObject(objectId);
        object.layer.hideLabel();
    }

    static objectSelectedInScene(objectId) {
        console.log("Object " + objectId + " selected in scene");

        let object = app.getObject(objectId);
        object.layer.makeInvisible();
        app.world.currentScene.refreshLayers();
        app.inventory.add(object);
        app.scorekeeper.addEvent("picked_up", objectId);
    }

    static objectSelectedInScene2D(scene, layer) {
        console.log("Object " + layer.descriptor.label + " selected in scene");

        layer.makeInvisible();
        scene.refresh();
        app.inventory.add(layer.descriptor);
        app.scorekeeper.addEvent("picked_up_2D", layer.descriptor.id);
    }

    static objectRemovedFromInventory(objectId) {
        console.log("Object " + objectId + " removed from inventory");

        if (app.hasObject(objectId)) {
            let object = app.getObject(objectId);
            object.layer.makeVisible();
            app.world.currentScene.refreshLayers();
            app.inventory.remove(object);
            app.scorekeeper.addEvent("dropped", objectId);
        }

        if (app.hasObject2D(objectId)) {
            let object = app.getObject2D(objectId);
            object.layer.makeVisible();
            object.layer.scene2D.refresh();
            app.inventory.remove(object);
            app.scorekeeper.addEvent("dropped", objectId);
        }
    }

    static removeAllObjectsFromInventory() {
        console.log("All objects removed from inventory");

        let scene2Dset = new Set();

        for (let object of app.inventory.objects) {
            object.layer.makeVisible();
            if (app.hasObject2D(object.id))
                scene2Dset.add(object.layer.scene2D);
        }
        app.world.currentScene.refreshLayers();
        for (let scene2D of scene2Dset)
            scene2D.refresh();

        app.scorekeeper.addEvent("empty", "");

        app.inventory.clear();
    }
}