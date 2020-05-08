export const isWeb = () => {
    var userAgent = navigator.userAgent.toLowerCase();
    return !(userAgent.indexOf(' electron/') > -1);
}