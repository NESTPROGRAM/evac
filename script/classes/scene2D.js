class Scene2D {
    constructor(descriptor) {
        this._descriptor = descriptor;
        this._objectLayers = [];

        this._canvas = document.createElement('canvas');
        this._tooltip = DOMSugar.div("", "", "tooltip");
        this._img_base = null;
    }

    get id()        { return this._descriptor.id; }
    get canvas()    { return this._canvas; }

    loadAsync() {
        let self = this;

        return Promise.resolve()

            // Load base image
            .then(() => {
                return new Promise((resolve, reject) => {

                    console.log(this._descriptor);

                    // Prepare canvas
                    this._img_base         = DOMSugar.img(this._descriptor.baseImage);
                    this._img_base.onload  = () => { resolve(); };
                    this._img_base.onerror = () => { reject(); };
                });
            })

            // Handle image load failure
            .catch(() => {
                console.error("Scene2D - Unable to load base image: " + this._img_base.src);
            })

            // Create canvas
            .then(() => {
                this._canvas.width  = this._descriptor.width;
                this._canvas.height = this._descriptor.height;
                this._canvas.getContext('2d').drawImage(this._img_base, 0, 0, this._img_base.width, this._img_base.height);
            })

            // Load objects
            .then(() => {
                let promises = [];

                _.forEach(this._descriptor.objects, (objectId) => {
                    let object   = app.getObject2D(objectId);
                    let layer    = new ObjectLayer2D(self, object);
                    object.layer = layer;

                    this._objectLayers.push(layer);
                    promises.push(layer.loadAsync());
                });

                return Promise.all(promises);
            })

            // Express objects to canvas
            .then(() => {
                _.forEach(this._objectLayers, (layer) => {
                    layer.expressToCanvas(this._canvas);
                });
            })

            // Register mouse events on canvas
            .then(() => {
                this._canvas.onclick = (e) => {
                    let layer = this.findObjectLayerAtCoordinates(e.offsetX, e.offsetY);
                    if (layer !== null && layer !== undefined) {
                        ApplicationController.objectSelectedInScene2D(this, layer);
                        this.hideTooltip();
                    }
                };

                this._canvas.onmousemove = (e) => {
                    let layer = this.findObjectLayerAtCoordinates(e.offsetX, e.offsetY);
                    if (layer !== null && layer !== undefined)
                        this.showTooltip(layer.descriptor.label, e.offsetX, e.offsetY);
                    else
                        this.hideTooltip();
                };

                this._canvas.onmouseleave = (e) => {
                    this.hideTooltip();
                }
            })
    }

    express(parent) {
        // Create base container with loading message
        let container = DOMSugar.div("","", "scene2D");
        container.style.width = this._descriptor.width;
        container.style.height = this._descriptor.height;

        $(this._tooltip).hide();

        container.appendChild(this._canvas);
        container.appendChild(this._tooltip);

        parent.appendChild(container);
    }

    findObjectLayerAtCoordinates(x, y) {
        for (let i = this._objectLayers.length - 1 ; i >= 0 ; i --) {
            if (this._objectLayers[i].testForHit(x, y))
                return this._objectLayers[i];
        }
    }

    showTooltip(text, x, y) {
        this._tooltip.innerHTML = text;
        this._tooltip.style.left = (x + 50) + "px";
        this._tooltip.style.top = (y + 30) + "px";
        $(this._tooltip).show();
    }

    hideTooltip() {
        this._tooltip.innerHTML = "";
        $(this._tooltip).hide();
    }


    refresh() {
        this._canvas.getContext('2d').clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._canvas.getContext('2d').drawImage(this._img_base, 0, 0, this._img_base.width, this._img_base.height);
        _.forEach(this._objectLayers, (layer) => {
            layer.expressToCanvas(this._canvas);
        });
    }
}