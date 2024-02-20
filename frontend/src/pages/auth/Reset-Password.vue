<template>
  <div style="background-color: black; color: white;">
  <div class="container" >
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="">
          <h2 class="mb-5" style="margin-top: 30%;"><center>Reset Your Password</center></h2>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <label class="form-label"
              >New Password:</label
            >
            <input
              type="password"
              class="form-control"
              v-model="password"
              style="color: black;" 
            />
          </div>

          <!-- Repeat Password input -->
          <div class="form-outline mb-4">
            <label class="form-label"
              >Repeat Password:</label
            >
            <input
              type="password"
              class="form-control"
              v-model="repeat_password"
              style="color: black;" 
            />
          </div>

          <!-- 2 column grid layout for inline styling -->
          <div class="row mb-4">
          
            <div class="col text-end">
              <button style="margin-bottom: 15%;"
                type="button"
                class="btn btn-dark"
                @click="submitForm"
              >
                Reset Password
              </button>
            </div>

          </div>
        </form>
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
  name: "ForgotPasswordVue",
  components: {},
  data() {
    return {
      password: "",
      repeat_password: "",
    };
  },
  methods: {
    submitForm() {
      if (this.password != this.repeat_password){
        Notiflix.Notify.failure("Passwords doesn't match")
        return;
      }

      if (this.password.length < 8){
        Notiflix.Notify.failure("Please enter a strong password longer than 8 characters")
        return;
      }

      Notiflix.Loading.standard();
      axios
        .post("/api/auth/reset-password/reset", {
          token: this.$route.params['token'],
          newPassword: this.password
        })
        .then((response) => {
          
          if (response.status != 200) {
            throw 'Internal Server Error';
          }

          Notiflix.Report.success("Success!", "Your password is now changed, please login using your new password.", "OK", () => {
            window.setTimeout(() => {
              Notiflix.Loading.remove();
              this.$router.push("/login");
            }, 1000);
          });
          


        })
        .catch((err) => {
          Notiflix.Loading.remove();
          if (Object.keys(err.response.data).includes("errors")){
            err.response.data['errors'].forEach(errObj => {
              Notiflix.Notify.failure(`Invalid value at ${errObj['path']}`);
            })
          } else if (Object.keys(err.response.data).includes("msg")){
            Notiflix.Report.failure("Error", err.response.data.msg, "OK");
          } else {
            Notiflix.Report.failure("Error", "Something went wrong, try again later.", "OK");
          }
        });
    },
  },
};
</script>
