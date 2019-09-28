import Vue from 'vue';
import VueRouter from 'vue-router';
import UserList from "./components/UserList";
import UserEdit from "./components/UserEdit";
import UserCreate from "./components/UserCreate";
import UserDashboard from "./components/UserDashboard";
import Login from "./components/Login";
import Register from "./components/Register";

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
            path: '/register',
            component: Register,
            name: 'register',
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
                role: true
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
            path: '*',
            redirect: '/'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('user') === null) {
            next({
                name: 'login',
                params: {
                    nextUrl: to.fullPath
                }
            });
        } else {
            let user = JSON.parse(localStorage.getItem('user'));
            if (to.matched.some(record => record.meta.role)) {
                if (user.roles[0].role === "GeneraManager" || user.roles[0].role === "Manager") {
                    next();
                } else {
                    next({name: 'userdashboard'});
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('user') === null) {
            next();
        } else {
            next({name: 'userdashboard'});
        }
    } else {
        next();
    }
});

export default router;
