<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-3"></div>
      <div class="col-lg-6">
        <h3 class="mb-5">Account Verification</h3>

        <h4 class="mb-5">Documents & Images Uploads</h4>
        <form @submit.prevent="submitForm">
          <!-- Face Image -->
          <div class="mb-3">
            <label for="faceImage" class="form-label text-black-50"
              >Front Facing Portrait</label
            >
            <br />
            <img
              v-if="formData.face_image"
              :src="formData.face_image"
              alt="Face Image Preview"
              width="150px"
              class="mt-2 img-thumbnail rounded"
            />
            <div class="row">
              <div class="col-8">
                <input
                type="file"
                class="form-control"
                id="faceImage"
                @change="handleFileUpload('face_image')"
                required
              />
              </div>
              <div class="col-3"></div>
              <button class="btn btn-danger btn-sm col-1" v-if="formData.face_image">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
          </div>

          <!-- NIC Front -->
          <div class="mb-3">
            <label for="nicFront" class="form-label text-black-50"
              >NIC Front Image</label
            >
            <br />
            <img
              v-if="formData.nic_front"
              :src="formData.nic_front"
              alt="Face Image Preview"
              width="150px"
              class="mt-2 img-thumbnail rounded"
            />
            <div class="row">
              <div class="col-8">
                <input
                type="file"
                class="form-control"
                id="nicFront"
                @change="handleFileUpload('nic_front')"
                required
              />
              </div>
              <div class="col-3"></div>
              <button class="btn btn-danger btn-sm col-1" v-if="formData.nic_front">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
          </div>

          <!-- NIC Back -->
          <div class="mb-3">
            <label for="nicBack" class="form-label text-black-50"
              >NIC Back Image</label
            >
            <br />
            <img
              v-if="formData.nic_back"
              :src="formData.nic_back"
              alt="Face Image Preview"
              width="150px"
              class="mt-2 img-thumbnail rounded"
            />
            <div class="row">
              <div class="col-8">
                <input
                type="file"
                class="form-control"
                id="nicBack"
                @change="handleFileUpload('nic_back')"
                required
              />
              </div>
              <div class="col-3"></div>
              <button class="btn btn-danger btn-sm col-1" v-if="formData.nic_back">
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </div>
          </div>

          <!-- Notes -->
          <div class="mb-3">
            <label for="notes" class="form-label">Notes</label>
            <textarea
              class="form-control"
              id="notes"
              v-model="formData.notes"
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
export default {
  name: "VerificationVue",
  components: {},
  mounted() {},
  data() {
    return {
      formData: {
        face_image: "https://xsgames.co/randomusers/avatar.php?g=male",
        nic_front: "",
        nic_back: "",
        notes: "",
      },
    };
  },
  methods: {
    handleFileUpload(type) {
      console.log(`Uploading ${type} image...`);
    },
  },
};
</script>
    