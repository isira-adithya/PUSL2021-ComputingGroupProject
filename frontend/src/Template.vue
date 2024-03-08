<template>
  <div>
    <div class="user-navbar">
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div class="container">
          <a class="navbar-brand" href="#">
            <img src="/assets/images/logo.png" alt="logo" class="custom-logo">
          </a>
          <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="sidebar offcanvas offcanvas-start" :style="sidebarStyles" tabindex="-1" id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
                <img src="/assets/images/logo.png" alt="logo" class="custom-logo">
              </h5>
              <button type="button" class="btn-close btn-close-white shadow-none border-0 " data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
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
                  <router-link class="nav-link text-white " to="/about-us">About Us</router-link>
                </li>
                <li class="nav-item mx-2">
                  <router-link class="nav-link text-white " to="/contact-us">Contact Us</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item mx-2">
                  <router-link  to="/user/profile" class="nav-link text-white">Profile</router-link>
                </li>
                <li v-if="isLoggedIn && (role == 'EVENT_OWNER')" class="nav-item mx-2">
                  <router-link to="/eventowner/dashboard/analytics" class="nav-link text-white">Dashboard</router-link>
                </li>
              </ul>
              <div class=" d-flex flex-column flex-lg-row justify-content-center align-items-center gap-3">
                <router-link v-if="!isLoggedIn" class=" text-white text-decoration-none px-3 py-1 button-color rounded-1"
                  to="/login">LOG IN</router-link>
                <router-link v-if="isLoggedIn" class=" text-white text-decoration-none px-3 py-1 button-color rounded-1"
                  to="/logout">LOG OUT</router-link>
                <router-link v-if="!isLoggedIn" class=" text-white text-decoration-none px-3 py-1 button-color rounded-1"
                  to="/signup">SIGN UP</router-link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <div>
      <router-view></router-view>
    </div>


    <footer class="footer-bg-black text-left py-3">
      <hr class="white-hr my-4">
      <div class="container">
        <div class="row">
          <div class="col-md-5">
            <p class="mb-4 text-center text-md-left "> Copyright&copy; Event Hive 2024.</p>
          </div>
          <div class="col-md-6 text-center text-md-r">
            <div class="footer-icons ml-md-4 d-flex justify-content-center justify-content-md-end">
              <a href="#" target="_blank">
                <img src="/assets/images/linkdin_Icon.png" alt="Icon 1" style="width: 100%; max-width: 35px;">
              </a>
              <a href="#" target="_blank">
                <img src="/assets/images/intagram.png" alt="Icon 2" style="width: 100%; max-width: 35px;">
              </a>
              <a href="#" target="_blank">
                <img src="/assets/images/facbook.png" alt="Icon 3" style="width: 100%; max-width: 35px;">
              </a>
            </div>

          </div>
        </div>
      </div>
    </footer>
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
      if (localStorage.getItem("isLoggedIn")) {
        if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
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

            if (data.data['success']) {
              localStorage.setItem("isLoggedIn", JSON.stringify(true));
              localStorage.setItem("session", JSON.stringify(data.data['session']));

              const session = data.data['session'];
              this.role = session['role'];
              // Checking EventOwners' verification status
              if ((session['role'] == "EVENT_OWNER") && (session['is_verified'] == false)) {
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
      role: "VISITOR"
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
  
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

#app {
  font-family: "Poppins", sans-serif;
}

.user-navbar {
  background-color: rgb(0, 0, 0)
}

.button-color {
  background-color: #111F4D;
}
.button-color:hover{
  background-color: #020923 !important;
  
}

.custom-logo {
  height: stretch;
  width: 120px;
  margin: 0px !important;
  padding: 0px !important;
}

.nav-link:hover {
  color: rgb(207, 206, 206) !important;
}

.footer-bg-black {
  background-color: black;
  color: white;
}

.footer-icons a:hover {
  opacity: 0.4;
}

.footer-icons img {
  margin-right: 10px;
  /* Adjust margin as needed */
}

.white-hr {
  border-top: 1px solid white;
  margin-left: 2%;
  margin-right: 2%;
  
}

</style>
  