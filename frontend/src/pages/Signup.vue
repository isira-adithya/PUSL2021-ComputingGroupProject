<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <form @submit.prevent="">
          <h3 class="mb-5">Signup</h3>

          <!-- Email input -->
          <div class="form-outline mb-2">
            <input
              type="email"
              id="form2Example1"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="form2Example1">Email address</label>
          </div>

          <!-- Username input -->
          <div class="form-outline mb-2">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="form2Example1">Username</label>
          </div>

          <div class="row">
            <div class="col">
              <!-- Firstname input -->
              <div class="form-outline mb-2">
                <input
                  type="text"
                  id="form2Example1"
                  class="form-control"
                  v-model="email"
                />
                <label class="form-label" for="form2Example1">First Name</label>
              </div>
            </div>
            <div class="col">
              <!-- Lastname input -->
              <div class="form-outline mb-2">
                <input
                  type="text"
                  id="form2Example1"
                  class="form-control"
                  v-model="email"
                />
                <label class="form-label" for="form2Example1">Last Name</label>
              </div>
            </div>
          </div>

          <!-- Address input -->
          <div class="form-outline mb-2">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="form2Example1">Address</label>
          </div>

          <!-- Phone number input -->
          <div class="form-outline mb-2">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              v-model="email"
            />
            <label class="form-label" for="form2Example1">Phone Number</label>
          </div>

          <!-- Password inputs -->
          <div class="row">
            <div class="col">
              <!-- Password input -->
              <div class="form-outline mb-2">
                <input
                  type="password"
                  id="form2Example1"
                  class="form-control"
                  v-model="email"
                />
                <label class="form-label" for="form2Example1">Password</label>
              </div>
            </div>
            <div class="col">
              <!-- RepeatPassword input -->
              <div class="form-outline mb-2">
                <input
                  type="password"
                  id="form2Example1"
                  class="form-control"
                  v-model="email"
                />
                <label class="form-label" for="form2Example1">Repeat Password</label>
              </div>
            </div>
          </div>



          <!-- Submit button -->
          <div class="col mb-4 mt-2">
              <button
                type="button"
                class="btn btn-dark"
                @click="submitForm"
              >
                Create Account
              </button>
          </div>

          <!-- Register buttons -->
          <div class="text-center">
            <p>Already have an account? <router-link to="/login">Login</router-link></p>
          </div>
        </form>
      </div>
      <div class="col-lg-3"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupVue",
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
