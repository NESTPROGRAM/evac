class World {
    constructor(descriptor, app) {
        this.descriptor       = descriptor;
        this.viewerElement    = app.uiManager.divHolder.pano;
        this.viewer           = new Marzipano.Viewer(this.viewerElement, this.descriptor.viewerOptions);
        this.scenes           = [];
        this.scenes2D         = [];
        this.currentScene     = null;
        this.selectionEnabled = false;
        this.hoverEnabled     = true;

        this.viewerElement.addEventListener("click", (e) => {
            if (this.selectionEnabled) {
                let layer = this.currentScene.findLayerAtCoordinates(e.clientX, e.clientY);
                if (layer !== null)
                    ApplicationController.objectSelectedInScene(layer.descriptor.id);
            }
        });

        let moveCount           = 0;
        let currentHoveredLayer = null;
        this.viewerElement.addEventListener("mousemove", (e) => {
            if (this.hoverEnabled) {
                moveCount++;
                let fn = () => {
                    if (moveCount === fn.mc) {
                        let layer = this.currentScene.findLayerAtCoordinates(e.clientX, e.clientY);

                        if (currentHoveredLayer !== null && currentHoveredLayer !== layer)
                            ApplicationController.objectUnHoveredInScene(currentHoveredLayer.descriptor.id);

                        if (layer !== null)
                            ApplicationController.objectHoveredInScene(layer.descriptor.id);

                        currentHoveredLayer = layer;
                    }
                };
                fn.mc  = moveCount;
                setTimeout(fn, 100);
            }
        });
    }

    express() {
        this.showScene(this.descriptor.sceneTags.initialSceneId);
    }

    getScene(id) {
        if (this.scenes[id])
            return this.scenes[id];

        throw new Error("Cannot find scene with ID: " + id);
    }

    getScene2D(id) {
        if (this.scenes2D[id])
            return this.scenes2D[id];

        throw new Error("Cannot find 2D scene with ID: " + id);
    }

    getSceneDescriptor(id) {
        if (!this.descriptor.sceneDescriptors.hasOwnProperty(id))
            throw new Error("Cannot find descriptor with ID: " + id);
        else
            return this.descriptor.sceneDescriptors[id];
    }

    load() {
        return Promise.resolve()

            // Load scenes
            .then(() => {
                let promises = [];

                _.forEach(this.descriptor.sceneDescriptors, (descriptor, descriptorId) => {
                    let scene = new Scene(descriptor);
                    promises.push(scene.promise_load);
                    this.scenes[descriptorId] = scene;
                });

                return Promise.all(promises);
            })

            // Load scene objectLayers
            .then(() => {
                // Temporarily show initial scene for objectLayers to loadAsync into
                this.showScene(this.descriptor.sceneTags.initialSceneId);

                let promises = [];
                for (let scene_id in this.scenes) {
                    promises.push(this.scenes[scene_id].loadLayersAsync());
                }
                return Promise.all(promises);
            })

            // Clear objectLayers created during loadAsync off stage
            .then(() => {
                let layers = this.viewer.stage().listLayers();
                for (let i = 1; i < layers.length; i++)
                    this.viewer.stage().removeLayer(layers[i]);
            })

            // Load 2D Scenes
            .then(() => {
                let promises = [];

                _.forEach(this.descriptor.scenes2D, (descriptor, descriptorId) => {
                    let scene = new Scene2D(descriptor);
                    promises.push(scene.loadAsync());
                    this.scenes2D[descriptorId] = scene;
                });

                return Promise.all(promises);
            })

            // Re-express initial scene with newly loaded objectLayers
            .then(() => {
                this.express();
            });
    }

    showScene(id) {
        // Clean up previous scene
        if (this.currentScene !== null)
            this.currentScene.cleanUp();

        // Show requested scene
        let scene         = this.getScene(id);
        this.currentScene = scene;
        scene.show();
    }

    static loadFileToCanvas(filename) {
        return new Promise((resolve, reject) => {
            let canvas  = document.createElement('canvas');
            let ctx     = canvas.getContext('2d');
            let img     = document.createElement('img');
            img.onload  = function () {
                canvas.width  = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            };
            img.onerror = function (err) {
                reject(err);
            };
            img.src     = filename;
        });
    }

    static compose() {
        let fnList = arguments;
        return (initialArg) => {
            let ret = initialArg;
            for (let i = 0; i < fnList.length; i++) {
                let fn = fnList[i];
                ret    = fn.call(null, ret);
            }
            return ret;
        };
    }
}