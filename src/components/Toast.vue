<template>
  <div class="toast">
    <p class="toast-message">{{message}}</p>
  </div>
</template>

<script>
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
    background-color:#c6b9b9;
    border: 1px solid #000;
    border-radius: 10px;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    right: 0;
    width: 20vw;
  }
</style>


