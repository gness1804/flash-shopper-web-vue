<template>
  <div class="add-ingredient-modal">
    <p
      v-on:click="closeModal"
    >X</p>
    <p>I am the Add Ingredient Modal.</p>
  </div>
</template>

<script>
export default {
  name: 'AddIngredientModal',
  methods: {
    closeModal: function () {
      this.$emit('closeModal');
    },
  },
};
</script>

<style scoped>
  .add-ingredient-modal {
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
    height: 80vw;
    left: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;
    position: fixed;
    right: 0;
    top: 50px;
    transition: opacity 0.3s ease;
    width: 80vw;
    z-index: 999;
  }
</style>


