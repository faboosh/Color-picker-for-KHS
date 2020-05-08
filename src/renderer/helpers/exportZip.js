import { saveAs } from 'file-saver';
const JSZip = require('jszip');

async function exportZip(config, images, path, isWeb) {
    let zip = new JSZip();
    zip.file("colors.conf", config);
    let imageBuffers = [];

    console.log(images);

    Object.keys(images).forEach(async name => {
        if (typeof images[name].rendered != "undefined") {
            imageBuffers.push({ name, image: images[name].rendered.base64Image });
        }
    })

    await Promise.all(imageBuffers).then(images => {
        images.forEach(({ name, image }) => {
            zip.file(`${name}.png`, image, { base64: true });
        })
    })

    if (!isWeb) {
        const zipBuffer = await zip.generateAsync({ type: "uint8array" });
        window.fs.writeFileSync(path, Buffer.from(zipBuffer));
    } else {
        zip.generateAsync({ type: "blob" })
            .then((blob) => {
                saveAs(blob, "skin.zip");
            });
    }
}

export { exportZip };
