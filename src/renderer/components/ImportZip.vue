<template>
  <a @click="importZip">Import .zip file</a>
</template>

<script>
import { isWeb } from "../helpers/isWeb";
import { mapState, mapActions } from "vuex";
import { formatConfig } from "../helpers/formatConfig";
import { importZip } from "../helpers/importZip";
import { importZipWeb } from "../helpers/importZipWeb";
import { Dialog } from "../classes/Dialog";
import { WebDialog } from "../classes/webDialog";
import { KHSImage } from "../classes/image";
import { EventBus } from "../helpers/eventbus";

export default {
  components: {},
  methods: {
    ...mapActions(["commitColors", "setImages", "commitColors"]),
    isWeb,
    importZip: async function() {
      if (this.isWeb()) {
        const dialog = new WebDialog({ type: "open", extensions: [".zip"] });
        const result = await dialog.open();

        if (result) {
          const imported = await importZipWeb(result);
          console.log(imported);
          this.setImages(imported.images);
          this.commitColors(imported.config);

          setTimeout(() => {
            EventBus.$emit("image_loaded");
          }, 0);
        }

        /*let dialog = new Dialog("openFile", [
          {
            name: "Zip archive",
            extensions: ["zip"]
          }
        ]);

        let path = await dialog.open();

        if (path) {
          let zip = await importZip(path);
          this.setImages(zip.images);
          this.commitColors(zip.colors);
        }*/
      }
    }
  }
};
</script>

<style scoped>
</style>
