<template>
  <a @click="exportConfig">Export to .zip</a>
</template>

<script>
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
    exportConfig: async function(e) {
      let dialog = new Dialog("saveFile", [
        {
          name: "Zip archive",
          extensions: ["zip"]
        }
      ]);
      let path = await dialog.open();

      if (path) {
        let colors = JSON.parse(JSON.stringify(this.colors));
        colors = colors.map(color => this.computedColor(color, false));

        //Format export as KHS config
        let output = formatExport(colors, this.getAllAlpha());
        let originalText = e.target.innerHTML;

        try {
          exportZip(output, this.getImages(), path);
          e.target.innerHTML = "Exported";
          e.target.classList.add("btn-success");
        } catch (e) {
          e.target.innerHTML = "Export failed";
          e.target.classList.add("btn-danger");
        }

        setTimeout(() => {
          e.target.innerHTML = originalText;
          e.target.classList.remove("btn-success", "btn-danger");
        }, 1000);
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
