<template>
  <div class="wrapper">
    <div class="rendering-surface">
      <div class="canvas">
        <div class="canvas-inner" @click="changeImage">
          <h5 class="text-white">Click to replace image</h5>
          <canvas ref="canvas" :width="1920" :height="1920"></canvas>
        </div>
        <button class="btn btn-danger mb-3 remove-image" @click="removeImage">Remove image</button>
      </div>
      <div class="controls">
        <div class="aspect-ratio">
          <h6 class="text-white">Aspect ratio</h6>
          <div class="inner">
            <input :value="getAspect().w" @change="setAspectW" type="number" class="form-control" />
            <span>x</span>
            <input :value="getAspect().h" @change="setAspectH" type="number" class="form-control" />
          </div>
        </div>
        <Slider
          :title="'Alpha'"
          :value="current.alpha * 100"
          :defaultVal="100"
          :min="0"
          :max="100"
          @change="onSetAlpha"
        ></Slider>
        <Slider
          :title="'Scale'"
          :value="current.scale * 100"
          :defaultVal="100"
          :min="1"
          :max="600"
          @change="onSetScale"
        ></Slider>
        <Slider
          :title="'X'"
          :value="current.x"
          :defaultVal="0"
          :min="-960"
          :max="960"
          @change="onSetX"
        ></Slider>
        <Slider
          :title="'Y'"
          :value="current.y"
          :defaultVal="0"
          :min="-960"
          :max="960"
          @change="onSetY"
        ></Slider>
        <Slider
          :title="'Hue'"
          :value="current.hue"
          :defaultVal="0"
          :min="0"
          :max="360"
          @change="onSetHue"
        ></Slider>
        <Slider
          :title="'Saturation'"
          :value="current.saturation"
          :defaultVal="100"
          :min="0"
          :max="200"
          @change="onSetSaturation"
        ></Slider>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { exportConfig } from "../helpers/exportElectron";
import { EventBus } from "../helpers/eventbus";
import { unlinkObservers } from "../helpers/unlinkObservers";
import { Renderer } from "../classes/Renderer";

//Components
import Slider from "./Slider";

let params = {
  scale: 1,
  hue: 0,
  saturation: 100,
  x: 0,
  y: 0,
  alpha: 1,
  w: 1920,
  h: 1920,
  aspect: {
    w: 2,
    h: 3
  }
};

export default {
  props: ["target"],
  data() {
    return {
      Phase_Plant: unlinkObservers(params),
      Multipass: unlinkObservers(params),
      Snap_Heap: unlinkObservers(params),
      current: unlinkObservers(params),
      renderer: {}
    };
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.resize();
    });

    this.resize();

    EventBus.$on("image_loaded", () => {
      console.log("recieved");
      this.render();
      this.resize();
    });

    this.renderer = new Renderer(this.$refs.canvas);
  },
  computed: {
    ...mapState(["images"])
  },
  methods: {
    ...mapActions(["setRendered"]),
    resize() {
      let { canvas } = this.$refs;
      let { aspect } = this[this.$props.target];
      let unit = canvas.parentNode.clientWidth / aspect.w;
      let width = canvas.parentNode.clientWidth;
      let height = unit * aspect.h;
      canvas.style.height = height + "px";
      canvas.style.width = width + "px";
    },
    async render() {
      let { canvas } = this.$refs;
      let { target } = this.$props;
      let { images } = this.images;
      this.current = unlinkObservers(this[target]);
      let targetImg = images[target];

      if (targetImg.alpha) {
        const image = await this.renderer.render(
          images[target].getDataUrl(),
          this.current
        );
        this.setRendered({ target, image });
      }
    },
    onSetScale: function(val) {
      val = val / 100;
      this[this.$props.target].scale = val;
      this.render();
    },
    onSetY: function(val) {
      this[this.$props.target].y = val;
      this.render();
    },
    onSetX: function(val) {
      this[this.$props.target].x = val;
      this.render();
    },
    onSetAlpha: function(val) {
      this[this.$props.target].alpha = val / 100;
      this.render();
    },
    onSetHue: function(val) {
      this[this.$props.target].hue = val;
      this.render();
    },
    onSetSaturation: function(val) {
      this[this.$props.target].saturation = val;
      this.render();
    },
    getW() {
      return this[this.$props.target].w;
    },
    getH() {
      return this[this.$props.target].h;
    },
    getX() {
      return this[this.$props.target].x;
    },
    getY() {
      return this[this.$props.target].y;
    },
    getAlpha() {
      console.log("alpha");
      return this[this.$props.target].alpha * 100;
    },
    getScale() {
      return this[this.$props.target].scale * 100;
    },
    changeImage() {
      this.$emit("change_image");
    },
    removeImage() {
      this.$emit("remove_image");
    },
    getAspect() {
      return this[this.$props.target].aspect;
    },
    setAspectW(e) {
      console.log(e.target.value);
      this[this.$props.target].aspect.w = e.target.value;
      this.resize();
      this.render();
    },
    setAspectH(e) {
      console.log(e.target.value);
      this[this.$props.target].aspect.h = e.target.value;
      this.resize();
      this.render();
    }
  },
  components: {
    Slider
  }
};
</script>

<style scoped lang="scss">
canvas {
  transition: 0.2s opacity;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    opacity: 0.5;
  }
}

.canvas-inner {
  position: relative;
  z-index: 10;

  h5 {
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s opacity;
    white-space: nowrap;
  }

  &:hover > h5 {
    opacity: 1;
  }
}

.controls {
  display: flex;
  flex-wrap: wrap;
  justify-items: flex-end;

  .control {
    width: 100%;
  }

  .remove-image {
    justify-self: flex-end;
  }
}

.aspect-ratio {
  padding: 10px 0;
  .inner {
    display: flex;
    width: 120px;

    span {
      color: white;
      margin: 0 10px;
      align-self: center;
    }
    input[type="number"] {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      background: #333;
      color: white;
      border-radius: 5px;
      padding: 10px;
    }
  }
}

.rendering-surface {
  display: flex;
  width: 100%;
  justify-content: space-between;

  .controls,
  .canvas {
    width: calc(50% - 10px);
  }

  .canvas {
    padding-top: 25px;
  }
}
</style>
