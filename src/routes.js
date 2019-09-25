import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserCreate from "./components/UserCreate";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";

Vue.use(VueRouter);

let router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Login,
            name: 'login',
            meta: {
                guest: true
            }
        },
        {
            path: '/userlist',
            component: UserList,
            name: 'userlist',
            meta: {
                requiresAuth: true,
                role: 1 || 2
            }
        },
        {
            path: '/usercreate',
            component: UserCreate,
            name: 'usercreate',
            meta: {
                requiresAuth: true,
                role: true
            }
        },
        {
            path: '/useredit/:id',
            component: UserEdit,
            name: 'useredit',
            meta: {
                requiresAuth: true,
                role: true
            }
        },
        {
            path: '/dashboard',
            component: UserDashboard,
            name: 'userdashboard',
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/dashboard/:id',
            component: UserDashboard,
            name: 'admindashboard',
            meta: {
                requiresAuth: true,
                role: true
            }
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') === null) {
            next({
                name: 'login',
                params: {
                    nextUrl: to.fullPath
                }
            });
        } else {
            let user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some(record => record.meta.role)) {
                if (user.id_role === 1 || user.id_role === 2) {
                    next();
                } else {
                    next({name: 'userdashboard'});
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('jwt') === null) {
            next();
        } else {
            next({name: 'userdashboard'});
        }
    } else {
        next();
    }
});

export default router;
