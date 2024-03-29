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
import BuyTicket from './pages/user/BuyTickets.vue'
import ReceiptListVue from './pages/user/ReceiptList.vue'
import TicketReciept from './pages/user/TicketReciept.vue'

//component - Public
import AboutUsVue from './pages/public/AboutUs.vue';
import EventsVue from './pages/public/Events.vue';
import EventVue from './pages/public/Event.vue';
import InteractiveMapVue from './components/InteractiveMap.vue';


// Components - Admin

import TicketList from './pages/admin/TicketList.vue';
import AdminUserVue from './pages/admin/User.vue';
import AdminEvent from './pages/admin/Event.vue';
import AdminEventManagement from './pages/admin/Event-management.vue';
import AdminUserManagement from './pages/admin/User-management.vue';
import SupportTickets from './pages/admin/SupportTickets.vue';
import SupportTicketView from './pages/admin/SupportTicketView.vue';
import AdminDashboard from './pages/admin/AdminDashboard';

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
    { path: '/eventowner/dashboard/ticket-payments/:id', component: EventOwnerDashboardVue},
    
    // User
    {path: '/user/profile', component: UserProfileVue},
    {path: '/user/buyticket/:id', component: BuyTicket},
    {path: '/user/tickets', component: ReceiptListVue},
    {path: '/user/tickets/:id', component: TicketReciept},

    // Public pages
    {path: '/about-us', component: AboutUsVue},
    {path: '/events', component: EventsVue},
    {path: '/events/:uuid', component: EventVue},
    {path: '/map', component: InteractiveMapVue},

    //admin pages
    {path: '/admin/tickets', component: TicketList},
    {path: '/admin/user-management/', component: AdminUserManagement},
    {path: '/admin/user-management/:user_id', component: AdminUserVue},
    {path: '/admin/event-management', component: AdminEventManagement},
    {path: '/admin/support-ticket-list', component: SupportTickets},
    {path: '/admin/support-ticket-view', component: SupportTicketView},
    {path: '/admin/event-management/:uuid', component: AdminEvent},
    {path: '/admin/dashboard/:page', component: AdminDashboard},
    {path: '/admin/dashboard/ticket/:id', component: AdminDashboard},

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
            } else {
                next('/login');
            }
        } catch (error) {
            next('/login');
        }
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