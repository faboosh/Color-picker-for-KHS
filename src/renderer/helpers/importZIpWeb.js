const JSZip = require("jszip");
import { formatConfig } from "./formatConfig";
import { KHSImage } from "../classes/image";

export const importZipWeb = result => {
    return new Promise(resolve => {
        const zip = new JSZip();
        zip.loadAsync(result).then(function (zip) {
            const { files } = zip;
            let imported = {
                config: "",
                images: {
                    Phase_Plant: {},
                    Multipass: {},
                    Snap_Heap: {}
                }
            };

            let promises = [];

            Object.keys(files).forEach(async key => {
                const name = files[key].name.replace(/\.[0-9a-z]+$/i, "");
                const extension = files[key].name.match(/\.[0-9a-z]+$/i)[0];

                if (extension == ".conf") {
                    promises.push(new Promise(async resolve => {
                        const data = await zip.file(name + extension).async("string");

                        imported.config = formatConfig(data);

                        resolve(true);
                    }))

                } else if (extension == ".png") {
                    promises.push(new Promise(async resolve => {
                        const data = await zip
                            .file(name + extension)
                            .async("Uint8Array");

                        const base64Image = new Buffer(data, "binary").toString(
                            "base64"
                        );

                        const urlBase = `data:image/${extension
                            .split(".")
                            .pop()};base64,`;

                        const imageData = { urlBase, extension, base64Image };

                        imported.images[name] = new KHSImage(null, 1, imageData);

                        resolve(true);
                    }))
                }
            });

            Promise.all(promises).then(() => {
                resolve(imported)
            })
        });
    })
}
