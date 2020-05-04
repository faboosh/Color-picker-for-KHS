<template>
  <button class="btn btn-danger" @click="onResetColors">Reset Colors</button>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { exportConfig } from "../helpers/exportElectron";
export default {
  methods: {
    ...mapActions(["resetColors", "setMessage", "resetControls"]),
    onResetColors: function() {
      this.resetColors();
      this.resetControls();
    }
  }
};
</script>

<style scoped>
.container {
  width: 95%;
  padding: 2vw 0;
  max-width: none;
}
</style>
