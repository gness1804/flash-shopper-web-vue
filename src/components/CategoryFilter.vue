<template>
  <div class="category-filter-selector">
    <p>Filter Recipes by Category</p>
    <label>
      <select class="categories-select" @change="onSelectCat">
        <option selected disabled> Choose a Category</option>
        <option
          v-for="category of defaultCategories"
          v-bind:key="`${v4}${category}`"
          v-bind:value="category"
        >
          {{ category }}
        </option>
        <option>Show All</option>
      </select>
    </label>
  </div>
</template>
<script>
export default {
  name: 'CategoryFilter',
  props: {
    defaultCategories: {
      type: Array,
      required: true,
    },
    v4: {
      type: String,
      required: true,
    },
  },
  methods: {
    onSelectCat: function(e): void {
      this.$emit('selectCategoryFromFilter', e.target.value);
    },
  },
};
</script>
<style scoped>
.category-filter-selector {
  align-items: center;
  border: 1px solid #000;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px auto;
  padding: 10px;
  width: 40vw;
}

.category-filter-selector p {
  font-weight: 700;
  margin: 0;
}
</style>
