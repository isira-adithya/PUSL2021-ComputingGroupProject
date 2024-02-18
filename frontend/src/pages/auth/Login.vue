<template>
  <div class="BGimg">
        <div class="container">
            <div class="col-md-4 mx-auto text-center">
               
                <h1 class="mb-4 font-1">Login</h1><br>
                <br>

                <form @submit.prevent="">
                    <div class="row justify-content-around">
                        <div class="mb-3">
                            <label for="fName" class="form-label">Username / E-mail Address :</label>
                            <input type="text" class="form-control"  v-model="email">
                        </div>

                       
                        <div class="mb-3">
                            <label for="password" class="form-label">Password :</label>
                            <input type="text" class="form-control" v-model="password">
                        </div>

                      
                    </div>
                    <br>

                    <button type="submit" class="btn btn-primary" @click="submitForm"
                        style="width: 90%; border-radius: 10px; background-color: #111F4D; border: none; padding: 12px 0;">Login
                        </button>
                    <br>
                    <br>

                </form>
                <router-link to="/forgot-password">Forgot Password?</router-link>
                <p class="mb-4 ">Don't Have An Account? <router-link to="/signup"><span style="color: rgb(31, 81, 255);">Register</span></router-link></p>
            </div>
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
            this.$router.push('/user/profile');
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
