<template>
    <div v-if="event != null">
        Hello World
    </div>
  </template>
  
  <script>
import axios from 'axios';
import Notiflix from 'notiflix';
// import ImagesCarouselVue from '../../components/ImagesCarousel.vue';

  export default {
    name: "PublicEventsVue",
    // components: {ImagesCarouselVue},
    mounted() {
      Notiflix.Loading.dots('Loading...');
        axios.get(`/api/common/events/${1}`).then(response => {
            this.events = response.data;
        }).catch(error => {
            console.log(error);
        }).finally(() => {
            Notiflix.Loading.remove();
        });
    },
    data() {
      return {
        event: null
      };
    },
    methods: {
    },
  };
  </script>