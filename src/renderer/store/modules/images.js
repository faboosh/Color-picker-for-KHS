const state = {
    images: {
        Phase_Plant: {},
        Multipass: {},
        Snap_Heap: {}
    }
}

const mutations = {
    setImage(state, { image, target }) {
        if (typeof state.images[target] !== "undefined") {
            state.images[target] = image;
        }
    },
    setRendered(state, { image, target }) {
        if (typeof state.images[target] !== "undefined") {
            state.images[target].rendered = image;
        }
    },
    setAlpha(state, { target, alpha }) {
        if (typeof state.images[target].setAlpha == "function") {
            state.images[target].setAlpha(alpha);
        }
    },
    setImages(state, images) {
        state.images = images;
    }
}

const actions = {
    setImage({ commit }, payload) {
        commit('setImage', payload)
    },
    setRendered({ commit }, payload) {
        commit('setRendered', payload)
    },
    setAlpha({ commit }, payload) {
        commit('setAlpha', payload)
    },
    setImages({ commit }, payload) {
        commit('setImages', payload)
    }
}

const getters = {
    getImage: (state) => (name) => {
        const image = state.images[name];
        if (typeof image.getDataUrl == "function") {
            return image.getDataUrl();
        } else {
            return false;
        }
    },
    getRenderedImage: (state) => (name) => {
        const image = state.images[name];
        if (typeof image.getRenderedDataUrl == "function") {
            return image.getRenderedDataUrl();
        } else {
            return false;
        }
    },
    getImages(state) {
        return state.images;
    },
    getAlpha: (state) => (name) => {
        if (typeof state.images[name].getAlpha == "function") {
            return state.images[name].alpha;
        } else {
            return 0;
        }
    },
    getAllAlpha(state) {
        return {
            Phase_Plant: state.images.Phase_Plant.alpha || 0,
            Multipass: state.images.Multipass.alpha || 0,
            Snap_Heap: state.images.Snap_Heap.alpha || 0
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
