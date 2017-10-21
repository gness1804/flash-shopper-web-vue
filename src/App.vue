<template>
  <div id="app">
    <h1>Flash Shopper</h1>
    <authed-main
      v-if="isUser"
    >
    </authed-main>

    <pre-auth
      v-else
    >
    </pre-auth>
  </div>
</template>

<script>
import PreAuth from './components/PreAuth';
import AuthedMain from './components/AuthedMain';

export default {
  name: 'app',
  components: {
    PreAuth,
    AuthedMain,
  },
  data() {
    return {
      isUser: false,
    };
  },
};
</script>

<style>
#app {
  text-align: center;
}
</style>
