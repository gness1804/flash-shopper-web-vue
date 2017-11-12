<template>
  <div class="each-recipe-container">
    <img
      class="recipe-thumbnail"
      v-bind:src="recipe.image"
    />
    <a
      href=""
      class="link recipe-link"
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
  .each-recipe-container {
    align-items: center;
    border: 1px solid #000;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 20px auto;
    padding: 10px;
    width: 40vw;
  }

  .recipe-thumbnail {
    background-color: #fff;
    border-radius: 50%;
    height: 50px;
    margin-right: 20px;
    width: 50px;
  }

  .recipe-link {
    margin-right: 20px;
  }
</style>

