// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import Pantry from './components/Pantry';
import Error from './components/Error';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '/404', from: '*', component: Error },
    ],
  },
  {
    path: '/pantry',
    component: Pantry,
  },
  {
    path: '/404',
    component: Error,
  },
  {
    path: '*',
    component: Error,
  },
];

Vue.config.productionTip = false;

const router = new VueRouter({
  routes,
});

/* eslint-disable no-new */
new Vue({
  router,
}).$mount('#app');
