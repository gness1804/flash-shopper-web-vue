<template>
  <div class="error-page">
    <h2 class="headline">Error: 404, or Some Such</h2>
    <p
      class="error-message"
    >Oops! You entered an invalid route or hit a broken link. If it's the former, please check your URL. If the latter, file an issue in the project's
      <a
        href="https://github.com/gness1804/flash-shopper-web-vue/issues"
        class="link"
        target="_blank"
        noopener
        noreferrer
      >
        Github repo.
      </a>
    </p>
    <button
    class="button go-home-button"
    v-on:click="goHome"
    >
    Go Home
    </button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  methods: {
    goHome: function () {
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .headline {
    margin-bottom: 60px;
  }

  .error-message {
    margin: 0 auto 60px;
    width: 80vw;
  }
</style>


