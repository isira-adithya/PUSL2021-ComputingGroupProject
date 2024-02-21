<template>
    <div v-if="events != null">
        <div class="row">
          <div v-for="event in events" :key="event.id" class="col-xl-4 col-xxl-3 col-lg-4 col-md-10 col-sm-10 m-2">
            <div class="card">
              <ImagesCarouselVue class="card-img-top rounded border" v-if="event.images != null" :images="event.images" :auto-slide-show="true" :slide-show-interval="1000" />
              <div class="card-body">
                <h5 class="card-title">{{ event['name'] }}</h5>
                <p class="card-text">
                  {{ event['description'].toString().length > 150 ? event['description'].toString().substring(0, 150) + "..." : event['description'] }}
                </p>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Category: <i><b>{{ event['category'].charAt(0).toUpperCase() + event['category'].slice(1) }}</b></i></li>
                <li class="list-group-item">Location: <i><b>{{ event['location'] }}</b></i></li>
                <li class="list-group-item">Date: <b>{{ new Date(event['date_time']).toDateString() }}</b></li>
                <li class="list-group-item">Time: <b>{{ new Date(event['date_time']).toLocaleTimeString() }}</b></li>
              </ul>
              <div class="card-body">
                <router-link :to="'/events/' + event.uuid" class="btn btn-primary mx-3 my-1">Open</router-link>
                <router-link :to="'/eventowner/dashboard/event/' + event.uuid" class="btn btn-primary mx-3 my-1">Edit Event</router-link>
              </div>
            </div>
            </div>
        </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import Notiflix from 'notiflix';
import ImagesCarouselVue from '../../components/ImagesCarousel.vue';

  export default {
    name: "PublicEventsVue",
    components: {ImagesCarouselVue},
    mounted() {
      Notiflix.Loading.dots('Loading...');
        axios.get('/api/common/events').then(response => {
            this.events = response.data;
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            Notiflix.Loading.remove();
        });
    },
    data() {
      return {
        events: null
      };
    },
    methods: {
    },
  };
  </script>