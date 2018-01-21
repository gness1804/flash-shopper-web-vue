<template>
  <div class="ingredient">
    <div
      class="container"
      v-bind:class="{ highlighted: containsKeyText }"
    >
      <p
        class="ingredient-quantity"
      >{{ingredient.quantity}}</p>
      <p
        class="ingredient-name"
      >{{ingredient.name}}</p>
    <img
      class="icon delete-ingredient-icon"
      src="../assets/cancel-circle.png"
      v-on:click="removeIngredient"
      title="Delete Ingredient"
    />
    <img
      class="icon add-ingredient-icon"
      src="../assets/plus-icon-small.png"
      v-on:click="addIngredient"
      title="Add Ingredient"
    />
     <img
      class="icon edit-ingredient-icon"
      src="../assets/pencil.png"
      v-on:click="openEditModal"
      title="Edit Ingredient"
    />
    </div>
  </div>
</template>

<script>
// @flow
import containsDirString from '../helpers/containsDirString';

export default {
  name: 'Ingredient',
  props: {
    ingredient: {
      type: Object,
      required: true,
    },
    dirToCheckAgainst: {
      type: String,
      required: false,
    },
  },
  data(): {
      containsKeyText: boolean,
    } {
    return {
      containsKeyText: false,
    };
  },
  methods: {
    addIngredient: function (): void {
      this.$emit('transferIngredient', this.ingredient);
      this.containsKeyText = true;
      setTimeout(() => {
        this.containsKeyText = false;
      }, 3000);
    },
    openEditModal: function (): void {
      this.$emit('openEditModal', this.ingredient);
    },
    removeIngredient: function (): void {
      const warning = confirm(`Delete ${this.ingredient.name}: are you sure?`);
      if (warning) {
        this.$emit('removeIngredient', this.ingredient);
      }
    },
    showToast: function (message: string): void {
      this.$emit('showToast', message);
    },
  },
  watch: {
    dirToCheckAgainst: async function (newVal): void {
      this.containsKeyText = await containsDirString(newVal, this.ingredient.name);
      if (this.containsKeyText) {
        this.showToast('Ingredient(s) marked!');
      }
    },
  },
};
</script>

<style scoped>
  .container {
    align-items: center;
    border: 1px solid #000;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 10px auto;
    width: 60vw;
  }

  .ingredient-quantity {
    margin-right: 10px;
  }

  .ingredient-name {
    margin-right: 10px;
  }

  .highlighted {
    border: 2px solid #f00;
    background-color: #C56415;
  }
</style>


