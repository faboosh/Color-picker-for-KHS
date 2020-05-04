const { dialog } = require('electron').remote;

export const openFileDialog = (filters) => {
    return new Promise(async resolve => {
        let path = await dialog.showOpenDialog({
            filters
        });

        console.log(path)
        if (path.filePaths[0]) {
            resolve(path.filePaths[0]);
        } else {
            resolve(false);
        }

    })
}