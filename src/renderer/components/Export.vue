<template>
  <a @click="exportConfig">Export directly</a>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { exportConfig } from "../helpers/exportElectron";
import { formatExport } from "../helpers/formatExport";
import { getWinPath } from "../helpers/getWinPath";
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
    exportConfig: function(e) {
      let colors = JSON.parse(JSON.stringify(this.colors));
      colors = colors.map(color => this.computedColor(color, false));

      //Format export as KHS config
      let output = formatExport(colors, this.getAllAlpha());

      let originalText = e.target.innerHTML;
      try {
        exportConfig(output, this.getImages(), getWinPath());
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
};
</script>

<style scoped>
.container {
  width: 95%;
  padding: 2vw 0;
  max-width: none;
}
</style>
