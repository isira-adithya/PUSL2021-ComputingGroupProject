<template>
<div class="bg-black vh-100">
  <div v-if="events.length > 0">
    <div class="row w-100">
      <div v-for="event in events" :key="event.id" class="col-xl-4 col-xxl-3 col-lg-4 col-md-10 col-sm-10 m-2">
        <div class="card custom-card">
          <ImagesCarouselVue class="card-img-top rounded border" v-if="event.images != null" :images="event.images" :auto-slide-show="true" :slide-show-interval="1000" />
          <div class="card-body">
            <h5 class="card-title">{{ event['name'] }}</h5>
            <p class="card-text">
              {{ event['description'].toString().length > 150 ? event['description'].toString().substring(0, 150) + "..." : event['description'] }}
            </p>
          </div>
          
          <ul class="list-group list-group-flush ">
            <li class="list-group-item">Category: <i><b>{{ event['category'].charAt(0).toUpperCase() + event['category'].slice(1) }}</b></i></li>
            <li class="list-group-item">Location: <i><b>{{ event['location'] }}</b></i></li>
            <li class="list-group-item">Date: <b>{{ new Date(event['date_time']).toDateString() }}</b></li>
            <li class="list-group-item">Time: <b>{{ new Date(event['date_time']).toLocaleTimeString() }}</b></li>
          </ul>

          <div class="card-body d-flex justify-content-between">
            <router-link :to="'/events/' + event.uuid" class="btn btn-primary button-color ">Open</router-link>
            <router-link :to="'/eventowner/dashboard/event/' + event.uuid" class="btn btn-primary button-color ">Edit Event</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
    <div v-else>
      <h1 class="text-white text-center">No Events Found</h1>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import Notiflix from "notiflix";
import ImagesCarouselVue from '../../../components/ImagesCarousel.vue';

export default {
  name: "EventOwnerEventsVue",
  components: {ImagesCarouselVue},
  mounted() {
    Notiflix.Loading.dots("Loading Events...");
    axios
      .get("/api/eventowner/events")
      .then((response) => {
        this.events = response.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        Notiflix.Loading.remove();
      });
  },
  data() {
    return {
      events: [],
    };
  },
  methods: {},
};
</script>
<style scoped>

    .button-color {
      background-color: #111F4D;
    }
    .button-color:hover {
      background-color: #020923 !important;
    }
    .custom-card {
      width: 250px;
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 20px;
      border: solid 2px #111F4D;
    }
    .custom-card img {
      max-width: 200px;
      height: 300px;
    }

    .list-group{
      border: none;
    }

    .list-group-item{
      background-color: #1a1a1a;
      color: #ffffff;
      border: none;
    }

</style>