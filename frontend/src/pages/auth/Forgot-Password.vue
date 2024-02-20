<template>
  <div class="background-container">
    <div class="container">
      <div class="row">

        <!-- Centered Container: Info Container -->
        <div class="col-md-6 mx-auto">
          <div class="main-container" style="margin-top: 7%; margin-bottom: 11%;">

            <div class="text-center mt-4 ">
              <h1 class="font-1" style="margin-top: 10%;">Forgot Your <br> Password?</h1>
              <p style="margin-bottom: 13%; margin-top: 4%;">Enter your email to recieve a recovery email</p>
            </div>

            <div class="row justify-content-center mt-4">
              <div class="col-md-8 text-center mb-3">
                <form @submit.prevent="">
                  <div class="row mb-1">
                    <div class="col-md-6" style="width: 100%;">
                      <label for="email" class="form-label" style="margin-bottom: 6%;">Email
                        Address:</label>
                      <input type="email" class="form-control increased-height" v-model="email"
                        placeholder="Your Email Address" >
                    </div>
                  </div>
                </form>
                <button type="button" class="btn btn-primary"
                  style="width: 100%; border-radius: 14px; background-color: #111F4D; border: none; padding: 16px 0; font-size: 20px; margin-top: 13px;"
                  @click="submitForm">Send
                  Recovery Link</button>
                <p style="margin-top: 8%;">Remember your password? <router-link to="/login">Log-in</router-link></p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from 'notiflix';

export default {
  name: "ForgotPasswordVue",
  components: {},
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitForm() {
      if (this.email.length <= 0) {
        Notiflix.Notify.failure("Please enter your username or email")
        return;
      }

      Notiflix.Loading.standard();
      axios
        .post("/api/auth/reset-password/request", {
          username: this.email,
        })
        .then((response) => {

          if (response.status != 200) {
            throw 'Internal Server Error';
          }

          Notiflix.Report.success("Success!", "Please check your email inbox.", "OK");
          window.setTimeout(() => {
            Notiflix.Loading.remove();
          }, 1000);


        })
        .catch((err) => {
          Notiflix.Loading.remove();
          if (Object.keys(err.response.data).includes("errors")) {
            err.response.data['errors'].forEach(errObj => {
              Notiflix.Notify.failure(`Invalid value at ${errObj['path']}`);
            })
          } else if (Object.keys(err.response.data).includes("msg")) {
            Notiflix.Report.failure("Error", err.response.data.msg, "OK");
          } else {
            Notiflix.Report.failure("Error", "Something went wrong, try again later.", "OK");
          }
        });
    },
  },
};
</script>



<style scoped>
h1 {
  font-family: 'Stick No Bills', sans-serif;
  font-weight: 600;
}

.background-container {
  background-image: url('');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;
  background-color: #000000;
  margin: 0;
  padding: 0;


}

p {
  margin-bottom: 10%;
  color: #D2D2D2;

}

.form-control {

  border-radius: 0;
  margin-bottom: 3rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  /* Adjust the alpha value for transparency */
  border-radius: 20px;
}

.increased-height {
  height: 45%;
  /* Adjust the height as needed */
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  /* Adjust the alpha value for transparency */
  box-shadow: none;
  color: #ffffff;
}

.font-1 {
  font-family: 'Stick No Bills', sans-serif;
  margin-top: 20px;
  font-size: 50px;
}

.font-2 h2 {
  font-size: 23px;
  font-weight: 750;
  margin-top: 20px;
  margin-bottom: 40px;
  /* Add margin-bottom as needed */
}

label.form-label {
  text-align: left;
  display: block;
  margin-bottom: 0.2rem;
}

a {
  color: #8482FA;
}

.main-container {
  background-color: rgb(12, 12, 12, 0.65);
  /* Add a transparent overlay on top of the background image */
  padding: 20px;
  border-radius: 20px;

}

.main-container h1.font-1 {
  font-family: 'Stick No Bills', sans-serif;
  margin-top: 10%;
  line-height: 1.5;
  /* Adjust the line-height value as needed */
}

.white-bg {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  /* Adjust the alpha value for transparency */
}
.form-control::placeholder {             
color: #939b8d;
}

</style>
