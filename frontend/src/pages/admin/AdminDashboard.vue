<template>
    <div>
      <div class="row" style="width: 100%; margin-left: 0px;">
        <div class="col-lg-2 col-4" style="padding: 0px;">
          <div class="d-flex flex-column px-3 text-white bg-black" style="height:100%;">
            <h5>Admin - Dashboard</h5>
            <hr />
            <ul class="nav px-lg-4 nav-pills flex-column mb-auto">

              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/usermanagement'"
                  href="#"
                  :class="page=='usermanagement'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  User Management
                </router-link>
              </li>
              
              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/eventmanagement'"
                  href="#"
                  :class="page=='eventmanagement'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  Event Management
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/supportticketlist'"
                  href="#"
                  :class="page=='supportticketlist'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  Support Ticket
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/ticketlist'"
                  href="#"
                  :class="page=='ticketlist'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  Ticket List
                </router-link>
              </li>

              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/eventownerapproval'"
                  href="#"
                  :class="page=='eventownerapproval'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  Event Owner Approval
                </router-link>
              </li>

            </ul>
            <hr />
          </div>
        </div>
        <div class="col" style="padding: 0px;">
          <UserManagement v-if="page=='usermanagement'"/>
          <EventManagement v-if="page=='eventmanagement'"/>
          <SupportTicketList v-if="page=='supportticketlist'"/>
          <EventOwnerApproval v-if="page=='eventownerapproval'"/>
          <TicketList v-if="page=='ticketlist'"/>
        </div> 
      </div>
    </div>
  </template>
    
    <script>

import UserManagement from './User-management.vue';  
import EventManagement from './Event-management.vue';
import SupportTicketList from './SupportTickets.vue';
import EventOwnerApproval from './EventOwnerApproval.vue';
import TicketList from './TicketList.vue';
  export default {
    name: "AdminDashboardVue",
    components: {
        UserManagement,
        EventManagement,
        SupportTicketList,
        EventOwnerApproval,
        TicketList,
    },
    mounted() {
      this.page = this.$route.path.split("/")[3];
    },
    updated() {
      this.page = this.$route.path.split("/")[3];
    },
    data() {
      return {
        page: "UserManagement"
      };
    },
    methods: {},
  };
  </script>
  