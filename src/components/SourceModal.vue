<template>
  <div class="modal source-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
    <p>Add PDF Source:</p>
    <input
      type="file"
      class="file-input-field pdf-source-input"
      accept=".pdf"
      v-on:change="addPDF"
    />
    <button
      class="button save-pdf-button"
      v-on:click="saveAndClose"
    >
      {{saveString}}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';

export default {
  name: 'sourceModal',
  data(): {
    reader: Object,
    pdfSource: Object,
    saveString: string,
  } {
    return {
      reader: new FileReader(),
      pdfSource: {},
      saveString: buttonStrings.save,
    };
  },
  methods: {
    addPDF: function (e: Object): void {
      try {
        this.pdfSource = e.target.files[0];
      } catch (error) {
        alert(error);
      }
    },
    closeModal: function (): void {
      this.$emit('closeSourceModal');
    },
    saveAndClose: function (): void {
      if (this.pdfSource) {
        this.$emit('addPDF', this.pdfSource);
      }
      this.$emit('closeSourceModal');
    },
  },
};
</script>

<style scoped>
  .close-modal-button {
    color: #f00;
  }

  .close-modal-button:hover {
    cursor: pointer;
  }
</style>


