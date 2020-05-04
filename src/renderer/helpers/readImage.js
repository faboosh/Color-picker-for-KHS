const fs = require('fs');


export const readImage = (path) => {
    return new Promise(resolve => {
        if (fs.existsSync(path)) {
            let file = fs.readFileSync(path);
            let base64Image = new Buffer(file, 'binary').toString('base64');
            let extension = path.match(/\.[0-9a-z]+$/i)[0];
            let urlBase = `data:image/${extension.split('.').pop()};base64,`;
            resolve({ urlBase, extension, base64Image });
        } else {
            resolve(false);
        }
    })
}