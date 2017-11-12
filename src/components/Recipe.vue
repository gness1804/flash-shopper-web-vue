<template>
  <div class="each-recipe-container">
    <img
      class="recipe-thumbnail"
      v-bind:src="recipe.image"
    />
    <a
      href=""
    >
      {{recipe.title}}
    </a>
    <img
        class="large-icon remove-recipe-button"
        src="../assets/cancel-circle.png"
        v-on:click="removeRecipe"
        title="Delete Recipe"
      />
  </div>
</template>

<script>
// @flow

export default {
  name: 'recipe',
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeRecipe: function (): void {
      const warning = confirm('Do you really want to delete this recipe? This cannot be undone!');
      if (warning) {
        this.$emit('removeRecipe', this.recipe);
      }
    },
  },
};
</script>

<style scoped>
  .recipe-thumbnail {
    background-color: #fff;
    border-radius: 50%;
    height: 50px;
    margin-right: 20px;
    width: 50px;
  }
</style>

