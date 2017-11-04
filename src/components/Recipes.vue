<template>
  <div id="recipes">
    <h2>Recipes</h2>
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
  name: 'Recipes',
  methods: {
    goHome: function () {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>

</style>


