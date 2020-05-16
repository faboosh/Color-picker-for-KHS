<template>
  <div class="images-wrapper">
    <h3 class="text-white toggle" :class="{disabled: collapsed}" @click="toggleHidden">Images</h3>
    <div class="images" :class="{hide: collapsed}">
      <div class="btn-group mb-3 mt-2" role="group">
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Phase_Plant'}"
          @click="setTarget('Phase_Plant')"
        >Phase Plant</button>
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Multipass'}"
          @click="setTarget('Multipass')"
        >Multipass</button>
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Snap_Heap'}"
          @click="setTarget('Snap_Heap')"
        >SnapHeap</button>
      </div>

      <div class="image-wrapper">
        <div class="preview-wrapper" :class="{hide: !getPluginImage(target)}">
          <CanvasRenderer
            class="preview"
            :target="target"
            @change_image="importImage"
            @remove_image="removeImage"
          ></CanvasRenderer>
        </div>
        <div class="import-wrapper" v-if="!getPluginImage(target)">
          <h5>There doesn't appear to be an image loaded for {{target.replace("_", " ")}}</h5>
          <button class="btn btn-secondary" @click="importImage">Import image</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { KHSImage } from "../classes/image";
import { Dialog } from "../classes/Dialog";
import { WebDialog } from "../classes/webDialog";
import { EventBus } from "../helpers/eventbus";
import { isWeb } from "../helpers/isWeb";

//Components
import AlphaSlider from "./AlphaSlider";
import CanvasRenderer from "./CanvasRenderer";

export default {
  data() {
    return {
      collapsed: true,
      target: "Phase_Plant"
    };
  },
  methods: {
    ...mapGetters(["getImage", "getAlpha"]),
    ...mapActions(["setImage"]),
    getPluginImage: function(name) {
      return this.getImage()(name);
    },
    isWeb,
    importImage: async function() {
      if (this.isWeb()) {
        const dialog = new WebDialog({
          type: "open",
          extensions: [".jpg", ".jpeg", ".png"]
        });
        const image = await dialog.open();
        console.log(image);
        if (image) {
          const base64Image = new Buffer(image.buffer, "binary").toString(
            "base64"
          );
          const extension = image.meta.name.match(/\.[0-9a-z]+$/i)[0];
          const urlBase = `data:image/${extension.split(".").pop()};base64,`;

          this.setImage({
            image: new KHSImage(null, 1, { urlBase, extension, base64Image }),
            target: this.target
          });

          this.redrawCanvas();
        }
      } else {
        //Open dialog and get path to image
        const dialog = new Dialog("openFile", [
          { name: "Image", extensions: ["jpg", "jpeg", "png"] }
        ]);
        const path = await dialog.open();

        //If user specifies path, load image
        if (path) {
          const image = new KHSImage(path, 1);
          await image.loadImage();
          if (image) {
            this.setImage({ image, target: this.target });
            this.redrawCanvas();
          }
        }
      }
    },
    removeImage() {
      this.setImage({ image: {}, target: this.target });
    },
    getAlphaByName: function() {
      let alpha = this.getAlpha()(this.target) * 100;
      return alpha;
    },
    redrawCanvas() {
      setTimeout(() => {
        EventBus.$emit("image_loaded");
      }, 0);
    },
    setTarget(target) {
      this.target = target;
      this.redrawCanvas();
    },
    toggleHidden() {
      this.collapsed = !this.collapsed;
      this.redrawCanvas();
    }
  },
  components: {
    AlphaSlider,
    CanvasRenderer
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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

.image-wrapper {
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;

  .image-controls {
    display: flex;
    justify-content: space-between;

    .btn {
      height: 38px;
      align-self: flex-end;
    }
  }

  .preview,
  .preview-wrapper {
    width: 100%;
  }

  .preview-wrapper {
    position: relative;
  }

  .preview-wrapper h5 {
    user-select: none;
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.import-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 40vw;

  h5 {
    margin-bottom: 20px;
    color: #777;
  }
}
</style>
