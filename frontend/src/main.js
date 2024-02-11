// Important libraries
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import axios from 'axios';

// Components
import TemplateVue from './Template.vue';
import HomeVue from './pages/Home.vue';
import LoginVue from './pages/auth/Login.vue'; 
import LogoutVue from './pages/auth/Logout.vue'; 
import SignupVue from './pages/auth/Signup.vue'; 
import ForgotPasswordVue from './pages/auth/Forgot-Password.vue'; 
import PasswordResetVue from './pages/auth/Reset-Password.vue'; 

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

// Routes
const routes = [
    { path: '/', component: HomeVue},
    { path: '/login', component: LoginVue},
    { path: '/logout', component: LogoutVue},
    { path: '/signup', component: SignupVue},
    { path: '/forgot-password', component: ForgotPasswordVue},
    { path: '/reset-password/:token', component: PasswordResetVue},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(TemplateVue);
app.use(router);
app.use(bootstrap);
app.use(axios);

app.mount("#app");