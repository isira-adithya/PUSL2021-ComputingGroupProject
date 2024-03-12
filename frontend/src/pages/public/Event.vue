<template>
  <div id="section1" :style="[section1, section]" class="background-container">
  <div v-if="event != null">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card" style="margin-top: 6%;">
          <div class="card-body text-black">
            <center><h5 style="margin-top: 10px;">Event Name:</h5>
            <h4 class="card-title">{{ event["name"] }}</h4></center>

            <div>
              <ImagesCarouselVue
                class="card-img-top rounded border"
                v-if="event.images.length > 0"
                :images="event.images"
                :auto-slide-show="true"
                :slide-show-interval="1000"
              />
            



            <p class="alert alert-warning mt-4">
              

              <ul class="list-group list-group-flush mt-4">
              <li class="list-group-item bg-transparent">
                Category:
                <i
                  ><b>{{
                    event["category"].charAt(0).toUpperCase() +
                    event["category"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Location:
                <i
                  ><b>{{
                    event["location"].charAt(0).toUpperCase() +
                    event["location"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Date:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleDateString() }}
                  </b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Time:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleTimeString() }}
                  </b></i
                >
              </li>
              
              <br><br>
              <b>Description:</b><br />
              <code>{{ event["description"] }}</code>
            </ul>
            </p>
            </div>
            <div v-if="event.tickets.length > 0">
              <h5 class="mt-4 mb-2">Tickets:</h5>
              <div class="row">
                <div
                  v-for="ticket in event.tickets"
                  :key="ticket.id"
                  class="col-6"
                >
                  <div class="alert alert-primary mt-2" style="font-size: smaller;">
                    <div>
                      <h5><i>{{ ticket.name }}</i></h5>
                      <p class="mt-3">
                        <b>Price:</b> {{ ticket.price }} €
                      </p>
                      <p>
                        <b>Description:</b><br>
                        <code>{{ ticket.description }}</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h5 class="mt-4">Location:</h5>
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

            <!-- Comment Section in bootstrap -->
            <div class="mt-5">
              <div class="card-header"><h5>Comments</h5></div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div class="row">
                    <div class="col-1">
                      <img
                        src="https://via.placeholder.com/150"
                        class="rounded-circle"
                        alt="..."
                        style="width: 100%"
                      />
                    </div>
                    <div class="col-11">
                      <b class="card-title text-sm">@username</b>
                      <p class="card-text text-sm">
                        <i>
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Quos, amet.
                        </i>
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</div>
</template>
  
  <script>
import axios from "axios";
import Notiflix from "notiflix";
import ImagesCarouselVue from "../../components/ImagesCarousel.vue";

export default {
  name: "PublicEventsVue",
  components: { ImagesCarouselVue },
  mounted() {
    this.uuid = this.$route.params.uuid;

    Notiflix.Loading.dots("Loading...");
    axios
      .get(`/api/common/events/${this.uuid}`)
      .then((response) => {
        this.event = response.data;
        this.geoCoordinates = {
          lat: this.event.location_geocoordinates.lat,
          lng: this.event.location_geocoordinates.lng,
        };
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        Notiflix.Loading.remove();
      });
  },
  data() {
    return {
    imagePath1: process.env.BASE_URL + 'assets/images/events.png',
      event: null,
      uuid: null,
      geoCoordinates: {
        lat: 1,
        lng: 1,
       
      },
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
  methods: {},
};
</script>