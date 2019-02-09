<template>
  <div class="toast">
    <p class="toast-message">{{ message }}</p>
  </div>
</template>

<script>
// @flow

export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.toast {
  background-color: #939191;
  border: 1px solid #000000;
  border-radius: 10px;
  left: 0;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  right: 0;
  top: 20px;
  width: 20vw;
  z-index: 999;
}
</style>
