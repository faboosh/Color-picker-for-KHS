<template>
  <div class="top-bar" :style="{backgroundColor: getColor('main_background')}">
    <div class="row" :style="{borderBottom: `3px solid ${getColor('control_background')}`}">
      <div class="col-3 logo py-1">
        <h4 class="text-center" :style="{color: getColor('handle')}">{{title}}</h4>
        <small class="text-center" :style="{color: getColor('text')}">{{`v${"0.1.0"}`}}</small>
      </div>
      <div class="col-6" :style="{backgroundColor: getColor('control_background')}">
        <div class="panel-background">
          <div class="browser">
            <font-awesome-icon :style="{color: getColor('active')}" :icon="folder" size="lg"></font-awesome-icon>
            <small :style="{color: getColor('active')}">BROWSER</small>
          </div>
          <div class="preset" :style="{backgroundColor: getColor('panel_background')}">
            <span :style="{color: getColor('text')}">Preset Name</span>
            <span :style="{color: getColor('text')}">Author</span>
            <p :style="{color: getColor('foreground')}">Description</p>
          </div>
          <div class="save">
            <font-awesome-icon :style="{color: getColor('active')}" :icon="save" size="lg"></font-awesome-icon>
            <small :style="{color: getColor('active')}">SAVE</small>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="undo">
          <font-awesome-icon class="mr-2" :style="{color: getColor('text')}" :icon="undo" size="lg"></font-awesome-icon>
          <font-awesome-icon
            class="reverse"
            :style="{color: getInactive(getColor('text'), getColor('disabled_tint'))}"
            :icon="undo"
            size="lg"
          ></font-awesome-icon>
        </div>
      </div>
    </div>
    <div class="row" :style="{borderBottom: `3px solid ${getColor('control_background')}`}">
      <div class="col-12">
        <div class="knobs">
          <div class="modwheel" :style="{backgroundColor: getColor('passive')}"></div>
          <ActiveKnob></ActiveKnob>
          <InactiveKnob></InactiveKnob>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import ActiveKnob from "./ActiveKnob";
import InactiveKnob from "./InactiveKnob";
import { getInactive } from "../../helpers/inactiveGenerator";
export default {
  data() {
    return {
      undo: fas.faUndo,
      folder: far.faFolderOpen,
      save: far.faSave,
      version: process.env.npm_package_version
    };
  },
  props: ["title"],
  methods: {
    ...mapGetters(["getColorByLabel", "getComputedColor"]),
    getColor: function(label) {
      return this.getComputedColor()(this.getColorByLabel()(label), true);
    },
    getInactive: getInactive
  },
  components: { ActiveKnob, InactiveKnob, FontAwesomeIcon }
};
</script>
<style scoped lang="scss">
.top-bar {
  width: 100%;

  .panel-background {
    height: 100%;
    margin-left: -15px;
    display: flex;
    .browser {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 100%;
      border-right: 2px solid rgba(0, 0, 0, 0.1);

      small {
        font-size: 0.5em;
      }
    }

    .preset {
      flex-grow: 1;
      flex-basis: 0;
      padding: 3px 10px;
      margin: 2px 0;

      span {
        font-style: italic;

        &:nth-child(2) {
          font-style: initial;
          font-size: 0.8em;
        }
      }

      p {
        font-style: italic;
        margin-bottom: 0;
        font-size: 0.7em;
        margin-top: -2px;
      }
    }

    .save {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40px;
      margin-right: -15px;

      small {
        font-size: 0.5em;
      }
    }
  }

  .undo {
    margin-top: 13px;
    display: flex;
    align-items: center;

    .reverse {
      transform: scaleX(-1);
    }
  }

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h4 {
      margin-bottom: -5px;
      padding-left: 10px;
    }
  }

  .knobs {
    padding: 5px 10px;
    display: flex;

    .modwheel {
      width: 5px;
      height: 40px;
      align-self: center;
      margin-right: 15px;
    }
  }
}
</style>