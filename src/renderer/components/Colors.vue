<template>
  <div class="single-color">
    <Picker
      ref="picker"
      width="100%"
      :color="colors[selectedColor].value"
      @colorChange="onColorChange"
    />
    <div class="colors">
      <Color
        v-for="(color, i) in colors"
        :key="i"
        :index="i"
        :color="color"
        @selectColor="onSelectColor"
        :selected="selectedColor"
      ></Color>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { exportConfig } from "../helpers/exportElectron";
import { surfacecurve } from "../assets/surfacecurve-color";

//Components
import Color from "./Color";
import Picker from "./Picker";

export default {
  data() {
    return {
      selectedColor: 0,
    };
  },
  methods: {
    ...mapActions(["resetColors", "setMessage", "resetControls"]),
    ...mapActions(["setColor", "setColorLock"]),
    onSelectColor(i) {
      console.log(i);
      this.selectedColor = i;
      this.$refs.picker.hsv = surfacecurve(
        this.colors[this.selectedColor].value
      ).hsv();
    },
    onColorChange(value) {
      const color = JSON.parse(JSON.stringify(this.colors[this.selectedColor]));
      color.value = value;
      console.log(color);
      this.setColor(color);
    },
  },
  computed: {
    ...mapState({
      colors: (state) => state.Colors.current,
    }),
  },
  components: {
    Color,
    Picker,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/global.scss";

.single-color {
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: calc(
    #{$sidebar-height} - #{$toggle-height} - #{$padding-unit} * 3
  );

  .picker {
    margin-bottom: 5px;
    border-radius: 0 0 5px 5px;
    grid-row: 1;
  }

  .colors {
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    overflow-y: scroll;
    border-radius: $border-radius;
    background: $gray-4;
    padding: $padding-unit;
    padding-bottom: 0;
    grid-row: 2;
  }
}
</style>
