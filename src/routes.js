import Vue from 'vue';
import VueRouter from 'vue-router';
import Test from "./components/Test";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Test,
            name: 'home'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

export default router;
