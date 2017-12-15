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
        >
          {{goHomeString}}
        </button>
        <button
          class="button header-button go-to-pantry-button"
          v-on:click="goToPantry"
        >
        {{goToPantryString}}
      </button>
      <button
        class="button header-button go-to-recipes-button"
        v-on:click="goToRecipes"
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
  } {
    return {
      logOutString: buttonStrings.logOut,
      goHomeString: buttonStrings.goHome,
      goToPantryString: buttonStrings.goToPantry,
      goToRecipesString: buttonStrings.goToRecipes,
    };
  },
  methods: {
    goHome: function (): void {
      this.$router.push('/');
    },
    goToPantry: function (): void {
      this.$router.push('/pantry');
    },
    goToRecipes: function (): void {
      this.$router.push('/recipes');
    },
    logOut: function (): void {
      this.$emit('logOut');
    },
  },
};
</script>

<style>
.app-header {
  /* box-shadow: -1px 4px 5px 0px rgba(0,0,0,0.75); */
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


