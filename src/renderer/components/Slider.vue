<template>
  <div class="control mb-3">
    <div class="color">
      <h6 class="mt-1 text-white">{{title}}</h6>
      <div class="inner">
        <input
          ref="slider"
          type="range"
          :min="min"
          :max="max"
          :value="value"
          @change="onChange"
          class="form-control"
        />
        <button class="btn btn-secondary" @click="reset">
          <font-awesome-icon :icon="undo"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>


<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["title", "defaultVal", "min", "max", "value"],
  data() {
    return {
      undo: fas.faUndo
    };
  },
  mounted() {},
  methods: {
    onChange: function(e) {
      this.$emit("change", e.target.value);
    },
    reset: function() {
      this.$refs.slider.value = this.$props.defaultVal;

      this.$emit("change", this.$props.defaultVal);
    }
  },
  components: {
    FontAwesomeIcon
  }
};
</script>

<style scoped lang="scss">
@import "../scss/slider.scss";
</style>