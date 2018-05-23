/**
 * Created by xorgnz on 4/8/2017.
 */
class ObjectLayer2D {
    constructor(scene2D, descriptor) {
        this._scene2D    = scene2D;
        this._descriptor = descriptor;
        this._visible    = true;
        this._img = null;
        this._internalCanvas = document.createElement('canvas');
    }

    get descriptor()            { return this._descriptor; }
    get scene2D()               { return this._scene2D; }

    loadAsync() {
        let self = this;

        // Load image
        return new Promise((resolve, reject) =>
        {
            self._img     = DOMSugar.img(self._descriptor.imageFile);
            self._img.onload  = () => { resolve(); };
            self._img.onerror = () => { reject(); };
        })

        // Handle load failure
        .catch((err) => {
            console.log(err);
            console.error("Scene2D - Unable to load object image: " + self._img.src);
        })

        // Ensure that image size matches that of scene containing
        .then (() => {
            if (self._scene2D.canvas.width !== self._img.width || self._scene2D.canvas.height !== self._img.height)
                throw "Cannot display 2D object " + self._descriptor.name + " - width or height do not match base";
        })

        // Create internal canvas for use in detecting hits
        .then(() => {
            self._internalCanvas.width = self._img.width;
            self._internalCanvas.height = self._img.height;
            self._internalCanvas.getContext('2d').drawImage(self._img, 0, 0, self._img.width, self._img.height);
        });
    }

    expressToCanvas(canvas) {
        // Draw object to canvas
        if (this._visible)
            canvas.getContext('2d').drawImage(this._img, 0, 0, this._img.width, this._img.height);
    }

    testForHit(x, y) {
        if (this._visible) {
            let imgData = this._internalCanvas.getContext('2d').getImageData(x, y, 1, 1);
            for (let i = 0; i < imgData.data.length; i++) {
                 if (imgData.data[i] > 0)
                     return true;
            }
        }

        return false;
    }

    // Visibility
    isVisible() {
        return this._visible;
    }

    makeInvisible() {
        this._visible = false;
    }

    makeVisible () {
        this._visible = true;
    }
}