const fs = require('fs');

export const importConfig = (path) => {
    const colors = fs.readFileSync(`${path}/colors.conf`, { encoding: 'utf8', flag: 'r' });
    return colors;
}