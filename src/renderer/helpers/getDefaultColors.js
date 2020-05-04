import { formatConfig } from "./formatConfig";

function getDefaultColors() {
  let colors = `{
        "window_background": "1e222a",
        "main_background": "454341",
        "panel_background": "333130",
        "control_background": "282625",
        "foreground": "898989",
        "text": "ACACAC",
        "unimportant_text": "797876",
        "passive": "6A6968",
        "active": "6A9DEA",
        "modulation": "FF8020",
        "audio_rate_modulation": "71C742",
        "aux_modulation": "DCC959",
        "alert": "BF312E",
        "encoder": "5C5B5B",
        "handle": "CACACA",
        "mute": "AB211E",
        "solo": "2F861A",
        "left": "61b264",
        "right": "b460ae",
        "mid": "437ddd",
        "side": "d79e4f",
        "selection_background": "3c4a60",
        "selection_foreground": "eeeeee",
        "disabled_tint": "888888",
        "knob": "333130",
        "modulation_background": "000000",
        "grid_major": "434140",
        "grid_minor": "353332"
      }
      `


  return formatConfig(colors);
}

export { getDefaultColors }

