<template>
  <div id="pantry">
    <h2>Pantry</h2>
    <button
      class="button go-home-button"
      v-on:click="goHome"
    >
      Go Home
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    goHome: function () {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

</style>


