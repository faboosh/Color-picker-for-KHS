export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
    }

    render(source, { w, h, scale, x, y, alpha, aspect, hue, saturation }) {
        return new Promise(resolve => {
            h = (w / aspect.w) * aspect.h;
            this.canvas.width = w;
            this.canvas.height = h;
            let ctx = this.canvas.getContext("2d");
            let selected = new Image();
            selected.src = source;

            selected.onload = () => {
                ctx.clearRect(0, 0, w, h);
                ctx.globalAlpha = alpha;

                ctx.scale(scale, scale);

                ctx.filter = `hue-rotate(${hue}deg) saturate(${saturation}%)`;

                ctx.drawImage(
                    selected,
                    this.canvas.width / scale / 2 - selected.width / 2 + x / scale,
                    this.canvas.height / scale / 2 - selected.height / 2 + y / scale
                );

                ctx.setTransform(1, 0, 0, 1, 0, 0);

                let dataUrl = this.canvas.toDataURL();

                let image = {
                    urlBase: "data:image/png;base64,",
                    base64Image: dataUrl.replace("data:image/png;base64,", "")
                };

                resolve(image);
            }
        })

    }
}