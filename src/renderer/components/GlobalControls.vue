<template>
  <div class="controls" :class="{ hide: collapsed }">
    <div class="inner">
      <GlobalControl
        v-for="(control, i) in controls"
        :key="i"
        :control="control"
        class="mb-3"
        @modify="setControl"
      ></GlobalControl>
      <button
        class="btn btn-danger"
        :class="{ hide: collapsed }"
        @click="commitToPalette"
      >
        Commit to palette
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import GlobalControl from "./GlobalControl";

import { unlinkObservers } from "../helpers/unlinkObservers";

export default {
  props: ["collapsed"],
  computed: {
    ...mapState({
      controls: (state) => state.GlobalControls.controls,
    }),
  },
  components: {
    GlobalControl,
  },
  methods: {
    ...mapActions(["setControl", "resetControls", "commitColors"]),
    ...mapGetters(["getComputedColor", "getColors"]),
    commitToPalette: function () {
      let colors = unlinkObservers(this.getColors());
      colors = colors.map((color) => {
        color = this.getComputedColor()(color, false);
        color.default = color.value;
        return color;
      });
      this.commitColors(colors);
      this.resetControls();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/global.scss";

.controls {
  z-index: 10000;
  background: $gray-4;
  padding: 15px;
  border-radius: $border-radius;
}

.toggle {
  cursor: pointer;
  user-select: none;
}

.disabled {
  color: #707070 !important;
}

.top {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.inner {
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;

  .btn {
    width: 100%;
  }
}

.hide {
  display: none;
}
</style>
