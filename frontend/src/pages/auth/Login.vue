<template>
<div id="section1" :style="[section1, section]" class="background-container">
    <div class="container">
      <div class="col-md-4 mx-auto text-center"><br><br><br><br><br>
        <div class="main-container">
        <h1 class="mb-4 font-1" >Login</h1>
        <br />
        <form @submit.prevent="">
          <div class="row justify-content-around">
            <div class="mb-3">
              <label for="fName" class="form-label"
                >Username / E-mail Address :</label
              >
              <input name="user" type="text" class="form-control" v-model="email" />
            </div>

            <div class="mb-3">
              <label for="password" class="form-label">Password :</label>
              <input name="password" type="password" class="form-control" v-model="password" />
            </div>

            <div class="form-check mb-3 mt-2 ms-4" >
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
          <br />

          <button
            type="submit"
            class="btn btn-primary"
            @click="submitForm"
            style="
              width: 90%;
              border-radius: 10px;
              background-color: #111f4d;
              border: none;
              padding: 12px 0;
            "
          >
            Login
          </button>
          <br/>
          <br/>
        </form>
        <router-link to="/forgot-password">Forgot Password?</router-link>
        <p class="mb-4">
          Don't Have An Account?
          <router-link to="/signup"
            ><span style="color: rgb(31, 81, 255)">Register</span></router-link>
        </p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from "notiflix";

export default {
  name: "LoginVue",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      shouldRemember: "",
      imagePath1: process.env.BASE_URL + 'assets/images/LoginBack.png',
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
            throw "Internal Server Error";
          }

          Notiflix.Notify.success("Success!", "", "OK");
          localStorage.setItem("isLoggedIn", JSON.stringify(true));
          this.$parent.$parent.isLoggedIn = true;
          window.setTimeout(() => {
            Notiflix.Loading.remove();
            this.$router.push("/user/profile");
          }, 1000);
        })
        .catch((err) => {
          console.error(err);
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Invalid Credentials", "", "OK");
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
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${this.imagePath1})`, // Dynamically set the URL   
       
      };
    },
    

    

  },
};
</script>

<style scoped>
h1 {
  font-family: "Stick No Bills", sans-serif;
  font-weight: 500;
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
  height: 100vh;
}

p {
  margin-bottom: 10%;
  color: #D2D2D2;
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
