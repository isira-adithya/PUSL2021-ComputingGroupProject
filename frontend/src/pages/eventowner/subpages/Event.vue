<template>
    <div class="container mt-5" v-if="event != null">
      <div class="row">
      <div class="col-lg-2" style="padding: 0;"></div>
      <div class="col-lg-8" style="padding: 0;">
        <form>
          <h3 class="mb-4">Edit Event</h3>
          <div class="mb-3">
            <label class="form-label">Event Name</label>
            <input v-model="event.name" type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Event Description</label>
            <textarea  v-model="event.description" class="form-control" style="height: 25vh"></textarea>
            <div class="form-text text-black-50">
              You can use
              <b
                ><i><a href="https://www.markdownguide.org/">markdown</a></i></b
              >
              to add styles and other various elements to your event description
            </div>
          </div>

          <!-- Image Uploader -->
          <div class="mb-3">
            <ImageUploader
              ref="eventImageUploader"
              :customCssLabel="'color: black;'"
              :label="'Images'"
              :hideDeleteButton="true"
              :hideImage="true"
            />
            <ImagesCarouselVue style="width: 150px;" v-if="event.images.length > 0" :images="event.images" :auto-slide-show="true" :slide-show-interval="3000" />
          </div>
          <div class="mb-3">
            <label class="form-label">Date / Time</label>
            <VueDatePicker v-model="event.date_time" />
          </div>

          <div class="mb-3">
            <label class="form-label">Event Category</label>
            <select
              v-model="event.category"
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
            <label class="form-label">Address / Location</label>
            <input
              type="text"
              class="form-control"
              @input="handleGoogleMap()"
              v-model="event.location"
            />
          </div>

          <!-- Google Maps Preview -->
          <div v-if="geoCoordinatesReceived" class="mb-4">
            <GMapMap
              :center="event.location_geocoordinates"
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
            <h4 class="mt-5 mb-3">Tickets</h4>
            <div class="mb-3">
              <label class="form-label">Ticket Name</label>
              <input v-model="ticketName" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Ticket Price</label>
              <input v-model="ticketPrice" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Ticket Description</label>
              <textarea v-model="ticketDescription" class="form-control" style="height: 10vh"></textarea>
            </div>
            <div class="mb-3">
              <button @click="addToTickets" class="btn btn-primary btn-sm float-end">Add Ticket</button>
              <br>
            </div>

            <!-- Add a list view to show what tickets have been currently added, if there are no tickets show no tickets added -->
            <div class="mb-3" v-if="event.tickets.length > 0">
              <h5>Tickets Added</h5>
              <ol class="list-group list-group-numbered">
                <li
                  class="list-group-item d-flex justify-content-between align-items-start my-1"
                  v-for="ticket in event.tickets"
                  :key="ticket.id"
                >
                  <div class="ms-2 me-auto">
                    <div class="fw-bold">{{ ticket.name }}</div>
                    <i>{{ ticket.description }}</i>
                    <br>
                    <code>Price: {{ ticket.price }}$</code>
                  </div>
                  <span @click="removeFromTickets(ticket.id)" class="badge btn btn-dark rounded-end-pill">
                    <font-awesome-icon icon="fa-solid fa-trash" />
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div class="mb-5">
            <label class="form-label">Visibility</label>
            <select
              v-model="event.visibility"
              class="form-select"
              aria-label="Event Category"
            >
              <option selected value="public">Public</option>
              <option value="unlisted">Unlisted</option>
              <option value="private">Private</option>
            </select>
            <small v-if="event.visibility=='public'" class="text-white-50"><i>Anyone can see your event.</i></small>
            <small v-if="event.visibility=='unlisted'" class="text-white-50"><i>Anyone with the shared link to this event can access this event.</i></small>
            <small v-if="event.visibility=='private'" class="text-white-50"><i>No one can see your event, except you.</i></small>
          </div>

          <button @click="submitForm()" type="submit" class="btn btn-primary">
            Create
          </button>
        </form>
      </div>
      <div class="col-lg-2" style="padding: 0;"></div>
    </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import Notiflix from 'notiflix';
import ImageUploader from '../../../components/ImageUploader.vue';
import ImagesCarouselVue from '../../../components/ImagesCarousel.vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import _ from "lodash";

  export default {
    name: "EventOwnerEventVue",
    components: {ImageUploader, ImagesCarouselVue, VueDatePicker},
    mounted() {
      this.event_uuid = this.$route.params.uuid;

      Notiflix.Loading.dots("Loading Event...");
      axios.get("/api/eventowner/events/" + this.event_uuid).then(res => {
        this.event = res.data;
        if (this.event.tickets){
          this.ticketsNeeded = true;
        }
        if (this.event.location_geocoordinates){
          this.geoCoordinatesReceived = true;
        }
      }).catch(err => {
        console.log(err);
        Notiflix.Notify.failure("Failed to load event");
        setTimeout(() => {
          this.$router.push("/eventowner/dashboard/events");
        }, 3000);
      }).finally(() => {
        Notiflix.Loading.remove();
      });
    },
    data() {
      return {
        event_uuid: "",
        event: null,
        geoCoordinatesReceived: false,
        ticketsNeeded: false,

        // Ticket Related
        ticketDescription: "",
        ticketPrice: 0,
        ticketName: "",
      };
    },
    methods: {
      submitForm() {
        Notiflix.Loading.dots("Updating Event...");
        let tmpObj = this.event;
        tmpObj.date_time = new Date(tmpObj.date_time).getTime() / 1000;
        tmpObj.geo_coordinates = this.event.location_geocoordinates;
        axios.put("/api/eventowner/events/" + this.event_uuid, this.event).then(res => {
          Notiflix.Notify.success("Event updated successfully");
        }).catch(err => {
          console.log(err);
          Notiflix.Notify.failure("Failed to update event");
        }).finally(() => {
          Notiflix.Loading.remove();
        });
      },

      handleGoogleMap: _.debounce(function () {
      // const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${this.address}`;
      const apiUrl = `/api/common/geoapify/geocode?address=${this.event.location}`;
      Notiflix.Loading.standard("Loading Map...");
      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data["success"]) {
            const features = response.data["data"]["features"];
            const formattedName = features[0]["properties"]["formatted"];
            const coordinates = features[0]["geometry"]["coordinates"];
            this.event.location_geocoordinates = {
              lat: coordinates[1],
              lng: coordinates[0],
            };
            this.geoCoordinatesReceived = true;
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