<template>
  <div id="completed">
    <app-header
      v-bind:isUser="isUser"
      v-bind:userEmail="userEmail"
      v-on:logOut="logOut"
    >
    </app-header>
    <p>I am the completed items.</p>
  </div>
</template>

<script>
// @flow
import AppHeader from './AppHeader';
import logOut from '../helpers/logOut';

interface Data {
  isUser: boolean,
  userEmail: string,
}

export default {
  name: 'completed',
  components: {
    AppHeader,
  },
  data(): Data {
    return {
      isUser: false,
      userEmail: '',
    };
  },
  methods: {
    logOut: function (): void {
      logOut();
    },
  },
};
</script>


<style scoped>

</style>


