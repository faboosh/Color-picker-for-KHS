import { surfacecurve } from "../assets/surfacecurve-color";
import { matMul } from "./math";

function getRGB(color) {
    return {
        r: surfacecurve(color).red() / 255,
        g: surfacecurve(color).green() / 255,
        b: surfacecurve(color).blue() / 255,
        a: surfacecurve(color).alpha(),
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
    base = getRGB(base)
    tint = getRGB(tint)
    back = getRGB(back)

    const baseMatrix = [
        [base.r],
        [base.g],
        [base.b],
        [base.a],
        [1]
    ]

    let scale = 2.12;
    let floats = [
        0.1063,
        0.3576,
        0.0361,
    ].map(number => number * scale)

    const inactiveMatrix = [
        [floats[0] * tint.r, floats[1] * tint.r, floats[2] * tint.r, back.r * 0.5, 0],
        [floats[0] * tint.g, floats[1] * tint.g, floats[2] * tint.g, back.g * 0.5, 0],
        [floats[0] * tint.b, floats[1] * tint.b, floats[2] * tint.b, back.b * 0.5, 0],
        [0, 0, 0, 1, 0],
    ]

    let [r, g, b, a] = matMul(inactiveMatrix, baseMatrix);

    return `rgba(${r * 255}, ${g * 255}, ${b * 255}, ${a})`;
}