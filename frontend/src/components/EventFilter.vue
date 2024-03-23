<template>
  <div class="container">
    <div class="row justify-content-center mb-3">
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <!-- Location Input -->
        <label for="location" class="form-label text-white">Location:</label>
        <input
          id="location"
          v-model="filters.location"
          class="form-control"
          placeholder="Location"
          @keyup="filters.geoCoordinates = ''"
        />
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3">
        <!-- Event Type Select -->
        <label for="eventType" class="form-label text-white">Event Type:</label>
        <select id="eventType" v-model="filters.eventType" class="form-select">
          <option value="">Select Event Type</option>
          <option value="Musical">Musical</option>
          <option value="Sports">Sports</option>
          <option value="Educational">Educational</option>
          <option value="Religious">Religious</option>
          <option value="Charity">Charity</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div class="col-lg-4 col-md-12 col-sm-12">
        <!-- Date Range Inputs -->
        <label class="form-label text-white">Date Range:</label>
        <div class="input-group">
          <input
            type="date"
            v-model="filters.startDate"
            class="form-control"
            placeholder="Start Date"
          />
          <span class="input-group-text">to</span>
          <input
            type="date"
            v-model="filters.endDate"
            class="form-control"
            placeholder="End Date"
          />
        </div>
      </div>
    </div>
    <div class="row mb-3 justify-content-center">
      <!-- Find Near Me Button -->
      <div class="col-lg-4 col-md-6 col-sm-12 text-center mb-3">
        <button class="btn btn-primary mt-4" @click="findNearMe">
          Find Events Near Me
        </button>
      </div>
      <div class="col-lg-4 col-md-6 col-sm-12 mb-3"></div>
      <!-- Show/Hide Interactive Map Button -->
      <div class="col-lg-4 col-md-12 col-sm-12 text-center">
        <button class="btn btn-dark mt-4" @click="toggleInteractiveMapMode">
          {{ isInteractiveMapMode ? "Hide" : "Show" }} Interactive Map
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Notiflix from "notiflix";

export default {
  data() {
    return {
      filters: {
        location: "",
        eventType: "",
        startDate: "",
        endDate: "",
        geoCoordinates: "",
      },
      url_query: "",
      isInteractiveMapMode: false,
    };
  },
  mounted() {
    this.buildQuery();
  },
  watch: {
    filters: {
      handler(e) {
        this.buildQuery();
        this.emitChanges();
      },
      deep: true,
    },
  },
  methods: {
    buildQuery() {
      const { location, eventType, startDate, endDate, geoCoordinates } =
        this.filters;
      const query = new URLSearchParams({
        ...(location && { location }),
        ...(eventType && { eventType }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(geoCoordinates && { geoCoordinates }),
      }).toString();
      this.url_query = query;
      return query;
    },
    findNearMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.filters.geoCoordinates = JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            this.filters.location = "";
            console.log("User coordinates:", this.filters.geoCoordinates);
          },
          (error) => {
            console.error("Error getting location:", error);
            this.filters.geoCoordinates = JSON.stringify({
              latitude: 8.4074843,
              longitude: 81.1450867,
            });
            this.filters.location = "";
            Notiflix.Notify.failure("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        Notiflix.Notify.failure(
          "Geolocation is not supported by this browser."
        );
      }
    },
    toggleInteractiveMapMode() {
      this.isInteractiveMapMode = !this.isInteractiveMapMode;
      this.emitChanges();
    },
    emitChanges() {
      this.$emit("eventFilterChanged", {
        isInteractiveMapMode: this.isInteractiveMapMode,
        url_query: this.url_query,
        filters: this.filters,
      });
    },
  },
};
</script>

<style scoped>
.list-group-item {
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>
