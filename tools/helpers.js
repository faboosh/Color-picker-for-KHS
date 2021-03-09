const color = require('surfacecurve-color')

function findStyles(svg) {
    return svg.match(/style="[^"]*"/gm)
}

function parseStyles(styles) {
    return styles.map(style => {
        return {
            replace(source, content) {
                return source.replace(new RegExp(style, 'gm'), content)
            },
            pattern: style,
            styles: parseStyle(style)
        }
    })
}

function parseStyle(style) {
    const parsed = {}

    style
        .replace('style="', "")
        .slice(0, -1)
        .split(';')
        .forEach(prop => {
            const [ key, val ] = prop.split(/:(.+)/)

            if(key && val) parsed[cssToJs(key)] = rgbToHex(val)
        })

    return parsed
}

function rgbToHex(val) {
    if(/rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/.test(val)) {
        return color(val).hex6()
    } else {
        return val
    }
}

function cssToJs(str) {
    return str.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
}


module.exports = {
    findStyles,
    parseStyles
}