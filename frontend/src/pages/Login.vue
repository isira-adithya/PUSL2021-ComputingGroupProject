<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="">
          <h3 class="mb-5">Login</h3>

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

          <!-- Password input -->
          <div class="form-outline mb-4">
            <label class="form-label text-black-50">Password</label>
            <input
              type="password"
              class="form-control"
              v-model="password"
            />
          </div>

          <!-- 2 column grid layout for inline styling -->
          <div class="row mb-4">
            <div class="col">
              <!-- Checkbox -->
              <div class="form-check mt-2">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  checked
                  v-model="shouldRemember"
                />
                <label class="form-check-label" for="form2Example31">
                  Remember me
                </label>
              </div>
            </div>

            <div class="col text-end">
              <button
                type="button"
                class="btn btn-dark"
                @click="submitForm"
              >
                Sign in
              </button>
            </div>
          </div>

          <!-- Submit button -->

          <!-- Register buttons -->
          <div class="text-center">
            <router-link to="/forgot-password">Forgot password?</router-link>
            <p>Not a member? <router-link to="/signup">Sign up</router-link></p>
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
  name: "LoginVue",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      shouldRemember: "",
    };
  },
  methods: {
    submitForm() {
      Notiflix.Loading.standard();
      axios
        .post("/api/auth/login", {
          username: this.email,
          password: this.password,
          rememberme: this.shouldRemember,
        })
        .then((response) => {
          
          if (response.status != 200) {
            throw 'Internal Server Error';
          }

          Notiflix.Notify.success("Success!", "", "OK");
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          this.$parent.isLoggedIn = true;
          window.setTimeout(() => {
            Notiflix.Loading.remove();
            this.$router.push('/');
          }, 1000);


        })
        .catch((err) => {
          console.error(err)
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Invalid Credentials", "", "OK");
        });
    },
  },
};
</script>
