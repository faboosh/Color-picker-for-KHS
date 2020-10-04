<template>
  <div class="wrapper">
    <div class="menu-wrapper">
      <div class="topbar" v-if="!isWeb()">
        <div class="draggable" style="-webkit-app-region: drag"></div>
        <div class="window-controls">
          <button @click="minimize"></button>
          <button @click="maximize"></button>
          <button @click="close"></button>
        </div>
      </div>
      <div class="menu px-5">
        <div class="logo">
          <Logo></Logo>
          <h4>Color Picker for KHS</h4>
        </div>
        <div class="end">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              @click="dropdowns.import = !dropdowns.import"
            >
              Import
            </button>
            <div
              v-if="dropdowns.import"
              class="fab-dropdown-menu"
              @click="dropdowns.import = false"
            >
              <ImportCurrent v-if="!isWeb()"></ImportCurrent>
              <ImportFile></ImportFile>
              <ImportZip></ImportZip>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              @click="dropdowns.export = !dropdowns.export"
            >
              Export
            </button>
            <div
              v-if="dropdowns.export"
              class="fab-dropdown-menu"
              @click="dropdowns.export = false"
            >
              <ExportToZip></ExportToZip>
              <Export v-if="!isWeb()"></Export>
            </div>
          </div>
          <div class="separator"></div>
          <Reset></Reset>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xl-9">
          <PreviewMock />
        </div>
        <div class="col-xl-3">
          <Menu class="colorsComp" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isWeb } from "../helpers/isWeb";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

//Components
import Picker from "./Picker";
import GlobalControls from "./GlobalControls";
import Menu from "./Menu";
import Export from "./Export";
import Logo from "./Logo";
import Reset from "./Reset";
import Preview from "./Preview";
import PreviewMock from "./preview-assets/PreviewMock";
import ImportCurrent from "./ImportCurrent";
import ImportFile from "./ImportFile";
import ImportZip from "./ImportZip";
import Images from "./Images";
import Message from "./Message";
import ExportToZip from "./ExportToZip";
import Slice from "./preview-assets/Slice";

export default {
  data() {
    return {
      dropdowns: {
        import: false,
        export: false,
      },
    };
  },
  name: "home",
  components: {
    GlobalControls,
    Menu,
    Export,
    Reset,
    Preview,
    ImportCurrent,
    ImportFile,
    Images,
    Message,
    ExportToZip,
    ImportZip,
    Slice,
    Logo,
    PreviewMock,
    Picker,
  },
  methods: {
    isWeb,
    maximize() {
      this.getWindow().maximize();
    },
    minimize() {
      this.getWindow().minimize();
    },
    close() {
      this.getWindow().close();
    },
    getWindow() {
      return window.browserWindow.getFocusedWindow();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../scss/global.scss";

.container {
  width: 100%;
  max-width: none;
  margin-top: $container-mt;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: $container-padding;
  padding-bottom: 0;
  overflow-y: scroll;
  max-height: calc(100vh - #{$container-mt});
}

.menu-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100000000;
}

@media screen and (max-width: 1200px) {
  .row div {
    margin-bottom: $container-padding;
  }
}

.btn,
.dropdown .btn {
  border-radius: 0;

  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
}

.logo {
  justify-self: flex-start;
}

.btn-secondary {
  background: none;
  border: none;
  margin-right: 20px;
}

.dropdown {
  .dropdown-toggle {
    position: relative;
  }

  .fab-dropdown-menu {
    background: #3a3a3a;
    position: absolute;
    top: 38px;
    right: 0;
    border-radius: 0 0 3px 3px;
    display: flex;
    height: auto;
    flex-direction: column;
    z-index: 1000;
    overflow: hidden;
    a {
      color: white;
      white-space: nowrap;
      cursor: pointer;
      padding: 10px 15px;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}

.menu {
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: $gray-5;

  .logo {
    display: flex;
    align-items: center;

    h4 {
      margin-bottom: 0;
      margin-left: 8px;
      color: $text-khs-white;
      padding: 10px 0;
    }
  }

  .end {
    display: flex;
    max-height: 38px;
    align-self: center;
    padding-bottom: 5px;

    .btn-danger {
      background: none;
    }

    & > * {
      border: none;
    }
  }
}

.separator {
  background: #3a3a3a;
  width: 2px;
  margin-right: 20px;
  margin-left: 0px;
  transform: translateY(2px);
}

.topbar {
  display: flex;
  padding: 2px;
  background: $gray-2;
  .draggable {
    display: block;
    flex-grow: 1;
    color: white;
  }
  .window-controls {
    padding-right: 10px;
    button {
      height: 12px;
      width: 12px;
      border: none;
      border-radius: 10px;
      z-index: 10;

      &:not(:last-child) {
        margin-right: 3px;
      }

      &:nth-child(1) {
        background-color: rgb(233, 216, 60);
      }

      &:nth-child(2) {
        background-color: rgb(75, 209, 63);
      }

      &:nth-child(3) {
        background-color: rgb(226, 62, 33);
      }
    }
  }
}

.logo-drag {
  height: 20px;
}
</style>
