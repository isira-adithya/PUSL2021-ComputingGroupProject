import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';

// Components
import HomeVue from './Home.vue';
import LoginVue from './components/Login.vue';

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
