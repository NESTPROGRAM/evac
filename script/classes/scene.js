class Scene {
    constructor(descriptor) {
        let self                     = this;
        this.descriptor              = descriptor;
        this.id                      = descriptor.id;
        this.objectLayers = [];
        this.descriptor.linkHotspots = this.descriptor.linkHotspots ? this.descriptor.linkHotspots : [];

        this.promise_load = Promise.resolve()
            .then(() => { return World.loadFileToCanvas(descriptor.filename); })
            .then((canvas) => {
                let asset           = new Marzipano.DynamicCanvasAsset(canvas);
                let source          = new Marzipano.SingleAssetSource(asset);
                let geometry        = new Marzipano.EquirectGeometry([{width: canvas.width}]);
                let limiter         = World.compose(
                    Marzipano.RectilinearView.limit.resolution(2048),
                    Marzipano.RectilinearView.limit.vfov(Math.PI / 2, Math.PI / 2),
                    Marzipano.RectilinearView.limit.pitch(-0.5 * Math.PI / 2, 0.5 * Math.PI / 2)
                );
                self.view           = new Marzipano.RectilinearView(descriptor.initialViewParameters, limiter);
                self.marzipanoScene = app.world.viewer.createScene({
                    source:        source,
                    geometry:      geometry,
                    view:          self.view,
                    pinFirstLevel: true
                });
                self.expressLinkHotspots();
                self.expressTeleportHotspots();
            });
    }

    cleanUp() {
        for (let key in this.objectLayers) {
            if (app.world.viewer.stage().hasLayer(this.objectLayers[key].layer)) {
                app.world.viewer.stage().removeLayer(this.objectLayers[key].layer);
            }
        }
    }

    expressLinkHotspots() {
        const self = this;
        this.descriptor.linkHotspots.forEach(function (hotspotDescriptor) {
            // Create wrapper element to hold icon and tooltip.
            let div_wrapper = DOMSugar.div(null, null, "link-hotspot");

            // Create image element.
            let img_icon                        = DOMSugar.img('./images/UI/link.png', null, 'link-hotspot-icon');
            img_icon.style['-ms-transform']     = 'rotate(' + hotspotDescriptor.rotation + 'rad)';
            img_icon.style['-webkit-transform'] = 'rotate(' + hotspotDescriptor.rotation + 'rad)';
            img_icon.style['transform']         = 'rotate(' + hotspotDescriptor.rotation + 'rad)';

            // Create tooltip element.
            let div_tooltip = DOMSugar.div(hotspotDescriptor.label, null, "text-box");

            // Event Handlers
            div_wrapper.addEventListener('click', function () {
                if (hotspotDescriptor.href && typeof(hotspotDescriptor.href) === "string")
                    window.location.href = hotspotDescriptor.href;
                else if (hotspotDescriptor.javascript && typeof(hotspotDescriptor.javascript) === "string")
                    eval(hotspotDescriptor.javascript);
            });
            div_wrapper.addEventListener("mouseover", function () {
                $(div_tooltip).fadeIn();
            });
            div_wrapper.addEventListener("mouseleave", function () {
                $(div_tooltip).fadeOut();
            });

            // Assemble
            div_wrapper.appendChild(img_icon);
            div_wrapper.appendChild(div_tooltip);

            // Register with Marzipano
            self.marzipanoScene.hotspotContainer().createHotspot(
                div_wrapper,
                {yaw: hotspotDescriptor.yaw, pitch: hotspotDescriptor.pitch});
        });
    }

    expressTeleportHotspots() {
        const self = this;

        this.descriptor.teleportHotspots = this.descriptor.teleportHotspots ? this.descriptor.teleportHotspots : [];
        this.descriptor.teleportHotspots.forEach(function (hotspot) {

            // Create wrapper element to hold icon and tooltip.
            let div_wrapper = DOMSugar.div(null, null, "link-hotspot");

            // Create image element.
            let img_icon                        = DOMSugar.img('./images/UI/teleport.png', null, 'link-hotspot-icon');
            img_icon.style['-ms-transform']     = 'rotate(' + hotspot.rotation + 'rad)';
            img_icon.style['-webkit-transform'] = 'rotate(' + hotspot.rotation + 'rad)';
            img_icon.style['transform']         = 'rotate(' + hotspot.rotation + 'rad)';

            // Create tooltip element.
            let div_tooltip = DOMSugar.div(
                hotspot.label ? hotspot.label : app.world.getSceneDescriptor(hotspot.target).name,
                null, "text-box");

            // Event Handlers
            div_wrapper.addEventListener('click', function () {
                app.world.showScene(hotspot.target);
            });
            div_wrapper.addEventListener("mouseover", function () {
                $(div_tooltip).fadeIn();
            });
            div_wrapper.addEventListener("mouseleave", function () {
                $(div_tooltip).fadeOut();
            });

            // Assemble
            div_wrapper.appendChild(img_icon);
            div_wrapper.appendChild(div_tooltip);

            // Register with Marzipano
            self.marzipanoScene.hotspotContainer().createHotspot(
                div_wrapper,
                {yaw: hotspot.yaw, pitch: hotspot.pitch});
        });
    }

    findLayerAtCoordinates (screenX, screenY) {
        let result = {x: 0, y: 0};
        this.view.screenToCoordinates({x: screenX, y: screenY}, result);

        // Enable to allow label
        // console.log(result);

        for (let key in this.objectLayers) {
            if (this.objectLayers[key].testImageHit(result.yaw, result.pitch)) {
                return this.objectLayers[key];
            }
        }

        return null;
    }

    loadLayersAsync() {
        let self     = this;
        let promises = [];
        let objects  = this.descriptor.objects || [];
        let objectMap = app.world.descriptor.objects;

        objects.forEach((objectId) => {
            let object = objectMap[objectId];
            if (object === null || object === undefined)
                throw "Scene cannot load - object " + objectId + " does not exist";

            let layer = new ObjectLayer(self, object);
            object.layer = layer;
            self.objectLayers[object.label] = layer;
            promises.push(layer.loadAsync());
        });

        return Promise.all(promises);
    }

    hideAllLayers() {
        for (let key in this.objectLayers) {
            this.objectLayers[key].makeInvisible();
        }
        this.refreshLayers();
    }

    refreshLayers() {
        this.cleanUp();
        for (let key in this.objectLayers) {
            if (this.objectLayers[key].isVisible()) {
                app.world.viewer.stage().addLayer(this.objectLayers[key].layer);
            }
        }
    }

    showAllLayers() {
        for (let key in this.objectLayers) {
            this.objectLayers[key].makeVisible();
        }
        this.refreshLayers();
    }

    show() {
        this.marzipanoScene.switchTo({transitionDuration: 1}, () => {});
        this.refreshLayers();
    }
}