// Important libraries
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';
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
import VerifyEmailVue from './pages/auth/Verify-Email.vue';
import ContactUsVue from './pages/auth/Contact-us.vue'; 

// Components - EventOwner
import VerificationVue from './pages/eventowner/Verification.vue';
import EventOwnerDashboardVue from './pages/eventowner/Dashboard.vue';

// Components - User
import UserProfileVue from './pages/user/Profile.vue';

//component - Public
import AboutUsVue from './pages/public/AboutUs.vue';
import EventsVue from './pages/public/Events.vue';
import EventVue from './pages/public/Event.vue';
import InteractiveMapVue from './components/InteractiveMap.vue';

//admin
import EventApproval from './pages/admin/Event-approval.vue';
import TicketList from './pages/admin/TicketList.vue'
import TicketView from './pages/admin/TicketView.vue'
// Components - Admin
import EventOwnerApproval from './pages/admin/EventOwnerApproval.vue';
import UserManagement from './pages/admin/User-management.vue';
import EventManagement from './pages/admin/Event-management.vue';

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
    { path: '/verify-email/:token', component: VerifyEmailVue},
    { path: '/home', component: HomeVue},
    { path: '/contact-us', component: ContactUsVue},

    // EventOwner
    { path: '/eventowner/verification', component: VerificationVue},
    { path: '/eventowner/dashboard/:page', component: EventOwnerDashboardVue},
    { path: '/eventowner/dashboard/event/:uuid', component: EventOwnerDashboardVue},
    
    // User
    { path: '/user/profile', component: UserProfileVue},

    // Public pages
    {path: '/about-us', component: AboutUsVue},
    {path: '/events', component: EventsVue},
    {path: '/events/:uuid', component: EventVue},
    {path: '/map', component: InteractiveMapVue},

    //admin pages
    {path: '/admin/event-approval', component: EventApproval},
    {path: '/admin/tickets', component: TicketList},
    {path: '/admin/ticket-view', component: TicketView},
   
    {path: '/admin/eventowner-approval', component: EventOwnerApproval},
    {path: '/admin/user-management', component: UserManagement},
    {path: '/admin/event-management', component: EventManagement}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Router guard for admin routes
router.beforeEach((to, from, next) => {
    if (to.path.includes('/admin')) {
        try {
            const session = JSON.parse(localStorage.getItem('session'));
            if (session.role == 'ADMIN') {
                next();
            }
        } catch (error) {
            next('/login');
        }
        next('/login');
    } else {
        next();
    }
});

const app = createApp(TemplateVue);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(bootstrap);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDnV2rwyXF7RyjlVqUM8OIqF8NyylUscAk'
    }
});

app.mount("#app");