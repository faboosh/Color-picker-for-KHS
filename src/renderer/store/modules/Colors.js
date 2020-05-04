import { unlinkObservers } from '../../helpers/unlinkObservers';
import { getDefaultColors } from '../../helpers/getDefaultColors';

const state = {
  default: unlinkObservers(getDefaultColors()),
  current: unlinkObservers(getDefaultColors())
}

const mutations = {
  setColor(state, modify) {
    let color = state.current[state.current.findIndex(color => color.label == modify.label)];
    if (color) {
      color.value = modify.value;
      color.default = modify.value;
    }
  },
  resetColors(state) {
    state.current = unlinkObservers(state.default);
  },
  lockColor(state, payload) {
    let color = state.current[state.current.findIndex(color => color.label == payload.label)];
    if (color) {
      color.locked = !color.locked;
    }
  },
  commitColors(state, colors) {
    state.current = colors;
  }
}

const actions = {
  setColor({ commit }, payload) {
    commit('setColor', payload);
  },
  resetColors({ commit }) {
    commit('resetColors');
  },
  setColorLock({ commit }, payload) {
    commit('lockColor', payload)
  },
  commitColors({ commit }, colors) {
    commit('commitColors', colors)
  }
}

const getters = {
  getColors(state) {
    return state.current;
  },
  getColorByLabel: (state) => (label) => {
    let color = state.current[state.current.findIndex(color => color.label == label)];
    return color;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
