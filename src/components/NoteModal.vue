<template>
  <div class="modal note-modal">
    <p v-on:click="closeModal" class="close-modal-button" title="Close">X</p>
    <h2>Edit Note</h2>
    <textarea class="note-input" v-model="noteString"> </textarea>
    <img
      class="icon clear-note-button"
      src="../assets/cancel-circle.png"
      v-on:click="clearNote"
      title="Clear Note"
    />
    <button class="button save-note-button" v-on:click="saveNote">
      {{ saveString }}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';
import { NoteModalInt } from '../types/interfaces/OtherModals';

export default {
  name: 'noteModal',
  props: {
    note: {
      type: String,
      required: true,
    },
  },
  methods: {
    clearNote: function(): void {
      this.noteString = '';
    },
    closeModal: function(): void {
      if (this.noteString !== this.note) {
        const warn = confirm(
          'Are you use you want to leave without saving changes?',
        );
        if (warn) {
          this.$emit('closeNoteModal');
          return;
        }
        return;
      }
      this.$emit('closeNoteModal');
    },
    saveNote: async function(): void {
      if (this.noteString) {
        await this.$emit('saveNote', this.noteString);
        this.$emit('closeNoteModal');
      }
    },
  },
  data(): NoteModalInt {
    return {
      noteString: this.note,
      saveString: buttonStrings.save,
    };
  },
};
</script>

<style scoped>
.close-modal-button {
  color: #ff0000;
}

.close-modal-button:hover {
  cursor: pointer;
}

.note-input {
  height: 50%;
  width: 60%;
}

.save-note-button {
  display: block;
  margin: 30px auto;
}
</style>
