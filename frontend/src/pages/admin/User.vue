<template>
  <div id="section1" :style="[section1, section]">
    <div class="container mt">
      <div class="row">
        <div class="col-lg-2"></div>
        <div class="col-lg-8">
          <form @submit.prevent="">
            <center>
              <h3 class="mb-5 text-white font-2">
                {{ role == "EVENT_OWNER" ? "Event Owner" : "User" }} Profile
              </h3>
            </center>
            <br /><br />
            <h5 class="mb-3 text-white">
              Manage
              <i
                ><span>@{{ username }}'s</span> account.</i
              >
            </h5>

            <ImageUploader
              :label="'Profile Picture'"
              :displayImageurl="'https://source.boringavatars.com/beam/240/'"
              ref="profileImageUploader"
              :customCssLabel="'color: white;'"
            ></ImageUploader>

            <!-- Firstname and Lastname -->
            <div class="row">
              <div class="col-6">
                <div class="form-outline mb-4">
                  <label class="form-label text-white">First Name</label>
                  <input type="text" class="form-control" v-model="fname" />
                </div>
              </div>
              <div class="col-6">
                <div class="form-outline mb-4">
                  <label class="form-label text-white">Last Name</label>
                  <input type="text" class="form-control" v-model="lname" />
                </div>
              </div>
            </div>

            <!-- Email and Phone -->
            <div class="row">
              <div class="col-6">
                <div class="form-outline">
                  <label class="form-label text-white">Email</label>
                  <input
                    disabled
                    type="email"
                    class="form-control"
                    v-model="email"
                    style="
                      color: white;
                      background-color: rgba(255, 255, 255, 0.2);
                      margin-bottom: 10px;
                    "
                  />
                  <!-- Add a checkbox to check whether email is verified or not -->
                  <div class="form-check text-white mb-4">
                    <label class="form-check-label"> Email Verified? </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="email_verified"
                    />
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="form-outline mb-4">
                  <label class="form-label text-white">Phone</label>
                  <input
                    disabled
                    type="text"
                    class="form-control"
                    v-model="phone"
                    style="
                      color: white;
                      background-color: rgba(255, 255, 255, 0.2);
                      margin-bottom: 10px;
                    "
                  />
                  <div class="form-check text-white mb-4">
                    <label class="form-check-label">
                      Phone Number Verified?
                    </label>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      v-model="phone_verified"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Address input -->
            <div class="form-outline mb-4">
              <label class="form-label text-white">Address</label>
              <input
                type="text"
                class="form-control"
                @input="handleGoogleMap()"
                v-model="address"
              />
            </div>

            <!-- Google Maps Preview -->
            <div class="mb-4">
              <GMapMap
                :center="geoCoordinates"
                :zoom="13"
                map-type-id="terrain"
                style="height: 32vh"
                :options="{
                  zoomControl: false,
                  mapTypeControl: false,
                  scaleControl: false,
                  streetViewControl: false,
                  rotateControl: false,
                  fullscreenControl: false,
                  disableDefaultUI: true,
                }"
              />
            </div>

            <!-- 2 column grid layout for inline styling -->
            <div class="row mb-4">
              <div class="col">
                <!-- Checkbox -->
                <div class="form-check mt-2 text-white">
                  <label class="form-check-label">
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
                <button
                  @click="updateProfile"
                  type="button"
                  class="btn btn-light"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-lg-2"></div>
      </div>
    </div>
  </div>
</template>
      
      <script>
import axios from "axios";
import ImageUploader from "../../components/ImageUploader.vue";
import _ from "lodash";
import Notiflix from "notiflix";

export default {
  name: "UserProfileVue",
  components: { ImageUploader },
  mounted() {
    axios
      .get("/api/admin/users/" + this.$route.params.user_id)
      .then((response) => {
        this.username = response.data.user_name;
        this.email = response.data.email.email;
        this.fname = response.data.first_name;
        this.lname = response.data.last_name;
        this.address = response.data.address;
        this.phone = response.data.phone.number;
        this.notification_enabled =
          response.data.notification_preference == "EMAILS";
        this.role = response.data.role;
        this.$refs.profileImageUploader.imageUrl = response.data.profile_image
          ? response.data.profile_image
          : "https://source.boringavatars.com/beam/240/";
        if (response.data["addr_geocoordinates"]) {
          console.log(
            `Geo Coordinates: `,
            response.data["addr_geocoordinates"]
          );
          const lat = response.data["addr_geocoordinates"].split(",")[0];
          const lng = response.data["addr_geocoordinates"].split(",")[1];
          this.geoCoordinates = {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
          };
          
        }
        this.email_verified = response.data['email']['is_verified'];
        this.phone_verified = response.data['phone']['is_verified'];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      imagePath1: process.env.BASE_URL + "assets/images/editProfile.png",
      username: "",
      email: "",
      fname: "",
      lname: "",
      address: "",
      phone: "",
      notification_enabled: false,
      role: "",
      geoCoordinates: {
        lat: 1,
        lng: 1,
      },
      email_verified: false,
      phone_verified: false,
    };
  },
  methods: {
    handleGoogleMap: _.debounce(function () {
      // const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${this.address}`;
      const apiUrl = `/api/common/geoapify/geocode?address=${this.address}`;
      Notiflix.Loading.standard("Loading Map...");
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data["success"]) {
            const features = response.data["data"]["features"];
            const formattedName = features[0]["properties"]["formatted"];
            const coordinates = features[0]["geometry"]["coordinates"];
            this.geoCoordinates = {
              lat: coordinates[1],
              lng: coordinates[0],
            };
          } else {
            Notiflix.Notify.failure("Address not found");
          }
        })
        .catch((error) => {
          console.log(error);
          Notiflix.Notify.failure("Address not found");
        })
        .finally(() => {
          Notiflix.Loading.remove(1000);
        });
    }, 1000),

    updateProfile() {
      const apiUrl = "/api/admin/users/" + this.$route.params.user_id;
      const data = {
        first_name: this.fname,
        last_name: this.lname,
        address: this.address,
        phone: this.phone,
        notification_preference: this.notification_enabled ? "EMAILS" : "NONE",
        profile_image: this.$refs.profileImageUploader.imageUrl,
        address_geo_cooridinates: this.geoCoordinates,
      };
      axios
        .put(apiUrl, data)
        .then((response) => {
          Notiflix.Notify.success("Profile updated successfully");
        })
        .catch((error) => {
          console.log(error);
          Notiflix.Notify.failure("Profile update failed");
        });
    },
  },
  computed: {
    section() {
      return {
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
    section1() {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${this.imagePath1})`, // Dynamically set the URL
      };
    },
  },
};
</script>
  
  <style scoped>
.form-control {
  border: none;
  border-radius: 0;
  margin-bottom: 3rem;
  color: #ffffffc4;
  background-color: rgba(
    255,
    255,
    255,
    0.2
  ); /* Adjust the alpha value for transparency */
  border-radius: 8px;
}

.font-1 {
  color: #ffffff;
}
.font-2 {
  font-family: "Stick No Bills", sans-serif;
  margin-top: 7%;
  font-size: 40px;
  color: #ffffff;
}
</style>
        