<template>
  <label>
    <select
      v-if="isSafari && names.length > 0"
      v-model="name"
      class="safari-dropdown"
    >
      <option
        disabled
        value=""
      >
        Select a name
      </option>
      <option
        v-for="name in removeDuplicates"
        v-bind:key="name.id"
        v-bind:value="name"
        class="safari-dropdown-item"
      >
          {{name}}
      </option>
    </select>
  </label>
</template>
<script>
  export default {
    name: 'NamesSelectorSafari',
    props: {
      isSafari: {
        type: Boolean,
        required: true,
      },
      name: {
        type: String,
        required: false,
      },
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
<style scoped>

    .safari-dropdown {
        margin-bottom: 30px;
    }

    @media (max-width: 500px) {

    }

</style>
