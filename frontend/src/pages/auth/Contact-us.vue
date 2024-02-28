<template>
    <div id="section1" :style="[section1, section]"  class=" bodysd">
<div class="mb-4 text-center"><br><br>
            <h1 class="font-1" style="margin-bottom: 7%;">Contact Us</h1>
        </div>
  <div>
    <div class="container">
        

      <div class="row">
        <!-- Left Part: Form -->
        <div class="col-md-6 mx-auto text-left">

            <form>
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" class="form-control white-bg no-border increased-height" v-model="name">
                    </div>
            
                    <div class="col-md-6">
                        <label for="phoneNumber" class="form-label">Phone number:</label>
                        <input type="text" class="form-control white-bg no-border increased-height" v-model="phoneNo">
                    </div>
            
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email:</label>
                        <input type="text" class="form-control white-bg no-border increased-height" v-model="email">
                    </div>
            
                    <div class="col-md-6">
                        <label for="subject" class="form-label">Subject:</label>
                        <input type="text" class="form-control white-bg no-border increased-height" v-model="subject">
                    </div>
                </div>
            
                <div class="mb-3">
                    <label for="message" class="form-label">Message:</label>
                    <textarea class="form-control white-bg no-border" v-model="message" rows="5"></textarea>
                </div>
            
                <button type="submit" class="btn btn-primary" @click="submitForm" style="width: 77%; border-radius: 13px; background-color: #111F4D; border: none; padding: 12px 0; font-size: 21px; margin-top: 13px; margin-bottom: 13%;">Submit</button>
               
            </form>
        </div>

        <!-- Right Part: Info Container -->
        <div class="col-md-5">
          <div class="main-container" style="margin-left: 20px; margin-top: 20px;">
            <div class="text-left mt-4 font-2">
              <h2>Contact Info</h2>
            </div>

         <div class="row justify-content-left mt-4">
              <div class="col-md-8 text-left mb-3">
                <p>
                    2091 Fieldcrest Road, Colombo, Sri Lanka <br>
                    
                    Call Us : (+94) ( 011) 2324167 <br>
                    
                    Fax : (+94) ( 011) 2324167 <br>
                    
                    E - mail  : info@demo.com</p>
              </div> 
              <a href="#" target="_blank" class="btn btn-primary" style="width: 34%; border-radius: 13px; background-color: #111F4D; border: none;">Maps</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>



<script>
import axios from "axios";
import Notiflix from 'notiflix';

export default {
  name: "ContactUsVue",
  components: {},
  data() {
    return {
      name: "",
      phoneNo: "",
      email: "",
      subject: "",
      message: "",
      imagePath1: process.env.BASE_URL + 'assets/images/contactUsBG1.png',
      
    };
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


  methods: {
    submitForm() {
      if (this.subject.length < 1){
        Notiflix.Notify.failure("Please enter subject")
        return;
      }

      if (this.email.length < 1) {
    Notiflix.Notify.failure("Please enter your email");
    return;
  }

  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check if the entered email matches the regex pattern
  if (!emailRegex.test(this.email)) {
    Notiflix.Notify.failure("Please enter a valid email address");
    return;
  }

      var data = {
          name: this.name,
          phoneNumber: this.phoneNo,
          email: this.email,
          subject: this.subject,
          message: this.message,
          
      };

       axios
        .post("/api/auth/contactUs", data)
        .then((response) => {
          Notiflix.Report.success("Success", "Your message has been sent.", "OK", () => {
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

  

<style scoped>
    h1 {
        font-family: 'Stick No Bills', sans-serif;
        font-weight: 600;
      
    }

    .bodysd {
    
    background-repeat: no-repeat;
    background-size: cover; /* Add this line to set the background size to cover */
    background-attachment: fixed;
    color: #ffffff;
    background-color: #000000;
    margin: 0;
    padding: 0;
}

    .form-control {
        border: none;
        border-radius: 0;
        margin-bottom: 3rem;     
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.2); /* Adjust the alpha value for transparency */
        border-radius: 8px;
    }

    .increased-height {
        height: 50px; /* Adjust the height as needed */
     }

    .form-control:focus {
        background-color: rgba(255, 255, 255, 0.2); /* Adjust the alpha value for transparency */
        box-shadow: none;
        color: #ffffff;
    }

    .font-1 {
        font-family: 'Stick No Bills', sans-serif;
        
    }

    .font-2 h2 {    
    font-size: 23px;
    font-weight: 750;
    margin-top: 20px;
    margin-bottom: 40px; /* Add margin-bottom as needed */
}
         
         
         

    label.form-label {
        text-align: left;
        display: block;
        margin-bottom: 0.2rem;
    }

    a {
        color: #ffffff;
    }

    .main-container {
        background-color: rgba(0, 0, 0, 0.5); /* Add a transparent overlay on top of the background image */
        padding: 20px;
        border-radius: 10px;
    }

    .white-bg {
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.3); /* Adjust the alpha value for transparency */
    }

</style>