<template>
  <div class="wrapper">
    <div class="menu px-5">
      <Message></Message>
      <div class="dropdown">
        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          @click="dropdowns.import = !dropdowns.import"
        >Import</button>
        <div v-if="dropdowns.import" class="fab-dropdown-menu" @click="dropdowns.import = false">
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
        <div v-if="dropdowns.export" class="fab-dropdown-menu" @click="dropdowns.export = false">
          <ExportToZip></ExportToZip>
          <Export></Export>
        </div>
      </div>
      <Reset></Reset>
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
import Reset from "./Reset";
import Preview from "./Preview";
import ImportCurrent from "./ImportCurrent";
import ImportFile from "./ImportFile";
import ImportZipFile from "./ImportZipFile";
import Images from "./Images";
import Message from "./Message";
import ExportToZip from "./ExportToZip";
import Slice from "./preview-assets/Slice";

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
    Slice
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.container {
  width: 95%;
  padding: 2vw 0;
  max-width: none;
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
  justify-content: flex-end;
  background: #4a4a4a;
}
</style>
