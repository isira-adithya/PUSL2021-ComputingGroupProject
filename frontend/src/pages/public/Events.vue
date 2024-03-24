<template>
  <div class="bg-black" :style="{ color: isInteractiveMapMode ? 'black' : 'white' }">
    <div v-if="events != null">
      <div style="margin-bottom: 20px;">
        <EventFilterVue
          :url_query="''"
          @eventFilterChanged="handleEventFilterChanged"
          ref="eventFilter"
        ></EventFilterVue>
      </div>
      <div v-if="events && events.length > 0">
        <InteractiveMapVue v-if="isInteractiveMapMode" :events="events"></InteractiveMapVue>
        <!-- Centered container for cards -->
        <div v-if="!isInteractiveMapMode" class="d-flex justify-content-center flex-wrap">
          <div
            v-for="event in events"
            :key="event.id"
            class="col-xl-4 col-xxl-3 col-lg-4 col-md-10 col-sm-10 m-2"
          >
            <!-- Card container with margin -->
            <div class="card-container">
              <!-- Card layout starts here -->
              <div class="card custom-card">
                <ImagesCarouselVue
                  class="card-img-top rounded border"
                  v-if="event.images != null"
                  :images="event.images"
                  :auto-slide-show="true"
                  :slide-show-interval="5000"
                />
                <div class="card-body">
                  <h5 class="card-title">{{ event["name"] }}</h5>
                  <p class="card-text" style="height: 100px; overflow: hidden;">
                    {{
                      event["description"].toString().length > 150
                        ? event["description"].toString().substring(0, 117) + "..."
                        : event["description"]
                    }}
                  </p>
                </div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    Category:
                    <i><b>{{ event["category"].charAt(0).toUpperCase() + event["category"].slice(1) }}</b></i>
                  </li>
                  <li class="list-group-item">
                    Location:
                    <i><b>{{ event["location"] }}</b></i>
                  </li>
                  <li class="list-group-item">
                    Date: <b>{{ new Date(event["date_time"]).toDateString() }}</b>
                  </li>
                  <li class="list-group-item">
                    Time: <b>{{ new Date(event["date_time"]).toLocaleTimeString() }}</b>
                  </li>
                </ul>
                <div class="card-body">
                  <router-link :to="'/events/' + event.uuid" class="btn btn-primary custom-button">Open</router-link>
                </div>
              </div>
              <!-- Card layout ends here -->
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-4 mb-4">
        <h3 class="text-white">No events found</h3>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Notiflix from "notiflix";
import ImagesCarouselVue from "../../components/ImagesCarousel.vue";
import EventFilterVue from "../../components/EventFilter.vue";
import InteractiveMapVue from "@/components/InteractiveMap.vue";

export default {
  name: "PublicEventsVue",
  components: { ImagesCarouselVue, EventFilterVue, InteractiveMapVue },
  props: {
    url_query: String,
  },
  mounted() {
    this.refreshEvents();
  },
  data() {
    return {
      events: null,
      prev_filter_query: "",
      isInteractiveMapMode: false,
    };
  },
  methods: {
    updateFilter() {
      if (this.$refs.eventFilter != null) {
        if (this.prev_filter_query != this.$refs.eventFilter.url_query) {
          this.prev_filter_query = this.$refs.eventFilter.url_query;
          this.refreshEvents();
        }
      }
    },

    refreshEvents() {
      Notiflix.Loading.dots("Loading...");
      axios
        .get("/api/common/events?" + this.prev_filter_query)
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    },

    handleEventFilterChanged(data) {
      this.updateFilter();
      this.isInteractiveMapMode = data.isInteractiveMapMode;
    },
  },
};
</script>

<style scoped>
.bg-black {
  min-height: 75.9vh;
  color: white;
}

.card-container {
  margin-bottom: 35px; /* Add more space under each card */
}

.custom-card {
  width: 310px;
  background-color: #1a1a1a;
  color: #ffffff;
  padding: 20px;
  border: solid 2px #111f4d;
  flex-direction: column;
  margin: auto;
}

.custom-card img {
  max-width: 200px;
  height: 300px;
}

.list-group-item {
  background-color: #1a1a1a;
  color: #ffffff;
  border: none;
}

.custom-button {
  background-color: #111f4d;
  border: none;
  width: 100%;
}

.custom-button:hover {
  background-color: #020923 !important;
}

.text-white {
  color: #ffffff;
}
</style>
