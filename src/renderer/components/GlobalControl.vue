<template>
  <div class="control mb-3">
    <div class="color">
      <h6 class="mt-3 text-white">{{ control.title }}</h6>
      <div class="inner">
        <input
          v-if="control.type == 'slider'"
          type="range"
          :max="control.max"
          :min="control.min"
          :value="String(control.value)"
          class="form-control"
          @change="modify"
        />
        <input
          v-if="control.type == 'color'"
          type="color"
          :value="control.value"
          :style="{backgroundColor: control.value}"
          class="form-control"
          @change="modify"
        />
        <input
          v-if="control.type == 'color'"
          :style="{backgroundColor: control.value, color: getTextColor(control.value)}"
          :value="control.value"
          type="text"
          class="overlay-hex"
          @change="modify"
        />
        <button class="btn btn-secondary" @click="reset">
          <font-awesome-icon :icon="undo"></font-awesome-icon>
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

console.log(surfacecurve("red").hex6());
export default {
  props: ["control"],
  data() {
    return {
      undo: fas.faUndo
    };
  },
  methods: {
    modify: function(e) {
      let self = this;
      if (e.target) {
        let param = this.$props.control.title;
        let methods = {
          Hue: function(e) {
            let hueamt = e.target.value;
            console.log("Hue", hueamt);
            self.$emit("modify", { param: "Hue", value: hueamt });
          },

          Saturation: function(e) {
            self.$emit("modify", {
              param: "Saturation",
              value: e.target.value
            });
          },

          "Tint Color": function(e) {
            self.$emit("modify", {
              param: "Tint Color",
              value: e.target.value
            });
          },

          "Tint Amount": function(e) {
            self.$emit("modify", {
              param: "Tint Amount",
              value: e.target.value
            });
          }
        };

        if (methods[param]) {
          methods[param](e);
        }
      }
    },
    getTextColor: function(color) {
      if (surfacecurve(color).grayvalue() > 0.5) {
        return surfacecurve(color)
          .blend("black", 0.6)
          .hex6();
      } else {
        return surfacecurve(color)
          .blend("white", 1 - surfacecurve(color).grayvalue())
          .hex6();
      }
    },

    reset: function() {
      this.$emit("modify", {
        param: this.$props.control.title,
        value: this.control.default
      });
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style scoped lang="scss">
@import "../scss/slider.scss";
.control {
  width: calc(50% - 10px);
}

input[type="color"] {
  border: none;
  padding: 0;
  border-radius: 5px;
  outline: none;
  position: relative;

  &:after {
    position: absolute;
    border-radius: 5px 0px 0px 5px;
    background-color: inherit;
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

.color .inner {
  display: flex;

  .overlay-hex {
    background: #333;
    color: white;
    border: none;
    text-align: center;
  }
}
</style>
