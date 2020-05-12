

if (!process.env.IS_WEB) {
    window.fs = require('fs');
    window.AdmZip = require('adm-zip');
    window.dialog = require('electron').remote.dialog;
    window.browserWindow = require("electron").remote.BrowserWindow;
}