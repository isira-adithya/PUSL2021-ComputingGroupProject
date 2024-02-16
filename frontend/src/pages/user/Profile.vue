<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <form @submit.prevent="">
          <h3 class="mb-3">{{ role == 'EVENT_OWNER' ? 'Event Owner' : 'User'}} Profile</h3>
          <h5 class="mb-5 text-black-50">Hello <i><span>@{{ username }}</span> 👋</i></h5>

          <ImageUploader :label="'Profile Picture'" :displayImageurl="'https://source.boringavatars.com/beam/240/'"></ImageUploader>

          <!-- Firstname and Lastname -->
          <div class="row">
            <div class="col-6">
              <div class="form-outline mb-4">
                <label class="form-label text-black-50">First Name</label>
                <input type="text" class="form-control" v-model="fname" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-outline mb-4">
                <label class="form-label text-black-50">Last Name</label>
                <input type="text" class="form-control" v-model="lname" />
              </div>
            </div>
          </div>

          <!-- Email and Phone -->
          <div class="row">
            <div class="col-6">
              <div class="form-outline mb-4">
                <label class="form-label text-black-50">Email</label>
                <input type="email" class="form-control" v-model="email" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-outline mb-4">
                <label class="form-label text-black-50">Phone</label>
                <input type="text" class="form-control" v-model="phone" />
              </div>
            </div>
          </div>

          <!-- Address input -->
          <div class="form-outline mb-4">
            <label class="form-label text-black-50">Address</label>
            <input type="text" class="form-control" v-model="address" />
          </div>

          <!-- 2 column grid layout for inline styling -->
          <div class="row mb-4">
            <div class="col">
              <!-- Checkbox -->
              <div class="form-check mt-2">
                <label class="form-check-label" for="form2Example31">
                  Enable Notifications?
                </label>

                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="form2Example31"
                  checked
                  v-model="notification_enabled"
                />
              </div>
            </div>

            <div class="col text-end">
              <button type="button" class="btn btn-dark" @click="submitForm">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
    
    <script>
import ImageUploader from '../../components/ImageUploader.vue';
export default {
  name: "UserProfileVue",
  components: {ImageUploader},
  mounted() {},
  data() {
    return {
      username: "isira_adithya",
      email: "",
      fname: "",
      lname: "",
      address: "",
      phone: "",
      notification_enabled: false,
      role: "",
    };
  },
  methods() {
    return;
  },
};
</script>
      