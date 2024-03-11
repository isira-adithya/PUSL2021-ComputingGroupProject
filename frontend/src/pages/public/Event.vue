<template>
  <div v-if="event != null">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title">{{ event["name"] }}</h3>

            <div>
              <ImagesCarouselVue
                class="card-img-top rounded border"
                v-if="event.images.length > 0"
                :images="event.images"
                :auto-slide-show="true"
                :slide-show-interval="1000"
              />
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

            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                Category:
                <i
                  ><b>{{
                    event["category"].charAt(0).toUpperCase() +
                    event["category"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item">
                Location:
                <i
                  ><b>{{
                    event["location"].charAt(0).toUpperCase() +
                    event["location"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item">
                Date:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleDateString() }}
                  </b></i
                >
              </li>
              <li class="list-group-item">
                Time:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleTimeString() }}
                  </b></i
                >
              </li>
            </ul>

            <p class="card-text mt-5">
              {{ event["description"] }}
            </p>

            <!-- Comment Section in bootstrap -->
            <div class="card mt-5">
              <div class="card-header">Comments</div>
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
                      <h5 class="card-title">@username</h5>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quos, amet.
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
      event: null,
      uuid: null,
      geoCoordinates: {
        lat: 1,
        lng: 1,
      },
    };
  },
  methods: {},
};
</script>