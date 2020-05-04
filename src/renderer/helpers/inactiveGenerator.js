import { surfacecurve } from "../assets/surfacecurve-color";

export const getInactive = (base, inactive) => {
    base = surfacecurve(base).saturation(0).hex6();
    base = surfacecurve(base).blend('black', 0.2).blend(inactive, 0.2).hex6();
    return base;
}