<template>
  <div class="pre-auth">
    <h2>Sign Up or Sign In</h2>
    <input
      type="text"
      placeholder="Enter Your Email Address"
      v-model="email"
    />
    <input
      type="password"
      placeholder="Enter Your Password"
      v-model="password"
    />
  </div>
</template>

<script>
export default {
  name: 'PreAuth',
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

<style scoped>

</style>


