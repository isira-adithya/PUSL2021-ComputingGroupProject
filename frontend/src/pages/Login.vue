<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-4"></div>
      <div class="col-lg-4">
        <form @submit.prevent="">
          <h3 class="mb-5">Login</h3>

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="form2Example1"
              >Email address or Username</label
            >
          </div>

          <!-- Password input -->
          <div class="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              class="form-control"
              v-model="password"
            />
            <label class="form-label" for="form2Example2">Password</label>
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
      axios
        .post("/api/auth/login", {
          username: this.email,
          password: this.password,
          rememberme: this.shouldRemember,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
