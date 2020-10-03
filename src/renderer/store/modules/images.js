import { unlinkObservers } from "../../helpers/unlinkObservers";

let baseSettings = {
    scale: 1,
    hue: 0,
    saturation: 100,
    x: 0,
    y: 0,
    alpha: 1,
    w: 1920,
    h: 1920,
    aspect: {
        w: 2,
        h: 3
    }
};

const state = {
    images: {
        Phase_Plant: {},
        Multipass: {},
        Snap_Heap: {}
    },
    settings: {
        Phase_Plant: unlinkObservers(baseSettings),
        Multipass: unlinkObservers(baseSettings),
        Snap_Heap: unlinkObservers(baseSettings),
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
    },
    setProcessing(state, { target, settings }) {
        if (typeof state.settings[target] !== "undefined") {
            state.settings[target] = settings;
        }
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
    },
    setProcessing({ commit }, payload) {
        console.log(payload)
        commit('setProcessing', payload)
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
    },
    getProcessingSettings: (state) => (name) => {
        return state.settings[name] || null;
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}
