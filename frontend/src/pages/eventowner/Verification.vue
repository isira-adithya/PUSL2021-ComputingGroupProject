<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h3 class="mb-5">Step 01: Account Verification</h3>
        <div class="alert alert-dark" role="alert">
          <p>
            <small>Please verify your phone number by requesting a PIN code.</small><br>
            <small v-if="session">Phone Number: <b><a :href="'tel:' + session.phone_number">{{ session.phone_number }}</a></b></small>
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
              />
            </div>
            <div class="col-1 ps-1">
              <button class="btn btn-sm btn-dark">
                <small>Submit</small>
              </button>
            </div>
            <div class="col-5"></div>
          </div>
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
import ImageUploaderVue from "../../components/ImageUploader.vue";
export default {
  name: "VerificationVue",
  components: {
    ImageUploaderVue,
  },
  mounted() {
    this.session = JSON.parse(localStorage.getItem("session"));
  },
  data() {
    return {
      isRequestedPin: false,
      notes: "",
      session: null,
    };
  },
  methods: {
    requestPIN(){

    }
  },
};
</script>
    