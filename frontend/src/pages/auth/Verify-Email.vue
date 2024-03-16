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
                verification_code: this.token
            }).then((response) => {
                Notiflix.Loading.remove();
                Notiflix.Report.success(
                    'Email Verified',
                    'Your email has been verified successfully\nFeel free to close this window.',
                    'OK'
                );
                // Close the tab after 2 seconds
                const bc = new BroadcastChannel("email_verification_channel");
                bc.postMessage("email_verified");
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
  