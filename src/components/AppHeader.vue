<template>
  <div
    class="header"
  >
    <h1>Flash Shopper</h1>
  </div>
</template>

<script>
// @flow

export default {
  name: 'appHeader',
  props: {
    isUser: {
      type: Boolean,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>

</style>


