"use strict"

import Vue from './vue/vue';
import VueRouter from './vue/vue-router';
Vue.use(VueRouter);


import Home from './components/Home.vue';
import About from './components/About.vue';

const router = new VueRouter({
    //mode: 'history',
    routes: [
      { path: '', component: Home },
      { path: '/', component: Home },
      { path: '/about', component: About },
    ]
});

new Vue({
    router,
  }).$mount('#app');

