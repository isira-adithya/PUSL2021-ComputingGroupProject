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
              v-model="username"
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
                  v-model="first_name"
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
                  v-model="last_name"
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
              v-model="address"
            />
            <label class="form-label" for="form2Example1">Address</label>
          </div>

          <!-- Phone number input -->
          <div class="form-outline mb-2">
            <input
              type="text"
              id="form2Example1"
              class="form-control"
              v-model="phone"
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
                  v-model="password"
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
                  v-model="repeat_password"
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
import Notiflix from 'notiflix';

export default {
  name: "SignupVue",
  components: {},
  data() {
    return {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      phone: "",
      address: "",
      password: "",
      repeat_password: "", 
      shouldRemember: "",
    };
  },
  methods: {
    submitForm() {
      if (this.password !== this.repeat_password){
        Notiflix.Notify.failure("Passwords doesn't match")
        return;
      }

      if (this.password.length < 8){
        Notiflix.Notify.failure("Password should be longer than 8 characters")
        return;
      }

      axios
        .post("/api/auth/signup", {
          username: this.username,
          firstname: this.first_name,
          lastname: this.last_name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          role: "VISITOR",
          password: this.password,
        })
        .then((response) => {
          Notiflix.Report.success("Success", "Your account is created.", "OK", () => {
            this.$router.push("/login");
          });
        })
        .catch((err) => {
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
