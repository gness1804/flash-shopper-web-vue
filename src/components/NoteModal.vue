<template>
  <div class="modal note-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
    <h2>Edit Note</h2>
  </div>
</template>

<script>
// @flow

export default {
  name: 'noteModal',
  methods: {
    closeModal: function (): void {
      this.$emit('closeNoteModal');
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




