require('./bootstrap');

import router from './routes';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Index from './Index';

import StarRating from './shared/components/StarRating';
import FatalError from './shared/components/FatalError';
import Success from './shared/components/Success';
import ValidationErrors from './shared/components/ValidationErrors';
import storeDefinition from './store';

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.component('star-rating', StarRating); // register component globally
Vue.component('fatal-error', FatalError);
Vue.component('success', Success);
Vue.component('v-errors', ValidationErrors);

const store = new Vuex.Store(storeDefinition)

// intercept requests or responses before they are handled by then or catch
// https://github.com/axios/axios#interceptors
window.axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch('logout');
        }
        return Promise.reject(error);
    }
);

const app = new Vue({
    el: '#app',
    router,
    store,
    components: {
        Index
    },
    async beforeCreate() {
        await this.$store.dispatch('loadStoredState');
        await this.$store.dispatch('loadUser');
    }
});
