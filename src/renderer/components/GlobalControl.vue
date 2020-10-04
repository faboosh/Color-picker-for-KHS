<template>
  <div class="control">
    <div class="color">
      <h6 class="text-khs-white">{{ control.title }}</h6>
      <div class="inner" :class="{ colorinner: control.type == 'color' }">
        <input
          v-if="control.type == 'slider'"
          type="range"
          :max="control.max"
          :min="control.min"
          :value="String(control.value)"
          class="form-control"
          @change="modify"
        />
        <Picker
          ref="picker"
          v-if="control.type == 'color'"
          :color="control.value"
          @colorChange="changeTintColor"
          width="100%"
        />
        <button class="btn btn-secondary" @click="reset">
          <font-awesome-icon :icon="undo" size="1x"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { surfacecurve } from "../assets/surfacecurve-color";

import Picker from "./Picker";

export default {
  props: ["control"],
  data() {
    return {
      undo: fas.faUndo,
    };
  },
  methods: {
    modify: function (e) {
      let self = this;
      if (e.target) {
        let param = this.$props.control.title;
        let methods = {
          Hue: function (e) {
            let hueamt = e.target.value;
            console.log("Hue", hueamt);
            self.$emit("modify", { param: "Hue", value: hueamt });
          },

          Saturation: function (e) {
            self.$emit("modify", {
              param: "Saturation",
              value: e.target.value,
            });
          },

          "Tint Color": function (e) {
            self.$emit("modify", {
              param: "Tint Color",
              value: e.target.value,
            });
          },

          "Tint Amount": function (e) {
            self.$emit("modify", {
              param: "Tint Amount",
              value: e.target.value,
            });
          },
        };

        if (methods[param]) {
          methods[param](e);
        }
      }
    },
    getTextColor: function (color) {
      if (surfacecurve(color).grayvalue() > 0.5) {
        return surfacecurve(color).blend("black", 0.6).hex6();
      } else {
        return surfacecurve(color)
          .blend("white", 1 - surfacecurve(color).grayvalue())
          .hex6();
      }
    },

    changeTintColor(color) {
      this.$emit("modify", {
        param: "Tint Color",
        value: color,
      });
    },

    reset: function () {
      if (this.control.type == "color") {
        this.$refs.picker.hsv = surfacecurve(this.control.default).hsv();
        console.log(this.default);
      }

      this.$emit("modify", {
        param: this.$props.control.title,
        value: this.control.default,
      });
    },
  },
  components: {
    FontAwesomeIcon,
    Picker,
  },
};
</script>

<style scoped lang="scss">
@import "../scss/slider.scss";
@import "../scss/global.scss";

.control {
  width: calc(100%);
}

input[type="color"] {
  border: none;
  padding: 0;
  border-radius: $border-radius;
  outline: none;
  position: relative;

  &:after {
    position: absolute;
    border-radius: $border-radius 0px 0px 5px;
    background-color: inherit;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

input[type="range"] {
  background: $gray-3;

  &:focus,
  &:active {
    background: $gray-3;
  }

  &::-webkit-slider-thumb {
    background: $gray-5;
  }

  &::-moz-range-thumb {
    background: $gray-5;
  }
}

.inner {
  .btn {
    background: $gray-5;
  }
}

.color .inner {
  display: flex;

  .overlay-hex {
    background: $gray-3;
    color: white;
    border: none;
    text-align: center;
  }
}

.colorinner {
  flex-direction: column;
  .picker {
    padding: 0;
  }
  .btn.btn-secondary {
    border-radius: $border-radius;
  }
}
</style>
