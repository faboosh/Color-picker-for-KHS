
const fs = require('fs');

function exportConfig(config, images, path) {
    fs.writeFile(`${path}/colors.conf`, config, (err) => {
        if (err) throw err;
        return true;
    });

    Object.keys(images).forEach(async name => {
        if (typeof images[name].writePngToPath == "function") {
            images[name].writePngToPath(path, name);
        }
    })
}

export { exportConfig };
