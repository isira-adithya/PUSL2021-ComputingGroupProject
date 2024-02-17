<template>
  <div class="container py-4 bg-black text-white">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <form class="container">
          <div class="mb-3">
            <label class="form-label">Event Name</label>
            <input type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Event Description</label>
            <textarea class="form-control" style="height: 25vh"></textarea>
            <div class="form-text text-white-50">
              You can use
              <b
                ><i><a href="https://www.markdownguide.org/">markdown</a></i></b
              >
              to add styles and other various elements to your event description
            </div>
          </div>
          <div class="mb-3">
            <ImageUploader
              ref="eventImageUpload1"
              :customCssLabel="'color: white;'"
              :label="'Images'"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Date / Time</label>
            <VueDatePicker v-model="date_time" />
          </div>

          <div class="mb-3">
            <label class="form-label">Event Category</label>
            <select
              v-model="category"
              class="form-select"
              aria-label="Event Category"
            >
              <option selected value="null">Select a category</option>
              <option value="musical">Musical</option>
              <option value="sports">Sports</option>
              <option value="educational">Educational</option>
              <option value="religious">Religious</option>
              <option value="charity">Charity</option>
              <option value="other">Other</option>
            </select>
          </div>

          <!-- Location input -->
          <div class="form-outline mb-4">
            <label class="form-label">Location</label>
            <input
              type="text"
              class="form-control"
              @input="handleGoogleMap()"
              v-model="location"
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

          <!-- Add a checkbox to check whether this event contains tickets to purchase -->
          <div class="form-check mb-4">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              v-model="ticketsNeeded"
            />
            <label class="form-check-label" for="flexCheckDefault">
              This event contains tickets to purchase <i>(optional)</i>
            </label>
          </div>

          <!-- Create a form to add a new ticket to the event, there should be ticket name, price, description -->
          <div v-if="ticketsNeeded">
            <div class="mb-3">
              <label class="form-label">Ticket Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Ticket Price</label>
              <input type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Ticket Description</label>
              <textarea class="form-control" style="height: 10vh"></textarea>
            </div>
            <div class="mb-3">
              <button class="btn btn-primary btn-sm float-end">Add Ticket</button>
              <br>
            </div>

            <!-- Add a list view to show what tickets have been currently added, if there are no tickets show no tickets added -->
            <div class="mb-3">
              <h5>Tickets Added</h5>
              <ol class="list-group list-group-numbered">
                <li
                  class="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">Exclusive</div>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  </div>
                  <span class="badge bg-dark rounded-end-pill">50$</span>
                </li>
              </ol>
            </div>
          </div>

          <button @click="submitForm()" type="submit" class="btn btn-light">
            Create
          </button>
        </form>
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import _ from "lodash";
import ImageUploader from "../../../components/ImageUploader.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Notiflix from "notiflix";

export default {
  name: "EventOwnerAddEventVue",
  components: { ImageUploader, VueDatePicker },
  mounted() {},
  data() {
    return {
      date_time: new Date(),
      category: "null",
      location: "",
      geoCoordinates: {
        lat: 1,
        lng: 1,
      },
      ticketsNeeded: true,
    };
  },
  methods: {
    submitForm() {
      // convert this.date_time to unix timestamp
      const timestamp = new Date(this.date_time).getTime() / 1000;
      console.log(`Date/Time: ${this.date_time} | Timestamp: ${timestamp}`);
      console.log(`Category: ${this.category}`);
      console.log(`Geo Coordinates: `, this.geoCoordinates);
      Notiflix.Notify.success("Event created successfully");
    },

    handleGoogleMap: _.debounce(function () {
      // const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${this.address}`;
      const apiUrl = `/api/common/geoapify/geocode?address=${this.location}`;
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
        }).finally(() => {
          Notiflix.Loading.remove(1000);
        });
    }, 1000),
  },
};
</script>