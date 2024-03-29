import AuthIndex from "../front/views/AuthIndex.vue";
import Login from "../front/views/UserLogin.vue";
import Register from "../front/views/UserRegister.vue";

export default [
    {
        path: '/auth',
        name: 'auth-index',
        component: AuthIndex,
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'register',
                name: 'register',
                component: Register
            }
        ]
    },
]