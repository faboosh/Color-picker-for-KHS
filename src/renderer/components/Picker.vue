<template>
  <div class="picker" :style="pickerWidth">
    <div class="preview" :style="previewColor">
      <input
        type="text"
        :style="textColor"
        @input="onHexInput"
        :value="colorData"
      />
    </div>
    <p class="text-khs-white">Hue</p>
    <input
      class="hue"
      :style="hueBackground"
      type="range"
      min="0"
      max="360"
      v-model="hsv[0]"
    />
    <p class="text-khs-white">Saturation</p>
    <input
      class="sat"
      :style="saturationBackground"
      type="range"
      min="0"
      max="100"
      v-model="hsv[1]"
    />
    <p class="text-khs-white">Value</p>
    <input
      class="val"
      :style="valueBackground"
      type="range"
      min="0"
      max="100"
      v-model="hsv[2]"
    />
    <div class="hex"></div>
  </div>
</template>

<script>
import { surfacecurve } from "../assets/surfacecurve-color";

export default {
  props: {
    color: {
      type: String,
      default: "#aa66dd",
    },
    width: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      hsv: surfacecurve(this.color).hsv(),
    };
  },
  computed: {
    hueBackground() {
      let output = `linear-gradient(to right,`;
      for (let i = 0; i < 360; i += 2) {
        output += `hsl(${i}, 100%, 50%)`;
        if (i !== 358) output += ",";
      }
      output += ")";

      return {
        background: output,
      };
    },
    saturationBackground() {
      const [h, s, v] = this.hsv.map((val) => Number(val));
      const start = surfacecurve("hsv", h, 0, v).hex6();
      const end = surfacecurve("hsv", h, 100, v).hex6();
      return {
        background: `linear-gradient(to right, ${start}, ${end})`,
      };
    },
    valueBackground() {
      const [h, s, v] = this.hsv.map((val) => Number(val));
      const start = surfacecurve("hsv", h, s, 0).hex6();
      const end = surfacecurve("hsv", h, s, 100).hex6();
      return {
        background: `linear-gradient(to right, ${start}, ${end})`,
      };
    },
    previewColor() {
      this.colorData = this.currentHex;
      this.$emit("colorChange", this.colorData);
      return {
        background: this.currentHex,
      };
    },
    currentHex() {
      const [h, s, v] = this.hsv.map((val) => Number(val));
      const hex = surfacecurve("hsv", h, s, v).hex6();
      return hex;
    },
    textColor() {
      let color = this.currentHex;
      if (surfacecurve(color).grayvalue() > 0.4) {
        color = surfacecurve(color).blend("black", 0.6).hex6();
      } else {
        color = surfacecurve(color)
          .blend("white", 1 - surfacecurve(color).grayvalue())
          .hex6();
      }
      return { color };
    },
    pickerWidth() {
      return { width: this.width };
    },
  },
  methods: {
    onHexInput(e) {
      const color = e.target.value;
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        this.hsv = surfacecurve(color).hsv();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/slider.scss";
@import "../scss/global.scss";

.picker {
  padding: 10px;
  border-radius: $border-radius;
  background: $gray-4;
  box-sizing: border-box;

  p {
    margin-bottom: 5px;
  }

  .preview {
    height: 100px;
    width: 100%;
    margin-bottom: 3px;
    position: relative;

    input[type="text"] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      background: rgba(0, 0, 0, 0);
    }
  }

  input[type="range"] {
    height: $sliderHeight;
    border-radius: $border-radius;

    &::-webkit-slider-thumb {
      height: $thumbHeight;
      background: $thumbColor;
      opacity: 0.7;
      transition: 0.2s opacity;
      &:hover {
        opacity: 1;
      }
    }

    &::-moz-range-thumb {
      height: $thumbHeight;
      background: $thumbColor;
      opacity: 0.7;
      transition: 0.2s opacity;
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
