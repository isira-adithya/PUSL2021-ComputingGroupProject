<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        
      </div>
      <div class="col-lg-4"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from 'notiflix';

export default {
  name: "LogoutVue",
  components: {},
  mounted() {
    Notiflix.Loading.standard();
    axios.delete("/api/auth/logout").then((data)=>{
      Notiflix.Loading.remove();
      localStorage.setItem("isLoggedIn", JSON.stringify(false));
      localStorage.setItem("session", null);
      this.$parent.$parent.isLoggedIn = false;
      Notiflix.Report.success("Logout Success", "You can safely navigate away from the website now.", "OK", () => {
        this.$router.push("/");
      });
    }).catch((err) => {
      Notiflix.Loading.remove();
      Notiflix.Report.failure("Something went wrong", "Please try again later.", "OK", () => {
        this.$router.push("/");
      });
    })
  },
  data() {
    return {
    };
  },
  methods: {
    
  },
};
</script>
