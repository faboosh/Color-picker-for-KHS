export class WebDialog {
    constructor({ type, extensions }) {
        this.extensions = extensions;
        this.type = type;
    }

    open() {
        return new Promise(resolve => {
            let fileElem = document.createElement('input');

            fileElem.setAttribute('type', 'file');

            fileElem.setAttribute('accept', this.extensions.join(','));

            fileElem.click();

            fileElem.onchange = () => {
                if (fileElem.files.length) {
                    const path = fileElem.files[0];
                    const reader = new FileReader();

                    reader.readAsArrayBuffer(path);

                    reader.onloadend = (e) => {
                        resolve({ meta: path, buffer: e.target.result });
                    }

                } else {
                    resolve(false);
                }
            };
        })
    }
}