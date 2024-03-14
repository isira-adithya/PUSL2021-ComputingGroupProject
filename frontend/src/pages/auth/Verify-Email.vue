<template>
    <div style="background-color: black; color: white;">
    <div class="container" >
      <div class="row">
        <div class="col-lg-4"></div>
        <div class="col-lg-4" style="height: 100%;">
          
        </div>
        <div class="col-lg-4"></div>
      </div>
    </div>
  </div>
  </template>
  
  
  <script>
  import axios from "axios";
  import Notiflix from 'notiflix';
  
  export default {
    name: "VerifyEmailVue",
    components: {},
    data() {
      return {
        token: null
      };
    },
    mounted() {
        this.token = this.$route.params['token'];
        if (this.token != null){
            Notiflix.Loading.dots('Verifying Email...');
            axios.post("/api/auth/verify-email", {
                token: this.token
            }).then((response) => {
                Notiflix.Loading.remove();
                Notiflix.Notify.success('Email Verified');
                // Close the tab after 2 seconds
                setTimeout(() => {
                    window.close();
                }, 2000);
            }).catch((error) => {
                Notiflix.Loading.remove();
            });
        }
    },
    methods: {
      submitForm() {
        
      },
    },
  };
  </script>
  