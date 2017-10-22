<template>
  <div class="each-item-container">
    <h3>{{item.name}}</h3>
    <p>{{item.aisle}}</p>
    <p>{{item.note}}</p>
    <p>{{item.quantity}}</p>
    <div class="buttons-container">
      <img
        class="each-item-icon"
        src="../assets/cancel-circle.png"
        v-on:click="removeItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EachItemContainer',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeItem: function () {
      const warning = confirm(`Are you sure you want to delete ${this.item.name}? This cannot be undone!`);
      if (warning) {
        this.$emit('removeItem', this.item);
      }
    },
  },
};
</script>

<style scoped>
  .each-item-container {
    border: 1px solid #000;
    border-radius: 5px;
    margin: 20px auto;
    width: 40vw;
  }

</style>


