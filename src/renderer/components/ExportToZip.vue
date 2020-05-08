<template>
  <a @click="exportConfig">Export to .zip</a>
</template>

<script>
//Helpers
import { isWeb } from "../helpers/isWeb";
import { mapState, mapGetters } from "vuex";
import { exportZip } from "../helpers/exportZip";
import { formatExport } from "../helpers/formatExport";
import { Dialog } from "../classes/Dialog";

export default {
  computed: {
    ...mapState({
      colors: state => state.Colors.current
    }),
    computedColor() {
      return this.getComputedColor();
    }
  },
  components: {},
  methods: {
    ...mapGetters(["getComputedColor", "getImages", "getAllAlpha"]),
    isWeb,
    exportConfig: async function(e) {
      let dialog;
      let path;

      if (!this.isWeb()) {
        dialog = new Dialog("saveFile", [
          {
            name: "Zip archive",
            extensions: ["zip"]
          }
        ]);
        path = await dialog.open();
      }

      if (path || this.isWeb()) {
        let colors = JSON.parse(JSON.stringify(this.colors));
        colors = colors.map(color => this.computedColor(color, false));

        //Format export as KHS config
        let output = formatExport(colors, this.getAllAlpha());
        let originalText = e.target.innerHTML;

        try {
          exportZip(output, this.getImages(), path, this.isWeb());
        } catch (e) {
          console.error(e);
        }
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
