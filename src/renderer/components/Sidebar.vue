<template>
  <div class="sidebar">
    <div class="item active">
      <font-awesome-icon
        :icon="palette"
        size="2x"
        class="icon"
      ></font-awesome-icon>
    </div>
    <div class="item">
      <font-awesome-icon
        :icon="image"
        size="2x"
        class="icon"
      ></font-awesome-icon>
    </div>
    <div class="view"></div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  data() {
    return {
      palette: fas.faPalette,
      image: fas.faImage,
      views: ["colors", "images"],
    };
  },
  methods: {},
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/global.scss";

.sidebar {
  width: 55px;
  background: $gray-5;
  position: fixed;
  right: 0;
  top: 28px;
  bottom: 0;
  z-index: 100000;

  .item {
    width: 100%;
    padding: 10px 0;
    .icon {
      width: 100%;
      color: white;
    }

    &:hover {
      background: $gray-6;
    }

    &.active {
      background: $gray-4;
    }
  }

  .view {
    position: absolute;
    right: 55px;
    top: 0;
    bottom: 200px;
    background: $gray-5;

    .colorsComp {
      border-radius: 0;
      box-shadow: none;
      top: 0;
      bottom: 0;
      max-height: calc(100vh - 28px);
    }
  }
}
</style>
