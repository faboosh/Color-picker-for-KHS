<template>
  <a @click="importColors">Import current config</a>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { importConfig } from "../helpers/importElectron";
import { formatConfig } from "../helpers/formatConfig";
import { getWinPath } from "../helpers/getWinPath";
export default {
  components: {},
  methods: {
    ...mapActions(["commitColors"]),
    importColors: function() {
      const config = importConfig(getWinPath());
      const colors = formatConfig(config);
      if (colors) {
        this.commitColors(colors);
      }
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
