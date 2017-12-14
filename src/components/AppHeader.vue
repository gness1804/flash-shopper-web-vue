<template>
  <div
    class="header"
  >
    <h1>Flash Shopper</h1>
    <p
      v-if="isUser"
      class="user-logged-in-message"
    >
    Logged in as <span class="bold">{{userEmail}}</span>
    </p>
    <p
      v-else
      class="not-logged-in-message"
    >
      You are not logged in. Please go home and log in now.
    </p>
    <button
      class="button warn-button log-out-button"
      v-if="isUser"
      v-on:click="logOut"
    >
    {{logOutString}}
    </button>
  </div>
</template>

<script>
// @flow
import buttonStrings from '../helpers/buttonStrings';

export default {
  name: 'appHeader',
  props: {
    isUser: {
      type: Boolean,
      required: true,
    },
    userEmail: {
      type: String,
      required: false,
    },
  },
  data(): {
    logOutString: string,
  } {
    return {
      logOutString: buttonStrings.logOut,
    };
  },
  methods: {
    logOut: function (): void {
      this.$emit('logOut');
    },
  },
};
</script>

<style>

</style>


