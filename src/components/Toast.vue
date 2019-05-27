<template>
  <div class="toast">
    <p class="toast-message">{{ message }}</p>
    <p
      v-if="undoMessage"
      v-on:click="onUndo"
      class="undo-message"
    >
      {{ undoMessage }}
   </p>
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
    undoMessage: {
      type: String,
      required: false,
    },
  },
  methods: {
    onUndo: function (): void {
      this.$emit('undoTransferToDone');
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

.undo-message {
  text-decoration: underline;
}

.undo-message:hover {
  cursor: pointer;
}
</style>
