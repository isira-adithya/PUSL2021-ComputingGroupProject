<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <form @submit.prevent="">
          <h3 class="mb-5">Signup</h3>

          <!-- Role Input -->
          <div class="form-outline mb-2">
            <label class="form-label text-black-50" for="form2Example1">Role</label><br>
            <button @click="role = 'VISITOR'" :class="(role == 'VISITOR') ? 'btn btn-success btn-sm me-2' : 'btn btn-sm me-2'">Visitor</button>
            <button @click="role = 'EVENT_OWNER'" :class="(role == 'EVENT_OWNER') ? 'btn btn-success btn-sm ms-2' : 'btn btn-sm ms-2'">Event Owner</button>
          </div>

          <!-- Email input -->
          <div class="form-outline mb-2">
            <label class="form-label text-black-50" for="form2Example1">Email address</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
            />
          </div>

          <!-- Username input -->
          <div class="form-outline mb-2">
            <label class="form-label text-black-50" for="form2Example1">Username</label>
            <input
              type="text"
              class="form-control"
              v-model="username"
            />
          </div>

          <div class="row">
            <div class="col">
              <!-- Firstname input -->
              <div class="form-outline mb-2">
                <label class="form-label text-black-50" for="form2Example1">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="first_name"
                />
              </div>
            </div>
            <div class="col">
              <!-- Lastname input -->
              <div class="form-outline mb-2">
                <label class="form-label text-black-50" for="form2Example1">Last Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="last_name"
                />
              </div>
            </div>
          </div>

          <!-- Address input -->
          <div class="form-outline mb-2">
            <label class="form-label text-black-50" for="form2Example1">Address</label>
            <input
              type="text"
              class="form-control"
              v-model="address"
            />
          </div>

          <!-- Phone number input -->
          <div class="form-outline mb-2">
            <label class="form-label text-black-50" for="form2Example1">Phone Number</label>
            <input
              type="text"
              class="form-control"
              v-model="phone"
            />
          </div>

          <!-- Password inputs -->
          <div class="row">
            <div class="col">
              <!-- Password input -->
              <div class="form-outline mb-2">
                <label class="form-label text-black-50" for="form2Example1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                />
              </div>
            </div>
            <div class="col">
              <!-- RepeatPassword input -->
              <div class="form-outline mb-2">
                <label class="form-label text-black-50" for="form2Example1">Repeat Password</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="repeat_password"
                />
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
      role: "VISITOR", 
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
          role: this.role,
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
