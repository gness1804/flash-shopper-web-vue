<template>
  <div class="authed-main">
    <div
      class="items-container"
      v-if="items.length > 0"
    >
      <each-item-container
        v-for="item of items"
        v-bind:key="item.id"
        v-bind:item="item"
      >
      </each-item-container>
    </div>
    <no-items
      v-else
    >
    </no-items>
  </div>
</template>

<script>
import NoItems from './NoItems';
import EachItemContainer from './EachItemContainer';

export default {
  name: 'AuthedMain',
  components: {
    NoItems,
    EachItemContainer,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>


