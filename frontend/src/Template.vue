<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand mx-4" href="#">EventHive</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-item nav-link" to="/">Home</router-link>
          <router-link v-if="!isLoggedIn" class="nav-item nav-link" to="/login">Login</router-link>
          <router-link v-if="isLoggedIn" class="nav-item nav-link" to="/logout">Logout</router-link>
        </div>
      </div>
    </nav>

    <div class="mx-4">
      <router-view></router-view>
    </div>

    <div class="mx-4">
      <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-3 my-2 border-top"
      >
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
            <a href="#" class="nav-link px-2 text-body-secondary">Home</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">Features</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">FAQs</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-body-secondary">About</a>
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
};
</script>
  
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

#app {
  font-family: "Poppins", sans-serif;
}
</style>
  