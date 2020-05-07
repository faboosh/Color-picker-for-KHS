import { surfacecurve } from "../assets/surfacecurve-color";

export const getInactive = (base, inactive) => {
    base = surfacecurve(base).saturation(0).hex6();
    base = surfacecurve(inactive).multiply(base).blend("white", 0.1).hex6();
    return base;
}