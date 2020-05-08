import { readImage } from "../helpers/readImage";

export class KHSImage {
    constructor(path, alpha, image) {
        this.path = path || null;
        this.alpha = alpha || 0;
        this.image = image || {};
        this.rendered = {};
    }

    async loadImage() {
        this.image = await readImage(this.path);
    }

    setImage(image) {
        this.image = image;
    }

    getDataUrl() {
        if (this.image) {
            return this.image.urlBase + this.image.base64Image;
        } else {
            return "";
        }
    }

    getRenderedDataUrl() {
        if (this.rendered) {
            return this.rendered.urlBase + this.rendered.base64Image;
        } else {
            return "";
        }
    }

    getAlpha() {
        return this.alpha;
    }

    setAlpha(newAlpha) {
        this.alpha = newAlpha;
    }

    async writePngToPath(path, name) {
        let buffer = this.rendered.base64Image;
        if (buffer) {
            window.fs.writeFile(`${path}/${name}.png`, buffer, 'base64', (err, res) => {
                if (err) throw err;
            })
        }
    }
}