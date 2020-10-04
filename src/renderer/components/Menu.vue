<template>
  <div class="colors-wrapper" :class="{ hide: collapsed }">
    <div class="toggle">
      <div
        class="item"
        :class="{ active: show == 'single' }"
        @click="show = 'single'"
      >
        <span>Single Color</span>
      </div>
      <div
        class="item"
        :class="{ active: show == 'global' }"
        @click="show = 'global'"
      >
        <span>Global Color</span>
      </div>
      <div
        class="item"
        :class="{ active: show == 'image' }"
        @click="show = 'image'"
      >
        <span>Images</span>
      </div>
    </div>
    <Colors :class="{ hide: show != 'single' }" />
    <GlobalControls
      class="global-controls"
      :class="{ hide: show != 'global' }"
    />
    <Images :class="{ hide: show != 'image' }" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GlobalControls from "./GlobalControls";
import Colors from "./Colors";
import Images from "./Images";

export default {
  data() {
    return {
      collapsed: false,
      show: "single",
    };
  },
  components: {
    Colors,
    GlobalControls,
    Images,
  },
  methods: {
    ...mapActions([]),
    changeColor(e) {
      console.log(e);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/global.scss";

.global-controls {
  border-radius: 0 0 5px 5px;
}

.colors-wrapper {
  width: 100%;
  padding: $padding-unit;
  box-sizing: border-box;
  background: $gray-5;
  border-radius: $border-radius;
  box-shadow: $component-boxshadow;
  max-height: $sidebar-height;
}

.toggle {
  cursor: pointer;
  user-select: none;
}

.disabled {
  color: #707070 !important;
}

.hide {
  display: none;
}

.toggle {
  display: flex;
  background: $gray-4;
  grid-row: 1;

  .item {
    background: $gray-3;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $border-radius;
    width: 50%;
    padding: 5px;

    span {
      color: $gray-6;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.active {
      background: $gray-4;

      span {
        color: $text-khs-white;
      }
    }
  }
}
</style>
