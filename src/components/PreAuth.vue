<template>
  <div class="pre-auth">
    <h2 class="headline">Sign Up or Sign In</h2>
    <p
      class="error-message-container"
      v-if="error"
    >
    {{errorMssg}}
    </p>
    <div class="input-container">
      <input
        type="email"
        @input="makeErrorFalse"
        class="text-input-field email-field"
        placeholder="Enter Your Email Address"
        v-model="email"
      />
      <input
        type="password"
        @input="makeErrorFalse"
        class="text-input-field password-field"
        placeholder="Enter Your Password"
        v-model="password"
      />
    </div>
    <div class="buttons-container">
      <button
        class="button auth-button sign-up-button"
        v-on:click="signUp"
      >
        Sign Up
      </button>
      <button
        class="button auth-button"
        v-on:click="logIn"
      >
        Log In
      </button>
      <button
        class="button auth-button"
        v-on:click="resetPassword"
      >
        Reset Password
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
      errorMssg: '',
      error: false,
    };
  },
  methods: {
    logIn: function () {
      const { email, password } = this;
      if (!email || !password) {
        alert('Oops! You need both an email address and a password to log in. Please try again.');
        return;
      }
      const promise = new Promise((resolve) => {
        resolve(
          firebase.auth().signInWithEmailAndPassword(email, password),
        );
      });
      promise
        .then(() => { this.resetEmailAndPWStates(); })
        .catch(() => { this.showAuthError(); });
    },
    makeErrorFalse: function () {
      this.error = false;
      this.errorMssg = '';
    },
    resetEmailAndPWStates: function () {
      this.email = '';
      this.password = '';
    },
    resetPassword: function () {
      const recEmail = prompt('Please enter your email address below and click OK. Instructions for password reset will be emailed to you.');
      if (recEmail) {
        firebase.auth().sendPasswordResetEmail(recEmail)
          .then(() => { this.showRecoveryEmailAlert(); })
          .catch(() => { this.showRecoveryError(); });
      }
    },
    showAuthError: function () {
      alert('There was an error with authentication. Please check your credentials and try again.');
    },
    showRecoveryEmailAlert: function () {
      alert('If there is an account associated with the email you provided, an email has been sent to it with instructions on resetting your password.');
    },
    showRecoveryError: function () {
      alert('There was a problem sending the password recovery email. Please ensure that you created an account under this password and that your email is in a valid format (foo@foobar.com).');
    },
    signUp: function () {
      const { email, password } = this;
      if (!email || !password) {
        this.triggerErrorState('Oops! You need both an email address and a password to sign up. Please try again.');
        return;
      }
      const promise = new Promise((resolve) => {
        resolve(
          firebase.auth().createUserWithEmailAndPassword(email, password),
        );
      });
      promise
        .then(() => { this.resetEmailAndPWStates(); })
        .catch(() => { this.showAuthError(); });
    },
    triggerErrorState: function (message) {
      this.error = true;
      this.errorMssg = message;
    },
  },
};
</script>

<style scoped>
  .input-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 40px auto;
  }
  .buttons-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .auth-button {
    margin-bottom: 20px;
  }
  .error-message-container {
    color: #F00;
  }
</style>


