<template>
  <div class="color">
    <div
      class="card-body"
      v-bind:style="{ backgroundColor: computedColor(color, true), color: getTextColor(computedColor(color, true))}"
      :label="color.label"
    >
      <h5 class="card-title">{{color.niceLabel}}</h5>
      <div class="buttonWrapper">
        <input
          class="form-control"
          type="color"
          :value="color.default"
          @change="onSetColor"
          :title="getCapitalized(color.niceLabel)"
        />
        <button
          class="btn btn-secondary"
          v-bind:style="{ backgroundColor: 'rgba(0,0,0,0)', color: getTextColor(computedColor(color, true))}"
          @click="toggleColorLock"
        >
          <font-awesome-icon :icon="color.locked ? lock : unlock"></font-awesome-icon>
        </button>
        <input
          class="hex-input"
          type="text"
          v-bind:style="{ backgroundColor: 'rgba(0,0,0,0)', color: getTextColor(computedColor(color, true))}"
          :value="color.default"
          @change="onSetColor"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Color from "./Color";
import { surfacecurve } from "../assets/surfacecurve-color";
import { unlinkObservers } from "../helpers/unlinkObservers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["color"],
  data() {
    return {
      unlock: fas.faLockOpen,
      lock: fas.faLock,
      popoverHover: false,
      popover: false
    };
  },
  computed: {
    computedColor() {
      return this.getComputedColor();
    }
  },
  methods: {
    ...mapGetters(["getComputedColor"]),
    ...mapActions(["setColor", "setColorLock"]),
    onSetColor: function(e) {
      let color = JSON.parse(JSON.stringify(this.$props.color));
      color.value = e.target.value;
      color.default = e.target.value;
      this.setColor(color);
    },
    toggleColorLock: function() {
      this.setColorLock(this.$props.color);
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
    onHover(e) {
      console.log(e);
    },
    onPopoverHover() {
      let self = this;
      setTimeout(() => {
        self.popover = self.popoverHover;

        setTimeout(() => {
          self.popover = false;
        }, 2000);
      }, 600);
    },
    getCapitalized(str) {
      str = str.split(" ");

      for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }

      return str.join(" ");
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.color {
  width: calc(100% / 4 - 10px);
  margin-bottom: 10px;
  position: relative;
  border: none;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
}

.color .card-title {
  text-transform: capitalize;
}

.fab-popover {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, calc(-100% - 5px));
  padding: 10px;
  z-index: 1000;
  white-space: nowrap;
  text-transform: capitalize;
  border-radius: 5px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  min-width: 100%;
  text-align: center;
}

.fab-popover:after {
  content: "";
  position: absolute;
  bottom: 0;
}

.hex-input {
  z-index: 100;
  margin-left: auto;
  width: 62px;
  font-size: 0.9em;
}

.color input[type="color"] {
  border: none;
  padding: 0;
  height: 0;
  width: 0;
  border-radius: 5px;
  outline: none;
  opacity: 0;
  height: 0;

  &:after {
    position: absolute;
    content: "Choose color";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}

.card-title {
  font-size: 0.8em;
  padding-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btn {
  font-size: 0.9em;
}

.buttonWrapper {
  display: flex;
  justify-content: flex-end;
}

.buttonWrapper button:first-of-type {
  margin-right: 5px;
  padding: 0;
}

.buttonWrapper button,
button {
  position: relative;
  border: none;
  z-index: 100;
}

button:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.colors > * {
  transition: 0.2s background-color !important;
}
</style>
