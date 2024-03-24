<template>
  <div id="section1" :style="[section1, section]" class="bodysd">
    <div class="mb-4 text-center"><br><br>
      <h1 class="font-1" style="margin-bottom: 7%;">Contact Us</h1>
    </div>
    <div class="container">
      <div class="row">
        <!-- Left Part: Map -->
        <div class="col-md-6 mx-auto text-left">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15846.303361252902!2d80.0415729!3d6.8213291!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2523b05555555%3A0x546c34cd99f6f488!2sNSBM%20Green%20University!5e0!3m2!1sen!2slk!4v1711266320851!5m2!1sen!2slk"
            width="100%"
            height="430"
            style="border-radius:10px;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
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
                  Pitipana - Thalagala Rd, Homagama, <br>
                  Call Us: (+94) (011) 5445000 <br>
                  Fax: (+94) (011) 2324167 <br>
                  E-mail: support@eventhive.com, <br>
                          info@eventhive.com
                         
                </p>
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
    section() {
      return {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    },
    section1() {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${this.imagePath1})`,
      };
    },
  },
  methods: {
    submitForm() {
      if (this.subject.length < 1) {
        Notiflix.Notify.failure("Please enter subject")
        return;
      }
      if (this.email.length < 1) {
        Notiflix.Notify.failure("Please enter your email");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        Notiflix.Notify.failure("Please enter a valid email address");
        return;
      }
      const data = {
        name: this.name,
        phoneNumber: this.phoneNo,
        email: this.email,
        subject: this.subject,
        message: this.message,
      };
      axios.post("/api/auth/contactUs", data)
        .then((response) => {
          Notiflix.Report.success("Success", "Your message has been sent.", "OK", () => {
            this.$router.push("/login");
          });
        })
        .catch((err) => {
          if (Object.keys(err.response.data).includes("errors")) {
            err.response.data['errors'].forEach(errObj => {
              Notiflix.Notify.failure(`Invalid value at ${errObj['path']}`);
            })
          } else if (Object.keys(err.response.data).includes("msg")) {
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
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;
  background-color: #000000;
  margin: 0;
  padding: 0;
  min-height: 80vh;
}
.form-control {
  border: none;
  border-radius: 0;
  margin-bottom: 3rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
.increased-height {
  height: 50px;
}
.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
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
  margin-bottom: 40px;
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
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}
.white-bg {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
