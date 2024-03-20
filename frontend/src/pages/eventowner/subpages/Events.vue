<template >
<div class="bg-black " :style="[background]">
  <div v-if="events.length > 0" class="d-flex ">
    <div class="row w-100 flex-wrap justify-content-center text-center ">
      <div class="title-box m-5">
        <h1 class="font-1 text-white" >Events</h1>
      </div>
      <div v-for="event in events" :key="event.id" class="col-xl-4 col-xxl-3 col-lg-4 col-md-10 col-sm-10 m-3">
        <div class="card custom-card d-flex justify-content-center">
          <ImagesCarouselVue class="card-img-top rounded border" v-if="event.images != null" :images="event.images" :auto-slide-show="true" :slide-show-interval="5000" />
          <div class="card-body d-flex text-center">
            <div>
              <h5 class="card-title">{{ event['name'] }}</h5>
              <p class="card-text">
                {{ event['description'].toString().length > 150 ? event['description'].toString().substring(0, 150) + "..." : event['description'] }}
              </p>
            </div>
          </div>
          
          <ul class="list-group list-group-flush mb-3 ">
            <li class="list-group-item">Category: <i><b>{{ event['category'].charAt(0).toUpperCase() + event['category'].slice(1) }}</b></i></li>
            <li class="list-group-item">Location: <i><b>{{ event['location'] }}</b></i></li>
            <li class="list-group-item">Date: <b>{{ new Date(event['date_time']).toDateString() }}</b></li>
            <li class="list-group-item">Time: <b>{{ new Date(event['date_time']).toLocaleTimeString() }}</b></li>
          </ul>

          <div class="button-container d-flex justify-content-center ">
            <router-link :to="'/events/' + event.uuid" class="btn btn-primary custom-button m-1">Open</router-link>
            <router-link :to="'/eventowner/dashboard/event/' + event.uuid" class="btn btn-primary custom-button m-1">Edit Event</router-link>
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

      imagePath1:
        process.env.BASE_URL + "assets/images/home-images/home-pageBG.jpg",
    };
  },
    
  methods: {},

  computed:{
  background() {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${this.imagePath1})`, // Dynamically set the URL
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    },
  }
};
</script>

<style scoped>

    .bg-black{
      height: 75.9vh;
    }

    .custom-card {
      width: 300px;
      background-color: #1a1a1a;
      color: #ffffff;
      padding: 20px;
      border: solid 2px #111f4d;
      flex-direction: column;
      height: 100%;
      margin: 0 auto; 
    }

    
    .custom-card img {
      max-width: 200px;
      height: 300px;
    }

    .list-group-item{
      background-color: #1a1a1a;
      color: #ffffff;
      border: none;
    }

    .card-body {
      flex: 1;
    }

    .custom-button {
      background-color: #111F4D;
      border: none;
      width: 100%; 
    }

    .custom-button:hover {
      background-color: #020923 !important;
    }

    .font-1 {
      font-family: "Stick No Bills", sans-serif;
    }

    @media (max-width: 1500px) {
      .bg-black {
        height: auto !important; 
      }
    }

</style>