<template>
  <div>
    <div class="user-navbar">
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="/assets/images/logo.png" alt="logo" class="custom-logo">
          </a>
          <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="sidebar offcanvas offcanvas-start" :style="sidebarStyles" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                <img src="/assets/images/logo.png" alt="logo" class="custom-logo">
              </h5>
              <button type="button" class="btn-close btn-close-white shadow-none border-0 " data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body d-flex flex-column flex-lg-row p-4 ">
              <ul class="navbar-nav justify-content-center align-items-center fs-5 flex-grow-1 pe-3">
                <li class="nav-item mx-2">
                  <router-link class="nav-link text-white " to="/home">Home</router-link>
                </li>
                <li class="nav-item mx-2">
                  <router-link class="nav-link text-white " to="/events">Events</router-link>
                </li>
                <li class="nav-item mx-2">
                  <router-link class="nav-link text-white " to="/aboutus">About Us</router-link>
                </li>
                <li class="nav-item mx-2">
                  <router-link class="nav-link text-white " to="/contactus">Contact Us</router-link>
                </li>
              </ul>    
              <div class="d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
                <router-link  v-if="!isLoggedIn" class="text-white text-decoration-none px-3 py-1 button-color rounded-1" to="/login">LOG IN</router-link>
                <router-link  v-if="isLoggedIn" class="text-white text-decoration-none px-3 py-1 button-color rounded-1" to="/logout">LOG OUT</router-link>
                <router-link  v-if="!isLoggedIn" class="text-white text-decoration-none px-3 py-1 button-color rounded-1" to="/signup">SIGN UP</router-link>
              </div>      
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div class="mx-4">
      <router-view></router-view>
    </div>

    <div class="mx-4">
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2 border-top">
        <p class="col-md-4 mb-0 text-body-secondary">
          &copy; 2024 EventHive, Inc
        </p>

        <a
          href="/"
          class="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <svg class="bi me-2" width="40" height="32">
            <use xlink:href="#bootstrap" />
          </svg>
        </a>

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <router-link to="/home" class="nav-link px-2 text-body-secondary">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/features" class="nav-link px-2 text-body-secondary">Features</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/faq" class="nav-link px-2 text-body-secondary">FAQs</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link px-2 text-body-secondary">About</router-link>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import Notiflix from "notiflix";

export default {
  name: "TemplateVue",
  components: {},
  mounted() {
    // Authentication WatchDog
    this.checkAuth();
    window.setInterval(() => {
      this.checkAuth();
    }, 5000);
  },
  methods: {
    checkAuth() {
      if (localStorage.getItem("isLoggedIn")){
        if (JSON.parse(localStorage.getItem("isLoggedIn"))){
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        
      } else {
        this.isLoggedIn = false;
      }
      if (
        document.location.href.includes("/user") ||
        document.location.href.includes("/eventowner") ||
        document.location.href.includes("/admin")
      ) {
        axios
          .get("/api/session")
          .then((data) => {
            
            if (data.data['success']){
              localStorage.setItem("isLoggedIn", JSON.stringify(true));
              localStorage.setItem("session", JSON.stringify(data.data['session']));

              const session = data.data['session'];
              // Checking EventOwners' verification status
              if ((session['role'] == "EVENT_OWNER") && (session['is_verified'] == false)){
                document.location.href = "/#/eventowner/verification";
              }
            }

          })
          .catch((err) => {
            // console.error(err);
            localStorage.setItem("isLoggedIn", JSON.stringify(false));
            if (!document.location.href.includes("/login")) {
              document.location.href = "/#/login";
              Notiflix.Report.failure(
                "You've been logged out",
                "Please sign-in again."
              );
            } else {
              console.log("yellow");
            }
          });
      }
    },
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  setup() {
    const sidebarStyles = {
      transition: 'transform 0.3s ease',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      '@media only screen and (max-width: 768px)': { 
        backgroundColor: 'rgba(0, 0, 0)',
        
      },
    };

      return {
        sidebarStyles,
      };
    },
  };
</script>
  
<style>
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

#app {
  font-family: "Poppins", sans-serif;
}

.user-navbar{
  background-color: rgb(0, 0, 0)
}
.button-color{
  background-color: #111F4D;
}
.custom-logo{
    height: stretch;
    width: 120px;
    margin: 0px !important;
    padding: 0px !important;
}
.nav-link:hover{
    color: rgb(207, 206, 206) !important;
}

</style>
  