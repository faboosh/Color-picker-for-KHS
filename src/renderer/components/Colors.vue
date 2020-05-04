<template>
  <div class="colors-wrapper">
    <h3
      class="text-white toggle"
      :class="{disabled: collapsed}"
      @click="collapsed = !collapsed"
    >Colors</h3>
    <div class="colors mt-4" :class="{hide: collapsed}">
      <Color v-for="(color, i) in colors" :key="i" :color="color"></Color>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Color from "./Color";

export default {
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    ...mapState({
      colors: state => state.Colors.current
    })
  },
  components: {
    Color
  },
  methods: {
    ...mapActions([]),
    changeColor(e) {
      console.log(e);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.colors {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-left: -8px;
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
</style>
