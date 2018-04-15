<template>
  <div class="add-source-container">
    <input
      placeholder="Edit Source..."
      type="text"
      v-model="newSource"
      v-on:click="clearDefault"
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
    <button
      class="button clear-button"
      v-on:click="clear"
    >
      {{clearString}}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';
import httpValidate from '../helpers/httpValidate';
import display from '../helpers/displayVars';
import { AddSourceInt } from '../types/interfaces/OtherModals';

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
    clear: function (): void {
      this.newSource = '';
    },
    clearDefault: function (): void {
      if (this.newSource === display.addSourceDefault) {
        this.newSource = '';
      }
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
        await this.$emit('saveSource', display.addSourceDefault);
        this.$emit('hideAddSourceInput');
      }
    },
  },
  data(): AddSourceInt {
    return {
      newSource: this.source,
      saveString: buttonStrings.save,
      cancelString: buttonStrings.cancel,
      clearString: buttonStrings.clear,
    };
  },
};
</script>

<style scoped>

</style>


