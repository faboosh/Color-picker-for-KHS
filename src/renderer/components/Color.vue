<template>
  <div
    class="color mini"
    :class="{ selected: isSelected }"
    @click="selectColor"
  >
    <div
      class="card-body"
      v-bind:style="{
        backgroundColor: computedColor(color, true),
        color: getTextColor(computedColor(color, true)),
      }"
      :label="color.label"
    >
      <div class="buttonWrapper">
        <button
          class="btn btn-secondary"
          v-bind:style="{
            backgroundColor: 'rgba(0,0,0,0)',
            color: getTextColor(computedColor(color, true)),
          }"
          @click="toggleColorLock"
        >
          <font-awesome-icon
            :icon="color.locked ? lock : unlock"
          ></font-awesome-icon>
        </button>

        <h5 class="card-title">{{ color.niceLabel }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
//Components

//Helpers
import { mapState, mapActions, mapGetters } from "vuex";
import { surfacecurve } from "../assets/surfacecurve-color";
import { unlinkObservers } from "../helpers/unlinkObservers";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["color", "selected", "index"],
  data() {
    return {
      unlock: fas.faLockOpen,
      lock: fas.faLock,
      popoverHover: false,
      popover: false,
      undo: fas.faUndo,
    };
  },
  computed: {
    computedColor() {
      return this.getComputedColor();
    },
    isSelected() {
      return this.$props.index == this.selected;
    },
  },
  methods: {
    ...mapGetters(["getComputedColor"]),
    ...mapActions(["setColor", "setColorLock"]),
    onSetColor: function (e) {
      let color = JSON.parse(JSON.stringify(this.$props.color));
      color.value = e.target.value;
      color.default = e.target.value;
      this.setColor(color);
    },
    toggleColorLock: function () {
      this.setColorLock(this.$props.color);
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
    resetColor() {
      let color = JSON.parse(JSON.stringify(this.$props.color));
      color.value = color.default;
      color.default = e.target.value;
      this.setColor(color);
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
    },
    selectColor() {
      this.$emit("selectColor", this.$props.index);
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../scss/global.scss";
$items-per-row: 1;
.color {
  width: calc(100% / #{$items-per-row});
  box-sizing: border-box;
  margin-bottom: 10px;
  position: relative;
  border: none;
  border-radius: $border-radius;
  cursor: pointer;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);

  &:nth-child(#{ $items-per-row}n) {
    margin-right: 0;
  }

  .card-body {
    border-radius: $border-radius;
  }

  /*&.selected:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0),
      rgba(255, 255, 255, 0.2)
    );
  }*/
  &.selected:after {
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 2px;
    opacity: 0.5;
    background: white;
  }
}

.mini {
  width: calc(100% / #{$items-per-row});

  .card-body {
    padding: 5px;
  }

  .hex-input {
    display: none;
  }

  .card-title {
    padding-bottom: 0;
    margin-bottom: 0;
  }
}

.color .card-title {
  text-transform: capitalize;
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
  align-items: center;
}

.buttonWrapper button:first-of-type {
  margin: 0 5px;
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
