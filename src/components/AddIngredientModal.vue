<template>
  <div class="add-ingredient-modal">
    <p
      v-on:click="closeModal"
    >X</p>
   <h2>Add Ingredient</h2>
   <div class="item-input-container">
    <input
        type="text"
        placeholder="Name"
        @input="makeErrorFalse"
        v-model="name"
        class="text-input-field"
      />
        <input
        type="text"
        placeholder="Aisle"
        @input="makeErrorFalse"
        v-model="aisle"
        class="text-input-field"
      />
        <input
        type="text"
        placeholder="Note"
        @input="makeErrorFalse"
        v-model="note"
        class="text-input-field"
        />
        <input
        type="text"
        placeholder="Quantity"
        @input="makeErrorFalse"
        v-model="quantity"
        class="text-input-field"
        />
   </div>
   <button
    class="button add-ingredient-modal-button"
    v-on:click="addIngredient"
   >
     Add Ingredient
   </button>
  </div>
</template>

<script>
export default {
  name: 'AddIngredientModal',
  data() {
    return {
      name: '',
      aisle: '',
      note: '',
      quantity: '',
      error: false,
      errorMssg: '',
    };
  },
  methods: {
    addIngredient: function () {

    },
    closeModal: function () {
      this.$emit('closeModal');
    },
    makeErrorFalse: function () {
      this.error = false;
      this.errorMssg = '';
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


