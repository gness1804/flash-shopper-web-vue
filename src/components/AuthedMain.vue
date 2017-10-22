<template>
  <div class="authed-main">
    <div
      class="items-container"
      v-if="items.length > 0"
    >
    </div>
    <no-items
      v-else
    >
    </no-items>
  </div>
</template>

<script>
import NoItems from './NoItems';

export default {
  name: 'AuthedMain',
  components: {
    NoItems,
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


