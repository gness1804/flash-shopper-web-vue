<template>
  <div
    class="app-header"
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
          class="button header-button warn-button log-out-button"
          v-on:click="logOut"
        >
          {{logOutString}}
        </button>
        <button
          class="button header-button go-home-button"
          v-on:click="goHome"
          v-bind:disabled="currentRoute === '/'"
          v-bind:class="{ disabledButton: currentRoute === '/' }"
        >
          {{goHomeString}}
        </button>
        <button
          class="button header-button go-to-pantry-button"
          v-on:click="goToPantry"
          v-bind:disabled="currentRoute === '/pantry'"
          v-bind:class="{ disabledButton: currentRoute === '/pantry' }"
        >
        {{goToPantryString}}
      </button>
      <button
        class="button header-button go-to-recipes-button"
        v-on:click="goToRecipes"
        v-bind:disabled="currentRoute === '/recipes'"
        v-bind:class="{ disabledButton: currentRoute === '/recipes' }"
      >
        {{goToRecipesString}}
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
      <button
          class="button header-button go-home-button"
          v-on:click="goHome"
        >
          {{goHomeString}}
        </button>
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
    goToPantryString: string,
    goToRecipesString: string,
    currentRoute: string,
  } {
    return {
      logOutString: buttonStrings.logOut,
      goHomeString: buttonStrings.goHome,
      goToPantryString: buttonStrings.goToPantry,
      goToRecipesString: buttonStrings.goToRecipes,
      currentRoute: '',
    };
  },
  methods: {
    goHome: function (): void {
      if (this.$router) {
        this.$router.push('/');
      }
    },
    goToPantry: function (): void {
      if (this.$router) {
        this.$router.push('/pantry');
      }
    },
    goToRecipes: function (): void {
      if (this.$router) {
        this.$router.push('/recipes');
      }
    },
    logOut: function (): void {
      this.$emit('logOut');
    },
  },
  mounted: function (): void {
    if (this.$route) {
      this.currentRoute = this.$route.fullPath;
    }
  },
};
</script>

<style>
.app-header {
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  margin-bottom: 80px;
  width: 100vw;
}

.logged-in-buttons-container {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 60px auto 20px;
  width: 60vw;
}

.button.header-button {
  margin-right: 15px;
}

.button.disabledButton {
  background-color: #ffffff;
  border: none;
  color: #3c3ce5;
}

.button.disabledButton:hover {
  background-color: #ffffff;
  border: none;
  color: #3c3ce5;
  cursor: auto;
}

.logged-out-container .go-home-button {
  margin-bottom: 20px;
}

@media (max-width: 500px)  {
  .logged-in-buttons-container {
    flex-direction: column;
  }

  .button.header-button {
    border-radius: 10px;
    font-size: 20px;
    margin-bottom: 5%;
    margin-right: 0;
    padding: 10px;
    width: 80%;
  }
}
</style>


