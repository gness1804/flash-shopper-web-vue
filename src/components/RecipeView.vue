<template>
  <div class="recipe-view">
    <p>I am the recipe view component.</p>
  </div>
</template>

<script>
export default {
  name: 'recipeView',
  data(): {
    id: string,
  } {
    return {
      id: '',
    };
  },
  mounted: function (): void {
    this.id = this.$route.params.id;
  },
};
</script>

<style scoped>

</style>


