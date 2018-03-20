<template>
  <div class="number-selector">
    <select
          class="units-select"
          v-model="units"
        >
          <option
            v-for="num of nums"
            v-bind:key="num * Math.random()"
            v-bind:value="num"
          >
            {{num}}
          </option>
      </select>
  </div>
</template>

<script>
// @flow

interface Data {
  nums: number[],
  units: number,
}

export default {
  name: 'numberSelector',
  data(): Data {
    return {
      nums: [],
      units: 1,
    };
  },
  methods: {
    tabulateNumbers: function (): void {
      for (let i = 0; i < 101; i++) {
        if (i > 0) {
          this.nums.push(i);
        }
      }
    },
  },
  mounted: function (): void {
    this.tabulateNumbers();
  },
};
</script>

