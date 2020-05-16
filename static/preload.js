

if (!process.env.IS_WEB) {
    window.fs = require('fs');
    window.dialog = require('electron').remote.dialog;
    window.browserWindow = require("electron").remote.BrowserWindow;
}