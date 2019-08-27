"use strict"

import Vue from './vue/vue';
import VueRouter from './vue/vue-router';
Vue.use(VueRouter);


import Home from './components/Home.vue';
import _Components_ from './components/_Components_.vue';
import _404_ from './components/_404_.vue';



import Button from './components/Button.vue';
import Navbar from './components/Navbar.vue';
import Slider from './components/Slider.vue';
import Swipemenu from './components/Swipemenu.vue';
import Inputs from './components/Inputs.vue';

import List from './components/List.vue';

const router = new VueRouter({
    //mode: 'history',
    routes: [
      { path: '', component: Home },
      { path: '/components', component: _Components_ },

      { path: '/slider', component: Slider },
      { path: '/swipemenu', component: Swipemenu },
      { path: '/inputs', component: Inputs },
      
      { path: '/navbar', component: Navbar },
      { path: '/button', component: Button },
      { path: '/list', component: List },
      { path: '*', component: _404_ },

    ]
});

new Vue({
    router,
  }).$mount('#app');

