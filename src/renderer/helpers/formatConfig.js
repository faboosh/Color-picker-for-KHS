/**
 * 
 * @param {KHS color config} colors
 */

export const formatConfig = (config) => {
    config = JSON.parse(config);
    const colors = [];

    if (config)
        Object.keys(config).map((key) => {
            if (!/original/.test(key) && !/alpha/.test(key) && !/backdrop/.test(key)) {
                colors.push({
                    label: key,
                    niceLabel: key.replace(/_/g, ' '),
                    value: "#" + config[key].toLowerCase(),
                    default: "#" + config[key].toLowerCase(),
                    locked: false
                });
            }
        });
    return colors;
}