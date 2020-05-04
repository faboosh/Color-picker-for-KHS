<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

export default {
  name: "color-picker-khs"
};
</script>

<style lang="scss">
.form-control,
input {
  outline: none !important;
  border: none;
  &:active,
  &:focus {
    outline: none !important;
    border: none;
  }
}

.toggle-text {
  cursor: pointer;
  user-select: none;
}

html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #ff0000;
}
</style>
