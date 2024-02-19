<template>
  <div class="bg-black" style="width: 100%; height: 100%">
    <div v-if="events.length > 0">
      <div v-for="event in events" :key="event.id" class="card" style="width: 18rem">
        <img src="https://isiraadithya.com/test.jpg" class="card-img-top" />
        <div class="card-body">
          <h5 class="card-title">{{ event['name'] }}</h5>
          <p class="card-text">
            {{ event['description'] }}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Category: <i><b>{{ event['category'].charAt(0).toUpperCase() + event['category'].slice(1) }}</b></i></li>
          <li class="list-group-item">Location: <i><b>{{ event['location'] }}</b></i></li>
          <li class="list-group-item">{{ new Date(event['date_time']).getDate() }}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
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
export default {
  name: "EventOwnerEventsVue",
  components: {},
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