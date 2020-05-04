import { surfacecurve } from "../../assets/surfacecurve-color";

const state = {
  controls: [
    {
      title: "Hue",
      type: "slider",
      value: "-360",
      max: -1,
      min: -360,
      default: "-360",
      id: 1
    },
    {
      title: "Saturation",
      type: "slider",
      value: 0,
      max: 100,
      min: -100,
      default: 0,
      id: 2
    },
    {
      title: "Tint Color",
      type: 'color',
      value: "#000000",
      default: "#000000",
      id: 3
    },
    {
      title: "Tint Amount",
      type: "slider",
      value: 0,
      max: 100,
      min: 0,
      default: 0,
      id: 4
    }
  ]
}

const mutations = {
  setControl(state, modify) {
    let param = state.controls[state.controls.findIndex(control => control.title == modify.param)];
    if (param) {
      param.value = modify.value;
    }
  },
  resetControls(state) {
    state.controls.forEach(control => {
      control.value = control.default;
    })
  }
}

const actions = {
  setControl({ commit }, payload) {
    commit('setControl', payload);
  },
  resetControls({ commit }) {
    commit('resetControls');
  }
}

const getters = {
  getComputedColor: (state) => (color, hexOnly) => {
    color = JSON.parse(JSON.stringify(color));
    const control = param => {
      return state.controls[state.controls.findIndex(control => control.title == param)].value;
    }

    if (!color.locked) {
      //
      color.value = color.default;

      //Apply Hue Shift
      color.value = surfacecurve(color.value).hue(control("Hue")).hex6()

      //Apply Saturation
      let initial = surfacecurve(color.default);
      let appliedSat = Number(initial.saturation()) + Number(control("Saturation"));
      color.value = surfacecurve(color.value).saturation(appliedSat).hex6();

      //Apply tint
      color.value = surfacecurve(color.value).blend(control("Tint Color"), control("Tint Amount") / 100).hex6();

    }

    if (hexOnly) {
      return color.value;
    } else {
      return color;
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
