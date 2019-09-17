import Vue from 'vue';
import VueRouter from 'vue-router';
import Test from "./components/Test";
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Test,
            name: 'test'
        },
        {
            path: '/userlist',
            component: UserList,
            name: 'userlist'
        },
        {
            path: '/useredit/:id',
            component: UserEdit,
            name: 'useredit'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

export default router;
