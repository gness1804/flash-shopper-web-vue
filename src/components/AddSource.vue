<template>
  <div class="add-source-container">
    <input
      placeholder="Edit Source..."
      type="text"
      v-model="newSource"
    />
    <button
      class="button save-source-button"
      v-on:click="saveSource"
    >
      {{saveString}}
    </button>
    <button
      class="button cancel-button"
      v-on:click="cancel"
    >
      {{cancelString}}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';
import httpValidate from '../helpers/httpValidate';

export default {
  name: 'addSource',
  props: {
    source: {
      type: String,
      required: false,
    },
  },
  methods: {
    cancel: function (): void {
      if (this.source !== this.newSource) {
        const warn = confirm('Are you use you want to leave without saving changes?');
        if (warn) {
          this.$emit('hideAddSourceInput');
          return;
        }
        return;
      }
      this.$emit('hideAddSourceInput');
    },
    saveSource: async function (): void {
      if (this.newSource) {
        if (!httpValidate(this.newSource)) {
          alert('Oops! Your source must be a valid URL.');
          return;
        }
        await this.$emit('saveSource', this.newSource);
        this.$emit('hideAddSourceInput');
      } else {
        await this.$emit('saveSource', 'Add a source.');
        this.$emit('hideAddSourceInput');
      }
    },
  },
  data(): {
    newSource: string,
    saveString: string,
    cancelString: string,
  } {
    return {
      newSource: this.source,
      saveString: buttonStrings.save,
      cancelString: buttonStrings.cancel,
    };
  },
};
</script>

<style scoped>

</style>


