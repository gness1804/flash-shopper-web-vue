<template>
  <div
    class="header"
  >
    <h1>Flash Shopper</h1>
    <div
      v-if="isUser"
      class="logged-in-container"
    >
      <p
        class="user-logged-in-message"
      >
      Logged in as <span class="bold">{{userEmail}}</span>
      </p>
      <div
        class="logged-in-buttons-container"
      >
        <button
          class="button warn-button log-out-button"
          v-on:click="logOut"
        >
          {{logOutString}}
        </button>
        <button
          class="button go-home-button"
          v-on:click="goHome"
        >
        {{goHomeString}}
        </button>
      </div>
    </div>
    <div
      v-else
      class="logged-out-container"
    >
      <p

        class="not-logged-in-message"
      >
        You are not logged in. Please go home and log in now.
      </p>
    </div>
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
    goHomeString: string,
  } {
    return {
      logOutString: buttonStrings.logOut,
      goHomeString: buttonStrings.goHome,
    };
  },
  methods: {
    goHome: function (): void {
      this.$router.push('/');
    },
    logOut: function (): void {
      this.$emit('logOut');
    },
  },
};
</script>

<style>

</style>


