<template>
  <div class="images-wrapper">
    <h3
      class="text-white toggle"
      :class="{disabled: collapsed}"
      @click="collapsed = !collapsed"
    >Images</h3>
    <div class="images" :class="{hide: collapsed}">
      <div class="btn-group mb-3 mt-2" role="group">
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Phase_Plant'}"
          @click="target = 'Phase_Plant'"
        >Phase Plant</button>
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Multipass'}"
          @click="target = 'Multipass'"
        >Multipass</button>
        <button
          class="btn btn-secondary"
          :class="{active: target == 'Snap_Heap'}"
          @click="target = 'Snap_Heap'"
        >SnapHeap</button>
      </div>
      <div class="image-wrapper">
        <div v-if="getPluginImage(target)" class="preview-wrapper">
          <div class="image-controls">
            <AlphaSlider :selectedTarget="target" :alpha="getAlphaByName()"></AlphaSlider>
            <button class="btn btn-danger mb-3" @click="removeImage">Remove image</button>
          </div>
          <img class="preview" :src="getPluginImage(target)" alt @click="importImage" />
          <h5 class="text-white">Click anywhere to replace image</h5>
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

//Components
import AlphaSlider from "./AlphaSlider";

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
    importImage: async function() {
      let dialog = new Dialog("openFile", [
        { name: "Image", extensions: ["jpg", "jpeg", "png"] }
      ]);
      let image = new KHSImage(await dialog.open(), 0.5);
      await image.loadImage();
      if (image) {
        this.setImage({ image, target: this.target });
      }
    },
    removeImage() {
      this.setImage({ image: {}, target: this.target });
    },
    getAlphaByName: function() {
      let alpha = this.getAlpha()(this.target) * 100;
      console.log(alpha);
      return alpha;
    }
  },
  components: {
    AlphaSlider
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

  .preview:hover + h5,
  .btn:hover {
    display: block;
  }

  .preview:hover {
    opacity: 0.3;
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
