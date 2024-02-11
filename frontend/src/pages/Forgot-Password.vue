<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="">
          <h3 class="mb-5">Forgot Password?</h3>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <label class="form-label text-black-50"
              >Email address or Username</label
            >
            <input
              type="email"
              class="form-control"
              v-model="email"
            />
          </div>

          <!-- 2 column grid layout for inline styling -->
          <div class="row mb-4">
          
            <div class="col text-end">
              <button
                type="button"
                class="btn btn-dark"
                @click="submitForm"
              >
                Submit
              </button>
            </div>

          </div>

          <!-- Submit button -->

          <!-- Register buttons -->
          <div class="text-center">
            <p>Go back to <router-link to="/signup">Login</router-link></p>
          </div>
        </form>
      </div>
      <div class="col-lg-4"></div>
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
      if (this.email.length <= 0){
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
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          this.$parent.isLoggedIn = true;
          window.setTimeout(() => {
            Notiflix.Loading.remove();
          }, 1000);


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
