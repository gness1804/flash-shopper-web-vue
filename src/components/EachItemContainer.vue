<template>
  <div class="each-item-container">
    <h3
      class="each-item-name"
      contenteditable
      @input="updateName"
      v-bind:title="title"
      v-bind:class="{ strike: item.inCart }"
    >
    {{item.name}}
    </h3>
    <p
      v-if="item.aisle"
      v-bind:class="{ strike: item.inCart }"
    >
      <span
        class="bold"
      >
      Aisle:
      </span
      >
      {{item.aisle}}
    </p>
    <p
      v-if="item.note"
      v-bind:class="{ strike: item.inCart }"
    >
      <span
        class="bold"
      >
      Note:
      </span
      >
      {{item.note}}
    </p>
    <p
      v-if="item.quantity"
      v-bind:class="{ strike: item.inCart }"
    >
      <span
        class="bold"
      >
      Quantity:
      </span
      >
      {{item.quantity}}
    </p>
    <div class="buttons-container">
      <img
        class="icon"
        src="../assets/cancel-circle.png"
        v-on:click="removeItem"
      />
      <img
        class="icon"
        src="../assets/cart.png"
        v-on:click="toggleInCart"
      />
      <img
        class="icon"
        src="../assets/amazon-prime-now.png"
        v-on:click="addToAPN"
      />
      <img
        class="icon"
        src="../assets/instacart.png"
        v-on:click="addToInstacart"
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
  data() {
    return {
      title: 'Click to Edit!',
    };
  },
  methods: {
    addToAPN: function () {
      this.$emit('addToAPN', this.item);
    },
    addToInstacart: function () {
      this.$emit('addToInstacart', this.item);
    },
    removeItem: function () {
      const warning = confirm(`Are you sure you want to delete ${this.item.name}? This cannot be undone!`);
      if (warning) {
        this.$emit('removeItem', this.item);
      }
    },
    toggleInCart: function () {
      this.$emit('toggleInCart', this.item);
    },
    updateName: function (e) {
      const newText = e.target.innerText;
      this.$emit('updateName', newText, this.item);
    },
  },
};
</script>

<style scoped>
  .each-item-container {
    border: 1px solid #000;
    border-radius: 5px;
    box-sizing: border-box;
    margin: 20px auto;
    padding: 10px;
    width: 40vw;
  }

  .each-item-name {
    cursor: pointer;
    margin-top: 0;
  }

  .buttons-container {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .strike {
    color:#9a8c8c;
    text-decoration: line-through;
  }

</style>

