<template>
    <div>
      <div class="row" style="width: 100%; margin-left: 0px;">
        <div class="col-lg-2 col-4" style="padding: 0px;">
          <div class="d-flex flex-column px-3 text-white bg-black" style="height:100%;">
            <h5>Event Owner - Dashboard</h5>
            <hr />
            <ul class="nav px-lg-4 nav-pills flex-column mb-auto">
              <li class="nav-item">
                <router-link
                  :to="'/admin/dashboard/adminhome'"
                  href="#"
                  :class="page=='adminhome'?'nav-link active':'nav-link text-white'"
                  aria-current="page">
                  Home
                </router-link>
              </li>
              
            </ul>
            <hr />
          </div>
        </div>
        <div class="col" style="padding: 0px;">
          <AdminHome v-if="page=='adminhome'"/>

        </div>
      </div>
    </div>
  </template>
    
    <script>
import AdminHome from './AdminHome.vue';
  
  export default {
    name: "AdminDashboardVue",
    components: {
        AdminHome
    },
    mounted() {
      this.page = this.$route.path.split("/")[3];
    },
    updated() {
      this.page = this.$route.path.split("/")[3];
    },
    data() {
      return {
        page: "home"
      };
    },
    methods: {},
  };
  </script>
  