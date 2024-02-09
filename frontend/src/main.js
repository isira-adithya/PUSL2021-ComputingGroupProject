import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';

// Components
import HomeVue from './Home.vue';
import LoginVue from './components/Login.vue'; 

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

const app = createApp(HomeVue);
app.mount("#app");
app.use(router);
app.use(bootstrap);
