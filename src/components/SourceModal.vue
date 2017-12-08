<template>
  <div class="modal source-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
  </div>
</template>

<script>
// @flow

export default {
  name: 'sourceModal',
  methods: {
    closeModal: function (): void {
      this.$emit('closeSourceModal');
    },
  },
};
</script>

<style scoped>
  .close-modal-button {
    color: #f00;
  }

  .close-modal-button:hover {
    cursor: pointer;
  }
</style>


