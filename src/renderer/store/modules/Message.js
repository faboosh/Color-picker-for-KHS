

const state = {
  message: ""
}

const mutations = {
  setMessage(state, message) {
    state.message = message;
  }
}

const actions = {
  setMessage({ commit }, message) {
    commit('setMessage', message)
  }
}

const getters = {
  getMessage(state) {
    return state.message;
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
