<template>
  <span class="text-white">{{message}}</span>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      message: state => state.Message.message
    })
  }
};
</script>

<style scoped>
span {
  align-self: center;
  justify-self: flex-start;
}
</style>
