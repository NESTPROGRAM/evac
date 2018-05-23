/**
 * Created by xorgnz on 4/8/2017.
 */
class ObjectLayer {
    constructor(scene, descriptor) {
        this.scene      = scene;
        this.descriptor = descriptor;
        this.visible    = true;
    }

    loadAsync() {
        let self = this;

        return new Promise((resolve) => {
            Promise.resolve()
                .then(() => { return World.loadFileToCanvas(self.descriptor.filename); })
                .then((canvas) => {
                    self.canvas = canvas;

                    // Create layer
                    let asset        = new Marzipano.DynamicCanvasAsset(canvas);
                    let source       = new Marzipano.SingleAssetSource(asset);
                    let geometry     = new Marzipano.EquirectGeometry([{width: canvas.width}]);
                    let textureStore = new Marzipano.TextureStore(geometry, source, app.world.viewer.stage());
                    self.layer       = new Marzipano.Layer(
                        app.world.viewer.stage(), source, geometry, this.scene.view, textureStore);
                    self.layer.label = self.descriptor.label;

                    // Create wrapper element to hold icon and tooltip.
                    self.div_tooltip = DOMSugar.div(self.descriptor.label, null, "text-box");
                    let div_wrapper = DOMSugar.div(self.div_tooltip, null, 'invisible-hotspot');

                    // Register with Marzipano
                    self.hotspot = this.scene.marzipanoScene.hotspotContainer().createHotspot(
                        div_wrapper,
                        {yaw: self.descriptor.yaw, pitch: self.descriptor.pitch});

                    textureStore.addEventListener("textureLoad", () => {
                        console.log("Loaded layer for Object " + self.descriptor.label);
                        resolve(self.descriptor.label);
                    });

                    app.world.viewer.stage().addLayer(self.layer);
                });
        })
    }

    testImageHit(yaw, pitch) {
        let x = ((yaw / (2 * Math.PI)) + 0.5) * this.canvas.width;
        let y = ((pitch / Math.PI) + 0.5) * this.canvas.height;

        let hit = false;
        if (this.visible) {
            let imgData = this.canvas.getContext('2d').getImageData(Math.round(x), Math.round(y), 1, 1);
            for (let i = 0; i < imgData.data.length; i++) {
                if (imgData.data[i] > 0)
                    hit = true;
            }
        }

        return hit;
    }

    // Visibility

    isVisible() {
        return this.visible;
    }

    makeInvisible() {
        this.visible = false;
        this.hotspot.hide();
    }

    makeVisible () {
        this.visible = true;
        this.hotspot.show();
    }

    // Labels

    hideLabel() {
        $(this.div_tooltip).fadeOut();
    }

    showLabel() {
        $(this.div_tooltip).fadeIn();
    }
}