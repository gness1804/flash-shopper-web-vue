<template>
  <div class="categories-selector-container">
    <p>Categories:</p>
    <p v-if="loading">Loading...</p>
    <div v-else class="categories">
      <div
        class="categories-selector-each-category"
        v-for="category of defaultCategories"
      >
        <label :for="category">
          <input
            type="checkbox"
            :id="category"
            class="checkbox"
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
    initCategories: {
      type: Array,
      required: false,
    },
  },
  data(): CategoriesSelectorInt {
    return {
      selectedCategories: [],
      loading: false,
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
  mounted: async function(): void {
    await setTimeout(() => {
      if (this.initCategories && this.initCategories.length) {
        this.$emit('changeCategory', this.initCategories);
        this.initCategories.forEach(cat => {
          const elem = document.querySelector(`#${cat}`);
          elem.checked = true;
        });
      }
    }, 5000);
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
