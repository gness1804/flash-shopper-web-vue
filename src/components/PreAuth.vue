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
    <div class="buttons">
      <button
        v-on:click="signUp"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'PreAuth',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    resetEmailAndPWStates: function () {
      this.email = '';
      this.password = '';
    },
    showSignUpError: function () {
      alert('There was an error with authentication. Please check your credentials and try again.');
    },
    signUp: function () {
      const { email, password } = this;
      if (!email || !password) {
        alert('Oops! You need both an email address and a password to sign up. Please try again.');
        return;
      }
      const promise = new Promise((resolve) => {
        resolve(
          firebase.auth().createUserWithEmailAndPassword(email, password),
        );
      });
      promise
        .then(() => { this.resetEmailAndPWStates(); })
        .catch(() => { this.showSignUpError(); });
    },
  },
};
</script>

<style scoped>

</style>


