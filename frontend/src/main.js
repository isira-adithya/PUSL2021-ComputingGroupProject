// Important libraries
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import axios from 'axios';

// Components
import TemplateVue from './Template.vue';
import HomeVue from './pages/Home.vue';
import LoginVue from './pages/Login.vue'; 
import LogoutVue from './pages/Logout.vue'; 
import SignupVue from './pages/Signup.vue'; 
import ForgotPasswordVue from './pages/Forgot-Password.vue'; 

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