const AdmZip = require('adm-zip');
import { formatConfig } from "./formatConfig";
import { KHSImage } from "../classes/image";

async function importZip(path) {
    return new Promise(async resolve => {
        let zip = new AdmZip(path);
        let entries = zip.getEntries();

        if (!entries.some(entry => entry.entryName == "colors.conf")) {
            resolve(false)
        }
        let data = {
            colors: {},
            config: {},
            images: {
                Phase_Plant: {},
                Multipass: {},
                Snap_Heap: {}
            }
        }

        entries.forEach(zipEntry => {
            if (zipEntry.entryName == "colors.conf") {
                data.colors = formatConfig(zipEntry.getData().toString('utf8'));
                data.config = JSON.parse(zipEntry.getData().toString('utf8'));
            }
        });

        entries.forEach(zipEntry => {
            if (/\.(jpe?g|png)$/i.test(zipEntry.entryName)) {
                let name = zipEntry.entryName.replace(/\.(jpe?g|png)$/i, "");
                if (data.images[name]) {
                    let base64Image = new Buffer(zipEntry.getData(), 'binary').toString('base64');
                    let extension = zipEntry.entryName.match(/\.[0-9a-z]+$/i)[0];
                    let urlBase = `data:image/${extension.split('.').pop()};base64,`;
                    let imageData = { urlBase, extension, base64Image };
                    let alpha = data.config[`${name.toLowerCase()}_backdrop_alpha`];
                    data.images[name] = new KHSImage(null, alpha, imageData);
                }
            }
        });

        resolve(data);
    })
}

export { importZip };
