import VueRouter from 'vue-router';
import Bookables from './bookables/Bookables';
import Second from './components/Second';

const routes = [
    {
        path: '/',
        component: Bookables,
        name: 'home',
    },
    {
        path: '/second',
        component: Second,
        name: 'second',
    }
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

export default router;
