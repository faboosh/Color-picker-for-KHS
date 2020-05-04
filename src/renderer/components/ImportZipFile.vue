<template>
  <a @click="importZip">Import .zip file</a>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { formatConfig } from "../helpers/formatConfig";
import { importZip } from "../helpers/importZip";
import { Dialog } from "../classes/Dialog";

export default {
  components: {},
  methods: {
    ...mapActions(["commitColors", "setImages", "commitColors"]),
    importZip: async function() {
      let dialog = new Dialog("openFile", [
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
