const sharp = require('sharp');

export const convertToPng = (buffer) => {
    return new Promise((resolve) => {
        let imgBuffer = Buffer.from(buffer, 'base64');
        sharp(imgBuffer)
            .png()
            .resize({ width: 1920 })
            .toBuffer()
            .then(pngBuffer => {
                resolve(pngBuffer)
            })
            .catch(err => {
                throw err;
            })
    })
}