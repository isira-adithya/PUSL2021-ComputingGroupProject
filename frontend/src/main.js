import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';

// Components
import TemplateVue from './Template.vue';
import HomeVue from './pages/Home.vue';
import LoginVue from './pages/Login.vue'; 

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

// Routes
const routes = [
    { path: '/', component: HomeVue},
    { path: '/login', component: LoginVue},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(TemplateVue);
app.use(router);
app.use(bootstrap);


app.mount("#app");