import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserCreate from "./components/UserCreate";
import UserDashboard from "./components/UserDashboard";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: UserList,
            name: 'home'
        },
        {
            path: '/userlist',
            component: UserList,
            name: 'userlist'
        },
        {
            path: '/usercreate',
            component: UserCreate,
            name: 'usercreate'
        },
        {
            path: '/useredit/:id',
            component: UserEdit,
            name: 'useredit'
        },
        {
            path: '/dashboard/:id',
            component: UserDashboard,
            name: 'userdashboard'
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

export default router;
