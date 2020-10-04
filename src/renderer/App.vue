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
  name: "color-picker-khs",
};
</script>

<style lang="scss">
@import "./scss/global.scss";

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

.text-khs-white {
  color: $text-khs-white;
}

body {
  background-color: $gray-3;
  overflow: hidden;
}
::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background: $gray-3;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: $border-radius;
}
</style>
