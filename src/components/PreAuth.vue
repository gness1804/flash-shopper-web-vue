<template>
  <div class="pre-auth">
    <h2 class="headline">Sign Up or Sign In</h2>
    <p class="error-message-container" v-if="error">{{ errorMssg }}</p>
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
    <button class="button green-button log-in-button" v-on:click="logIn">
      Log In
    </button>
    <button class="button sign-up-button" v-on:click="signUp">Sign Up</button>
    <button
      class="button warn-button reset-password-button"
      v-on:click="resetPassword"
    >
      Reset Password
    </button>
  </div>
</template>

<script>
// @flow

import * as firebase from 'firebase';
import { PreAuthInt } from '../types/interfaces/CoreFunc';

export default {
  name: 'PreAuth',
  data(): PreAuthInt {
    return {
      email: '',
      password: '',
      errorMssg: '',
      error: false,
    };
  },
  methods: {
    logIn: function(): void {
      const { email, password } = this;
      if (!email || !password) {
        this.triggerErrorState(
          'Oops! You need both an email address and a password to log in. Please try again.',
        );
        return;
      }
      const promise = new Promise(resolve => {
        resolve(firebase.auth().signInWithEmailAndPassword(email, password));
      });
      promise
        .then(() => {
          this.resetEmailAndPWStates();
        })
        .catch(() => {
          this.showAuthError();
        });
    },
    makeErrorFalse: function(): void {
      this.error = false;
      this.errorMssg = '';
    },
    resetEmailAndPWStates: function(): void {
      this.email = '';
      this.password = '';
    },
    resetPassword: function(): void {
      const recEmail = prompt(
        'Please enter your email address below and click OK. Instructions for password reset will be emailed to you.',
      );
      if (recEmail) {
        firebase
          .auth()
          .sendPasswordResetEmail(recEmail)
          .then(() => {
            this.showRecoveryEmailAlert();
          })
          .catch(() => {
            this.showRecoveryError();
          });
      }
    },
    showAuthError: function(): void {
      this.triggerErrorState(
        'There was an error with authentication. Please check your credentials and try again.',
      );
    },
    showRecoveryEmailAlert: function(): void {
      alert(
        'If there is an account associated with the email you provided, an email has been sent to it with instructions on resetting your password.',
      );
    },
    showRecoveryError: function(): void {
      this.triggerErrorState(
        'There was a problem sending the password recovery email. Please ensure that you created an account under this password and that your email is in a valid format (foo@foobar.com).',
      );
    },
    signUp: function(): void {
      const { email, password } = this;
      if (!email || !password) {
        this.triggerErrorState(
          'Oops! You need both an email address and a password to sign up. Please try again.',
        );
        return;
      }
      const promise = new Promise(resolve => {
        resolve(
          firebase.auth().createUserWithEmailAndPassword(email, password),
        );
      });
      promise
        .then(() => {
          this.resetEmailAndPWStates();
        })
        .catch(() => {
          this.showAuthError();
        });
    },
    triggerErrorState: function(message: string): void {
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

.log-in-button {
  border-radius: 5px;
  display: block;
  font-size: 16px;
  margin: 40px auto 120px;
  padding: 15px;
}

.sign-up-button {
  margin-right: 20px;
}

.error-message-container {
  color: #ff0000;
}
</style>
