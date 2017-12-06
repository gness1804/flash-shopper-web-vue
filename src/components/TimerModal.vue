<template>
  <div class="modal timer-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
    <p>Do you want to:</p>
    <!-- radio select area with two choices: "Start Stopwatch" or "Count Down."-->
    <!-- if stopwatch is chosen, a new window opens with the Google search for "start stopwatch." -->
    <!-- if count down is chosen, a hidden pair of dropdwns appears: one for number (1-60 in increments of 5) and the other for unit (seconds, minutes, hours) -->
    <!-- the user can then click on a button in this hidden area go to go a Google search for "set timer for ${time} ${units}" -->
  </div>
</template>

<script>
// @flow

export default {
  name: 'timerModal',
  methods: {
    closeModal: function (): void {
      this.$emit('closeTimerModal');
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


