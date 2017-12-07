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
    <div
      class="stopwatch-container"
    >
      <a
        class="link stopwatch-link"
        v-bind:href="stopwatchLink"
        target="_blank"
      >
        Start Stopwatch
      </a>
      <img
        class="large-icon stopwatch-icon"
        src="../assets/stopwatch.png"
        v-on:click="startStopwatch"
        title="Start Stopwatch"
          />
    </div>
    <!-- if stopwatch is chosen, a new window opens with the Google search for "start stopwatch." -->
    <!-- if count down is chosen, a hidden pair of dropdwns appears: one for number (1-60 in increments of 5) and the other for unit (seconds, minutes, hours) -->
    <!-- the user can then click on a button in this hidden area go to go a Google search for "set timer for ${time} ${units}" -->
  </div>
</template>

<script>
// @flow

export default {
  name: 'timerModal',
  data() {
    return {
      stopwatchLink: 'https://www.google.com/search?q=start+stopwatch',
    };
  },
  methods: {
    closeModal: function (): void {
      this.$emit('closeTimerModal');
    },
    startStopwatch: function (): void {
      window.open('https://www.google.com/search?q=start+stopwatch');
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

  .stopwatch-container {
    align-items: center;
    border: 1px solid #000000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 40px auto;
    padding: 10px;
  }

  .stopwatch-link {
    margin-right: 20px;
  }
</style>


