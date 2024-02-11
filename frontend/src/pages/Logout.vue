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
      Notiflix.Report.success("Logout Success");
    }).catch((err) => {
      Notiflix.Loading.remove();
      Notiflix.Report.success("Logout Success");
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
