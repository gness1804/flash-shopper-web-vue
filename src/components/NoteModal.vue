<template>
  <div class="modal note-modal">
    <p
      v-on:click="closeModal"
      class="close-modal-button"
      title="Close"
    >
      X
    </p>
    <h2>Edit Note</h2>
    <textarea
      class="note-input"
      v-model="noteString"
    >
    </textarea>
    <button
      class="button save-note-button"
      v-on:click="saveNote"
    >
      {{saveString}}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';

export default {
  name: 'noteModal',
  props: {
    note: {
      type: String,
      required: true,
    },
  },
  methods: {
    closeModal: function (): void {
      this.$emit('closeNoteModal');
    },
    saveNote: function (): void {
      if (this.noteString) {
        this.$emit('saveNote', this.noteString);
        this.closeModal();
      }
    },
  },
  data(): {
    noteString: string,
    saveString: string,
  } {
    return {
      noteString: this.note,
      saveString: buttonStrings.save,
    };
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




