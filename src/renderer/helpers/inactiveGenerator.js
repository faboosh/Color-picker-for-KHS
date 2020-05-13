import { surfacecurve } from "../assets/surfacecurve-color";

function getRGB(color) {
    return {
        r: surfacecurve(color).red() / 255,
        g: surfacecurve(color).green() / 255,
        b: surfacecurve(color).blue() / 255
    }
}

// Using alpha as color offset is weird, but changing it makes some places look worse, e.g. disabled snapins
/*
0.1063f * tintR, 0.3576f * tintR, 0.0361f * tintR, backR * 0.5f, 0.0f,
0.1063f * tintG, 0.3576f * tintG, 0.0361f * tintG, backG * 0.5f, 0.0f,
0.1063f * tintB, 0.3576f * tintB, 0.0361f * tintB, backB * 0.5f, 0.0f,
0.0000f, 0.0000f, 0.0000f, 1.0000f, 0.0f
*/

export const getInactive = (base, tint, back) => {
    const hex = {
        base,
        tint,
        back
    }

    base = getRGB(base)
    tint = getRGB(tint)
    back = getRGB(back)

    /*
    const computed = {
        r:
            base.r * inactive.r * 0.1063 +
            base.g * inactive.g * 0.1063 +
            base.b * inactive.b * 0.1063,
        g:
            base.r * inactive.r * 0.3576 +
            base.g * inactive.g * 0.3576 +
            base.b * inactive.b * 0.3576,
        b:
            base.r * inactive.r * 0.0361 +
            base.g * inactive.g * 0.0361 +
            base.b * inactive.b * 0.0361,
        a:
            1 * (mainBackground.r * 0.5) +
            1 * (mainBackground.g * 0.5) +
            1 * (mainBackground.b * 0.5)
    }
    */


    const computed = {
        r:
            base.r * tint.r +
            base.g * tint.r +
            base.b * tint.r,
        g:
            base.r * tint.g +
            base.g * tint.g +
            base.b * tint.g,
        b:
            base.r * tint.b +
            base.g * tint.b +
            base.b * tint.b,
        a:
            1 * (back.r * 0.5) +
            1 * (back.g * 0.5) +
            1 * (back.b * 0.5)
    }

    const rgb =
        `rgb(
            ${Math.floor(computed.r * 255)}, 
            ${Math.floor(computed.g * 255)}, 
            ${Math.floor(computed.b * 255)}
        )`


    /*const color =
        surfacecurve(base)
            .blend(inactive, 0.3)
            .blend(mainBackground, 0.5)
            .hex6();

    console.log();

    //console.log(base, inactive, mainBackground);
    /*base = surfacecurve(base).saturation(0).hex6();
    base = surfacecurve(base).blend(inactive, 0.5).blend(mainBackground, 0.6).hex6();*/
    const color = surfacecurve(rgb).blend(hex.back, 0.7).hex6();
    return color;
}