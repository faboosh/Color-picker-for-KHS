<template>
  <a @click="importColors">Import .conf</a>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formatConfig } from "../helpers/formatConfig";
import { importConfig } from "../helpers/importElectron";
import { Dialog } from "../classes/Dialog";
import { isWeb } from "../helpers/isWeb";
import { WebDialog } from "../classes/webDialog";

export default {
  components: {},
  methods: {
    isWeb,
    ...mapActions(["commitColors"]),
    importColors: async function() {
      if (this.isWeb()) {
        const dialog = new WebDialog({ type: "open", extensions: [".conf"] });
        const result = await dialog.open();

        if (result) {
          const colors = formatConfig(new TextDecoder().decode(result.buffer));
          this.commitColors(colors);
        }
      } else {
        let dialog = new Dialog("openFile", [
          { name: "KHS Config File", extensions: ["conf"] }
        ]);

        const path = await dialog.open();

        const configContent = window.fs.readFileSync(path, {
          encoding: "utf8",
          flag: "r"
        });

        let colors = formatConfig(configContent);

        if (colors) {
          this.commitColors(colors);
        }
      }
    }
  }
};
</script>

<style scoped>
</style>
