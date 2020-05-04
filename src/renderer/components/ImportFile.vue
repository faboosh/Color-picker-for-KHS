<template>
  <a @click="importColors">Import .conf</a>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formatConfig } from "../helpers/formatConfig";
import { Dialog } from "../classes/Dialog";
export default {
  components: {},
  methods: {
    ...mapActions(["commitColors"]),
    importColors: async function() {
      let dialog = new Dialog("openFile", [
        { name: "KHS Config File", extensions: ["conf"] }
      ]);
      let colors = formatConfig(await dialog.open());
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
