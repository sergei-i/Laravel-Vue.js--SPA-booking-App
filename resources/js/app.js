require('./bootstrap');

import router from './routes';
import VueRouter from 'vue-router';
import Index from './Index';

import StarRating from './shared/components/StarRating';

window.Vue = require('vue');

Vue.use(VueRouter);

Vue.component('star-rating', StarRating); // register component globally

const app = new Vue({
    el: '#app',
    router,
    components: {
        Index
    }
});
