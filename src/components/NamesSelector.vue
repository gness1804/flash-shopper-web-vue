<template>
  <datalist
    id="names"
    v-if="names.length > 0"
  >
      <option
        v-for="name in removeDuplicates"
        v-bind:key="name.id"
        v-bind:value="name"
      >
        {{name}}
      </option>
  </datalist>
</template>
<script>
  export default {
    name: 'NamesSelector',
    props: {
      names: {
        type: Array,
        required: false,
      },
      removeDuplicates: {
        type: Array,
        required: true,
      },
    },
  };
</script>
