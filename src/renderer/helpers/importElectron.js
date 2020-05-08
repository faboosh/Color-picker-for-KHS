export const importConfig = (path) => {
    const colors = window.fs.readFileSync(`${path}/colors.conf`, { encoding: 'utf8', flag: 'r' });
    return colors;
}