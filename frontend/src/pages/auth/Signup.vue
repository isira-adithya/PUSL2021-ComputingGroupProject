<template>
<div id="section1" :style="[section1, section]" class="background-container">
  <div class="container">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
         <div class="main-container" style="margin-top: 7%; margin-bottom: 11%;">
        <form @submit.prevent="">
          <h1 class="mb-5">Sign-up</h1>

          <!-- Role Input -->
          <div class="form-outline mb-2">
            
            <label class="form-label text-white-60" for="form2Example1">Role</label><br>
            <button @click="role = 'VISITOR'" :class="(role == 'VISITOR') ? 'btn btn-success btn-sm me-2' : 'btn text-white btn-outline-success btn-sm me-2'">Visitor</button>
            <button @click="role = 'EVENT_OWNER'" :class="(role == 'EVENT_OWNER') ? 'btn btn-success btn-sm ms-2' : 'btn text-white btn-outline-success btn-sm ms-2'">Event Owner</button>
            
          </div>
          <br>
          <!-- Email input -->
          <div class="form-outline mb-2">
            <label class="form-label text-white-60" for="form2Example1">Email address</label>
            <input
              type="email"
              class="form-control"
              v-model="email"
            />
          </div>

          <!-- Username input -->
          <div class="form-outline mb-2">
            <label class="form-label text-white-60" for="form2Example1">Username</label>
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
                <label class="form-label text-white-60" for="form2Example1">First Name</label>
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
                <label class="form-label text-white-60" for="form2Example1">Last Name</label>
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
            <label class="form-label text-white-60" for="form2Example1">Address</label>
            <input
              type="text"
              class="form-control"
              v-model="address"
            />
          </div>

          <!-- Phone number input -->
          <div class="form-outline mb-2">
            <label class="form-label text-white-60" for="form2Example1">Phone Number</label>
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
                <label class="form-label text-white-60" for="form2Example1">Password</label>
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
                <label class="form-label text-white-60" for="form2Example1">Repeat Password</label>
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
            type="submit"
            class="btn btn-primary"
            @click="submitForm"
            style="
              width: 30%;
              border-radius: 10px;
              background-color: #111f4d;
              border: none;
              padding: 12px 0;
              
            "
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
      imagePath1: process.env.BASE_URL + 'assets/images/EventsPic6.jpeg',
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

      // Check if the phone number is valid and Sri lankan
      if (this.phone.length != 12 || !this.phone.startsWith("+94")){
        Notiflix.Report.failure("Invalid phone number", "Phone number should be Sri Lankan, and should start with +94", "OK");
        return;
      }

      var data = {
          username: this.username,
          firstname: this.first_name,
          lastname: this.last_name,
          email: this.email,
          phone: this.phone,
          address: this.address,
          role: this.role,
          password: this.password,
      };

      axios
        .post("/api/auth/signup", data)
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
  computed: {
    section(){
      return{
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
      };
    },
    section1() {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3)), url(${this.imagePath1})`, // Dynamically set the URL   
       
      };
    },
    

    

  },
};
</script>

<style scoped>
h1 {
  font-family: "Stick No Bills", sans-serif;
  font-weight: 500;
  text-align: center;
}

.background-container {
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;
  background-color: #000000;
  margin: 0;
  padding: 0;
}

p {
  margin-bottom: 5%;
  color: #e8dede;
}

.form-control {
  border-radius: 0;
  margin: 0%;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0);
  /* Adjust the alpha value for transparency */
  border-radius: 10px;
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
  font-family: "Stick No Bills", sans-serif;
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
  color: #8482fa;
}

.main-container {
  background-color: rgb(12, 12, 12, 0.65);
  /* Add a transparent overlay on top of the background image */
  padding: 20px;
  border-radius: 20px;
}

.main-container h1.font-1 {
  font-family: "Stick No Bills", sans-serif;
  margin-top: 10%;
  line-height: 1.5;
  /* Adjust the line-height value as needed */
}

.white-bg {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
  /* Adjust the alpha value for transparency */
}
.form-check {
text-align: left;
}
</style>