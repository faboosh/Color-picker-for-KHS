
const fs = require('fs');
const JSZip = require('jszip');

async function exportZip(config, images, path) {
    let zip = new JSZip();
    zip.file("colors.conf", config);
    let imageBuffers = [];

    console.log(images);
    Object.keys(images).forEach(async name => {
        if (typeof images[name].writePngToPath == "function") {
            imageBuffers.push(images[name].getPngBase64(name));
        }
    })

    await Promise.all(imageBuffers).then(images => {
        images.forEach(image => {
            zip.file(`${image.name}.png`, image.base64Image, { base64: true });
        })
    })

    const zipBuffer = await zip.generateAsync({ type: "uint8array" });

    fs.writeFileSync(path, Buffer.from(zipBuffer));
}

export { exportZip };
