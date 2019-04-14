import Vue from 'vue';
import Router from 'vue-router';

import Home from './views/Home.vue';
import CurrencyForm from './views/CurrencyForm.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add',
      name: 'AddCurrency',
      component: CurrencyForm
    },
    {
      path: '/edit/:id',
      name: 'EditCurrency',
      component: CurrencyForm,
      props: true
    }
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
});
