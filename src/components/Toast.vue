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

</style>


