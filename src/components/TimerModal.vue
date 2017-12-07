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
    <div
      class="timer-container"
    >
      <p
        class="count-from-text"
      >
        Count down from:
      </p>
      <div
        class="dropdowns-one"
      >
        <select
          class="timer-numbers-select"
          v-model="timeOne"
        >
          <option
            v-for="number of numbersOne"
            v-bind:key="number * Math.random()"
            v-bind:value="number.toString()"
          >
            {{number}}
          </option>
        </select>
        <select
          class="units-dropdown"
          v-model="unitsOne"
        >
          <option>seconds</option>
          <option>minutes</option>
          <option>hours</option>
        </select>
      </div>
      <div
        class="dropdowns-two"
      >
        <select
          class="timer-numbers-select"
          v-model="timeTwo"
        >
          <option
            v-for="number of numbersTwo"
            v-bind:key="number * Math.random()"
            v-bind:value="number.toString()"
          >
            {{number}}
          </option>
        </select>
        <select
          class="units-dropdown"
          v-model="unitsTwo"
        >
          <option>seconds</option>
          <option>minutes</option>
          <option>hours</option>
        </select>
      </div>
      <button
        class="button timer-button"
        v-on:click="startTimer"
      >
        Go!
      </button>
    </div>
  </div>
</template>

<script>
// @flow

export default {
  name: 'timerModal',
  data(): {
    numbersOne: Array<number>,
    numbersTwo: Array<number>,
    timeOne: string,
    unitsOne: string,
    timeTwo: string,
    unitsTwo: string,
    stopwatchLink: string,
  } {
    return {
      numbersOne: [],
      numbersTwo: [],
      timeOne: '5',
      unitsOne: 'minutes',
      timeTwo: '0',
      unitsTwo: '',
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
    startTimer: function (): void {

    },
  },
  mounted: function () {
    for (let i = 0; i < 105; i += 5) {
      if (i > 0) {
        this.numbersOne.push(i);
        this.numbersTwo.push(i);
      }
    }
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

  .stopwatch-container,
  .timer-container {
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

  .count-from-text,
  .dropdowns-one,
  .dropdowns-two {
    margin-right: 6vw;
  }

  @media (max-width: 500px) {
    .stopwatch-container,
    .timer-container {
      flex-direction: column;
    }

    .count-from-text,
    .dropdowns-one,
    .dropdowns-two {
      margin-right: 0;
      margin-bottom: 5vh;
    }
  }
</style>


