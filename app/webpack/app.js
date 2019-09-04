"use strict"

import Vue from './vue/vue';
import VueRouter from './vue/vue-router';
Vue.use(VueRouter);


import Home from './components/Home.vue';
import _Components_ from './components/_Components_.vue';
import _404_ from './components/_404_.vue';


import Box from './components/Box.vue';
import Button from './components/Button.vue';
import Navbar from './components/Navbar.vue';
import Seekbar from './components/Seekbar.vue';
import Swipemenu from './components/Swipemenu.vue';
import Inputs from './components/Inputs.vue';
import Carusel from './components/Carusel.vue';


import Checkbox from './components/Checkbox.vue';
import Switch from './components/Switch.vue';

import List from './components/List.vue';

const router = new VueRouter({
    //mode: 'history',
    routes: [
      { path: '', component: Home },
      { path: '/components', component: _Components_ },

      { path: '/components/:id', component: _Components_ },



      { path: '/box', component: Box },
      { path: '/checkbox', component: Checkbox },
      { path: '/seekbar', component: Seekbar },
      { path: '/swipemenu', component: Swipemenu },
      { path: '/inputs', component: Inputs },
      
      { path: '/navbar', component: Navbar },
      { path: '/button', component: Button },
      { path: '/list', component: List },
      { path: '/carusel', component: Carusel },
      { path: '/Switch', component: Switch },

      
      { path: '*', component: _404_ },

    ]
});

new Vue({
    router,
  }).$mount('#app');

