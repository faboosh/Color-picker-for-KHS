

export class Dialog {
    constructor(type, filters) {
        this.type = type;
        this.filters = filters;
    }

    open() {
        if (this.type == 'openDirectory') {
            return new Promise(async resolve => {
                let path = await window.dialog.showOpenDialog({
                    properties: ['openDirectory'],
                    filters: this.filters
                });

                if (path.filePaths) {
                    resolve(path.filePaths[0]);
                } else {
                    resolve(false);
                }
            })
        }

        if (this.type == "saveFile") {
            return new Promise(async resolve => {
                let path = await window.dialog.showSaveDialog({
                    filters: this.filters
                });

                if (path.filePath) {
                    resolve(path.filePath);
                } else {
                    resolve(false);
                }
            })
        }

        if (this.type = "openFile") {
            return new Promise(async (resolve, reject) => {
                let res = await window.dialog.showOpenDialog({
                    properties: ['openFile'],
                    filters: this.filters
                });

                let path = res.filePaths[0];

                if (window.fs.existsSync(path)) {
                    resolve(path);
                } else {
                    resolve(false);
                }
            });
        }
    }

}