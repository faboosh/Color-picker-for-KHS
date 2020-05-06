<template>
  <div class="wrapper">
    <div class="menu-wrapper">
      <div class="topbar">
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
            >Import</button>
            <div
              v-if="dropdowns.import"
              class="fab-dropdown-menu"
              @click="dropdowns.import = false"
            >
              <ImportCurrent></ImportCurrent>
              <ImportFile></ImportFile>
              <ImportZipFile></ImportZipFile>
            </div>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              @click="dropdowns.export = !dropdowns.export"
            >Export</button>
            <div
              v-if="dropdowns.export"
              class="fab-dropdown-menu"
              @click="dropdowns.export = false"
            >
              <ExportToZip></ExportToZip>
              <Export></Export>
            </div>
          </div>
          <Reset></Reset>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xl-6 resize">
          <Colors></Colors>
          <Images></Images>
        </div>
        <div class="col-xl-6 resize">
          <GlobalControls></GlobalControls>
          <div class="mb-4"></div>
          <Preview></Preview>
          <div class="mb-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Components
import GlobalControls from "./GlobalControls";
import Colors from "./Colors";
import Export from "./Export";
import Logo from "./Logo";
import Reset from "./Reset";
import Preview from "./Preview";
import ImportCurrent from "./ImportCurrent";
import ImportFile from "./ImportFile";
import ImportZipFile from "./ImportZipFile";
import Images from "./Images";
import Message from "./Message";
import ExportToZip from "./ExportToZip";
import Slice from "./preview-assets/Slice";

const { BrowserWindow } = require("electron").remote;
// Retrieve focused window
let mainWindow = BrowserWindow.getFocusedWindow();

console.log(mainWindow);

export default {
  data() {
    return {
      dropdowns: {
        import: false,
        export: false
      }
    };
  },
  name: "home",
  components: {
    GlobalControls,
    Colors,
    Export,
    Reset,
    Preview,
    ImportCurrent,
    ImportFile,
    Images,
    Message,
    ExportToZip,
    ImportZipFile,
    Slice,
    Logo
  },
  methods: {
    maximize() {
      mainWindow.maximize();
    },
    minimize() {
      mainWindow.minimize();
    },
    close() {
      mainWindow.close();
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 95%;
  padding: 2vw 0;
  max-width: none;
  margin-top: 100px;
}

.menu-wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100000000;
}

@media screen and (max-width: 1200px) {
  .row {
    flex-direction: column-reverse;
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
  background: #4a4a4a;

  .logo {
    display: flex;
    align-items: center;

    h4 {
      margin-bottom: 0;
      margin-left: 8px;
      color: white;
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

.topbar {
  display: flex;
  padding: 2px;
  background: #222;
  .draggable {
    display: block;
    flex-grow: 1;
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
</style>
