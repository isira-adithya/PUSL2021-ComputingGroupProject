// Important libraries
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
import axios from 'axios';
import VueGoogleMaps from '@fawmi/vue-google-maps';

// Components - General
import TemplateVue from './Template.vue';
import HomeVue from './pages/Home.vue';
// Components - Auth
import LoginVue from './pages/auth/Login.vue'; 
import LogoutVue from './pages/auth/Logout.vue'; 
import SignupVue from './pages/auth/Signup.vue'; 
import ForgotPasswordVue from './pages/auth/Forgot-Password.vue'; 
import PasswordResetVue from './pages/auth/Reset-Password.vue'; 
// Components - EventOwner
import VerificationVue from './pages/eventowner/Verification.vue';
import EventOwnerDashboardVue from './pages/eventowner/Dashboard.vue';
// Components - User
import UserProfileVue from './pages/user/Profile.vue';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faTrash, faRightToBracket);

// Routes
const routes = [
    { path: '/', component: HomeVue},

    // Auth
    { path: '/login', component: LoginVue},
    { path: '/logout', component: LogoutVue},
    { path: '/signup', component: SignupVue},
    { path: '/forgot-password', component: ForgotPasswordVue},
    { path: '/reset-password/:token', component: PasswordResetVue},
    { path: '/home', component: HomeVue},

    // EventOwner
    { path: '/eventowner/verification', component: VerificationVue},
    { path: '/eventowner/dashboard', component: EventOwnerDashboardVue},
    
    // User
    { path: '/user/profile', component: UserProfileVue},
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

const app = createApp(TemplateVue);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(bootstrap);
app.use(axios);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDnV2rwyXF7RyjlVqUM8OIqF8NyylUscAk'
    }
});

app.mount("#app");