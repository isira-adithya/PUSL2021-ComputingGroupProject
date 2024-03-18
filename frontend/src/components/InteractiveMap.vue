<template>
  <div>
    <div class="drawer position-fixed bg-light p-3">
      <ul class="list-unstyled">
        <li
          v-for="event in events"
          :key="event.event_id"
          @click="focusOnEvent(event)"
          class="mb-3 p-2 rounded shadow-sm "
          :style="{
            cursor: 'pointer',
            backgroundColor: focusedEventId === event.event_id ? '#f1f1fa' : 'white',
          }"
        >
          <h5 class="mb-2">{{ event.name }}</h5>
          <p class="mb-1">Location: {{ event.location }}</p>
          <p class="mb-1">Category: {{ event.category }}</p>
          <p class="mb-2">
            <code>
              Date: {{ formatDate(event.date_time) }} <br />
              Time: {{ formatTime(event.date_time) }}
            </code>
          </p>
          <a class="btn btn-sm btn-dark">View</a>
        </li>
      </ul>
    </div>

    <GoogleMap
      api-key="AIzaSyDnV2rwyXF7RyjlVqUM8OIqF8NyylUscAk"
      ref="map"
      :center="mapCenter"
      :zoom="13"
      map-type-id="terrain"
      style="width: 100%; height: 500px"
    >
      <CustomMarker
        v-for="event in events"
        :key="event.id"
        :options="{
          position: event.location_geocoordinates,
          anchorPoint: 'BOTTOM_CENTER',
        }"
        @click="focusOnEvent(event)"
      >
        <div class="p-2 bg-white rounded shadow-sm">
          <div class="fw-bold mb-1">{{ event.name }}</div>
          <img
            :src="event.images[0]"
            alt="Vue.js Logo"
            width="90"
            height="50"
          />
        </div>
      </CustomMarker>
    </GoogleMap>
  </div>
</template>

<script>
import { GoogleMap, CustomMarker } from "vue3-google-map";

export default {
  name: "InteractiveMapVue",
  components: {
    GoogleMap,
    CustomMarker,
  },
  props: {
    events: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      mapCenter: this.events[0].location_geocoordinates,
      focusedEventId: null,
    };
  },
  methods: {
    focusOnEvent(event) {
      console.log(event);
      this.mapCenter = event.location_geocoordinates;
      this.focusedEventId = event.event_id;
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString(); 
    },
    formatTime(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleTimeString(); 
    },
  },
};
</script>

<style scoped>
.drawer {
  width: 30%;
  height: 50%;
  z-index: 1000;
  overflow-y: auto;
}
</style>