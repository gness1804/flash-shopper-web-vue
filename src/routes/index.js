import VueRouter from 'vue-router';
import Vue from 'vue';
import App from '../App';
import Pantry from '../components/Pantry';
import Recipes from '../components/Recipes';
import RecipeView from '../components/RecipeView';
import Error from '../components/Error';
import Completed from '../components/Completed';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: App,
    children: [{ path: '/404', from: '*', component: Error }],
  },
  {
    path: '/pantry',
    component: Pantry,
  },
  {
    path: '/recipes',
    component: Recipes,
  },
  {
    path: '/recipes/:id',
    component: RecipeView,
  },
  {
    path: '/completed',
    component: Completed,
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

export default router;
