// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import http from 'http';
import router from './routes';

// ping the app every five minutes to keep Heroku dynos awake (prod only)
if (process.env.NODE_ENV === 'production') {
  setInterval(() => {
    http.get('https://flash-shopper-web.herokuapp.com');
  }, 300000); // every 5 minutes (300000)
}

// start the app
/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app');
