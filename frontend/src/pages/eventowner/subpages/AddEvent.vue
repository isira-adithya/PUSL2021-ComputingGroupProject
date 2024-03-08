<template>
  <div id="section1" :style="[section1, section]">
  <div  class="container">
    <div class="py-4">
      <div class="row">
        <div class="col-lg-2" style="padding: 0;"></div>
        <div class="col-lg-8" style="padding: 0;">
          <form>
            <h3 class="mb-4  font-2" ><center>Create Event</center></h3>
            <div class="mb-3">
              <label class="form-label text-white ">Event Name</label>
              <input v-model="event_name" type="email" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label text-white">Event Description</label>
              <textarea  v-model="event_details" class="form-control" style="height: 25vh"></textarea>
              <div class="form-text text-white-50 text-white">
                You can use
                <b><i><a href="https://www.markdownguide.org/" clk>markdown</a></i></b>
                to add styles and other various elements to your event description
              </div>
            </div>

            <!-- Image Uploader -->
            <div class="mb-3 form-control">
              <ImageUploader
                ref="eventImageUploader"
                :customCssLabel="'color: black;'"
                :label="'Images'"
                :hideDeleteButton="true"
                :hideImage="true"
              />
              <ImagesCarouselVue style="width: 150px;" :images="images" :auto-slide-show="true" :slide-show-interval="3000" />
            </div>
            <div class="mb-3 form-control">
              <label class="form-label text-white">Date / Time</label>
              <VueDatePicker v-model="date_time" />
            </div>

            <div class="mb-3 form-control text-white">
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
            <div class="form-outline mb-4 ">
              <label class="form-label text-white">Address / Location</label>
              <input
                type="text"
                class="form-control"
                @input="handleGoogleMap()"
                v-model="location"
              />
            </div>

            <!-- Google Maps Preview -->
            <div v-if="geoCoordinatesReceived" class="mb-4">
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
            <div class="form-check mb-4 text-white" >
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
            <div v-if="ticketsNeeded" class="form-control">
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
              <div class="mb-3" v-if="tickets.length > 0">
                <h5>Tickets Added</h5>
                <ol class="list-group list-group-numbered">
                  <li
                    class="list-group-item d-flex justify-content-between align-items-start my-1"
                    v-for="ticket in tickets"
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
              <label class="form-label text-white">Visibility</label>
              <select
                v-model="visibility"
                class="form-select"
                aria-label="Event Category"
              >
                <option selected value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="private">Private</option>
              </select>
              <small v-if="visibility=='public'" class="text-white-50"><i>Anyone can see your event.</i></small>
              <small v-if="visibility=='unlisted'" class="text-white-50"><i>Anyone with the shared link to this event can access this event.</i></small>
              <small v-if="visibility=='private'" class="text-white-50"><i>No one can see your event, except you.</i></small>
            </div>

            <button @click="submitForm()" type="submit" class="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

  
  <script>
import axios from "axios";
import _ from "lodash";
import ImageUploader from "../../../components/ImageUploader.vue";
import ImagesCarouselVue from '../../../components/ImagesCarousel.vue';
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Notiflix from "notiflix";

export default {
  name: "EventOwnerAddEventVue",
  components: { ImageUploader, VueDatePicker, ImagesCarouselVue },
  

  mounted() {
    // watch imageuploader component
    setInterval(() => {
      try {
        if (this.$refs.eventImageUploader.imageUrl != ""){
        this.images.push(this.$refs.eventImageUploader.imageUrl);
        this.$refs.eventImageUploader.reset();
        }
      } catch (error) {
        // ignore
      }
    }, 1000);
  },
  data() {
    return {
      imagePath1: process.env.BASE_URL + 'assets/images/evensubmissionBg7.png',
      event_name: "",
      event_details: "",
      images: [],
      date_time: new Date(),
      category: "null",
      location: "",
      geoCoordinatesReceived: false,
      geoCoordinates: {
        lat: 6.92,
        lng: 79.85,
      },
      ticketsNeeded: false,
      tickets: [
      ],
      ticketName: "",
      ticketPrice: 0,
      ticketDescription: "",
      visibility: "public"
      
    };
  },
  methods: {
    submitForm() {
      // convert this.date_time to unix timestamp
      const timestamp = new Date(this.date_time).getTime() / 1000;

      // Submit the form to the backend
      const apiUrl = "/api/eventowner/events/";
      const data = {
        name: this.event_name,
        details: this.event_details,
        images: this.images,
        date_time: timestamp,
        category: this.category,
        location: this.location,
        geo_coordinates: this.geoCoordinates,
        tickets: this.tickets,
        visibility: this.visibility
      };

      Notiflix.Loading.standard("Creating Event...");
      axios
        .post(apiUrl, data)
        .then((response) => {
          if (response.status == 200){
            this.$router.push("/eventowner/dashboard/events");
            Notiflix.Notify.success("Event created successfully");
          } else {
            Notiflix.Notify.failure("Event creation failed");
          }
        })
        .catch((error) => {
          console.log(error);
          Notiflix.Notify.failure("Event creation failed");
        }).finally(() => {
          Notiflix.Loading.remove(1000);
        });
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

    addToTickets() {
      if (this.ticketPrice <= 0) {
        Notiflix.Notify.failure("Ticket price should be higher than 0");
        return;
      }

      const newTicket = {
        id: this.tickets.length + 1,
        name: this.ticketName,
        price: this.ticketPrice,
        description: this.ticketDescription,
      };
      this.tickets.push(newTicket);
      this.ticketName = "";
      this.ticketPrice = 0;
      this.ticketDescription = "";
    },

    removeFromTickets(ticketId) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== ticketId);
    }
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
  
};
</script>

<style scoped>
.form-control {
        border: none;
        border-radius: 0;
        margin-bottom: 3rem;     
        color: #ffffff;
        background-color: rgba(255, 255, 255, 0.2); /* Adjust the alpha value for transparency */
        border-radius: 8px;
    }

    .font-1 {
      color: #ffffff;
        
    }
    .font-2 {
  font-family: 'Stick No Bills', sans-serif;
  margin-top: 25px;
  font-size: 45px;
  color: #ffffff;
}
  


</style>