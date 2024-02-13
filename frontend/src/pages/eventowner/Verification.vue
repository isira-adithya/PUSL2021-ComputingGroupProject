<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h3 class="mb-5">Step 01: Mobile Verification</h3>
        <div v-if="!isPhoneNumberVerified" class="alert alert-dark" role="alert">
          <p>
            <small
              >Please verify your mobile number by requesting a PIN code.</small
            ><br />
            <small v-if="session"
              >Mobile Number:
              <b
                ><a :href="'tel:' + session.phone_number">{{
                  session.phone_number
                }}</a></b
              ></small
            >
          </p>
          <button
            class="btn btn-sm btn-dark my-2"
            v-if="!isRequestedPin"
            @click="requestPIN"
          >
            <small>Request PIN</small>
          </button>
          <div class="row mt-2" v-if="isRequestedPin">
            <div class="col-6 pe-1">
              <input
                type="number"
                class="form-control form-control-sm"
                placeholder="Enter your PIN code"
                v-model="pinCode"
              />
            </div>
            <div class="col-1 ps-1">
              <button @click="verifyPin" class="btn btn-sm btn-dark">
                <small>Submit</small>
              </button>
            </div>
            <div class="col-5"></div>
          </div>
        </div>
        <div v-else class="alert alert-success" role="alert">
          <p><small>Your Mobile Number is already verified.</small></p>
        </div>

        <h4 class="mb-4 mt-5">Step 02: Documents & Images Uploads</h4>
        <form @submit.prevent="submitForm" class="alert alert-dark">
          <ImageUploaderVue :label="'Front Facing Portrait'"></ImageUploaderVue>
          <ImageUploaderVue :label="'NIC Front Image'"></ImageUploaderVue>
          <ImageUploaderVue :label="'NIC Back Image'"></ImageUploaderVue>

          <!-- Notes -->
          <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <textarea
              class="form-control"
              id="notes"
              v-model="notes"
              rows="3"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
      </div>
      <div class="col-lg-3"></div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import ImageUploaderVue from "../../components/ImageUploader.vue";
import Notiflix from 'notiflix';
export default {
  name: "VerificationVue",
  components: {
    ImageUploaderVue,
  },
  mounted() {
    this.session = JSON.parse(localStorage.getItem("session"));
    this.isPhoneNumberVerified = this.session['phone_number_verified'];
  },
  data() {
    return {
      isRequestedPin: false,
      isPhoneNumberVerified: false,
      notes: "",
      pinCode: "",
      session: null,
    };
  },
  methods: {
    requestPIN() {
      Notiflix.Loading.standard();
      axios
        .post("/api/eventowner/mobile-verification/request-pin")
        .then((response) => {
          if (response.status != 200) {
            throw "Internal Server Error";
          }

          Notiflix.Notify.success("PIN code was sent", "", "OK");
          Notiflix.Loading.remove();
          this.isRequestedPin = true;
        })
        .catch((err) => {
          console.error(err);
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Something went wrong, please try again later", "", "OK");
        });
    },
    verifyPin() {
      Notiflix.Loading.standard();
      axios
        .post("/api/eventowner/mobile-verification/verify-pin", {
          pin: this.pinCode
        })
        .then((response) => {
          if (response.status != 200) {
            throw "Internal Server Error";
          }

          Notiflix.Notify.success("Your Phone Number is verified.", "", "OK");
          Notiflix.Loading.remove();
          this.isPhoneNumberVerified = true;
        })
        .catch((err) => {
          console.error(err);
          Notiflix.Loading.remove();
          Notiflix.Notify.failure("Invalid PIN", "", "OK");
        });
    },
  },
};
</script>
    