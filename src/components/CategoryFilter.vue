<template>
  <div class="category-filter-selector">
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
.categories-selector-container p {
  font-weight: 700;
}

.categories-selector-each-category label:hover,
.categories-selector-each-category input:hover {
  cursor: pointer;
}
</style>
