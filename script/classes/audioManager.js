class AudioManager {
    constructor() {
        this._audioElement = document.createElement("audio");
        document.body.appendChild(this._audioElement);
    }

    play(filename) {
        this._audioElement.src = filename;
        this._audioElement.play();
        this._audioElement.loop = false;
    }

    loop(filename) {
        if (! this._audioElement.src.endsWith(filename) || this._audioElement.paused) {
            this._audioElement.src  = filename;
            this._audioElement.loop = true;
            this._audioElement.play();
        }
    }

    stop() {
        this._audioElement.pause();
    }
}