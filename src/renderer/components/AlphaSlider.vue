<template>
  <div class="control mb-3">
    <div class="color">
      <h6 class="mt-1 text-khs-white">Image Alpha</h6>
      <div class="inner">
        <input
          type="range"
          min="0"
          max="100"
          :value="alpha"
          @change="onSetAlpha"
          class="form-control"
        />
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { KHSImage } from "../classes/image";

export default {
  props: ["selectedTarget", "alpha"],
  data() {
    return {
      undo: fas.faUndo,
    };
  },
  methods: {
    ...mapGetters(["getAlpha"]),
    ...mapActions(["setAlpha"]),
    onSetAlpha: function (e) {
      this.setAlpha({
        target: this.$props.selectedTarget,
        alpha: e.target.value / 100,
      });
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
.control {
  width: calc(50% - 10px);
}
input[type="range"] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: #333333; /* Otherwise white in Chrome */
  border: none;
  border-radius: $border-radius;

  &:focus,
  &:active {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
    background: #333333;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #4a4a4a;
    cursor: pointer;
    margin-top: 0px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
  }
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

.inner {
  display: flex;
  .btn {
    border: none;
    border-radius: 0px 5px 5px 0px;
    background: #333;
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
