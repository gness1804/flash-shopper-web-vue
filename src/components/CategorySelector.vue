<template>
  <div class="categories-selector-container">
    <p>Categories:</p>
    <div class="categories">
      <div
        class="categories-selector-each-category"
        v-for="category of defaultCategories"
      >
        <label :for="category">
          <input
            type="checkbox"
            :id="category"
            :value="category"
            v-model="selectedCategories"
            v-on:change="changeCategory"
          />
          {{ category }}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
import type { CategoriesSelectorInt } from '../types/interfaces/CategoriesSelectorInt';

export default {
  name: 'CategorySelector',
  props: {
    defaultCategories: {
      type: Array,
      required: true,
    },
  },
  data(): CategoriesSelectorInt {
    return {
      selectedCategories: [],
    };
  },
  methods: {
    changeCategory: function(): void {
      this.$emit('changeCategory', this.selectedCategories);
    },
    resetSelectedCategories: function(): void {
      this.selectedCategories = [];
    },
  },
};
</script>
<style scoped>
.categories-selector-container {
  background-color: #fff;
  border: 1px solid #000;
  margin: 0 auto;
  padding: 10px;
  width: 60vw;
}

.categories-selector-container p {
  font-weight: 700;
}

.categories-selector-container .categories {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.categories-selector-each-category {
  margin-right: 20px;
}

.categories-selector-each-category label:hover,
.categories-selector-each-category input:hover {
  cursor: pointer;
}
</style>
