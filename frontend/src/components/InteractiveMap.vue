<template>
  <div>
    <div class="drawer position-fixed bg-light p-3">
      <h2 class="mb-4">Events</h2>
      <ul class="list-unstyled">
        <li
          v-for="event in events"
          :key="event.id"
          @click="focusOnEvent(event)"
          class="mb-3 p-2 rounded bg-white shadow-sm"
        >
          <h3 class="mb-2">{{ event.name }}</h3>
          <p class="mb-1">{{ event.location }}</p>
          <p class="mb-0">{{ event.date }}</p>
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
        :options="{ position: event.coordinates, anchorPoint: 'BOTTOM_CENTER' }"
        @click="focusOnEvent(event)"
      >
        <div class="p-2 bg-white rounded shadow-sm">
          <div class="fw-bold mb-1">{{ event.name }}</div>
          <img
            src="https://vuejs.org/images/logo.png"
            alt="Vue.js Logo"
            width="30"
            height="30"
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
      mapCenter: { lat: 37.7749, lng: -122.4194 },
      events_backup: [
        {
          id: 1,
          name: "Musical Show",
          location: "New York, NY",
          date: "2024-05-01",
          coordinates: { lat: 40.7128, lng: -74.006 },
        },
        {
          id: 2,
          name: "Sports Event",
          location: "Los Angeles, CA",
          date: "2024-06-15",
          coordinates: { lat: 34.0522, lng: -118.2437 },
        },
        // Add more events here
      ],
    };
  },
  methods: {
    focusOnEvent(event) {
      this.mapCenter = event.coordinates;
    },
  },
};
</script>

<style scoped>
.drawer {
  width: 300px;
  z-index: 1000;
  overflow-y: auto;
}
</style>