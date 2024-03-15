<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <div class="col">
        <label for="location" class="form-label">Location:</label>
        <input id="location" v-model="filters.location" class="form-control" placeholder="Location">
      </div>
      <div class="col">
        <label for="eventType" class="form-label">Event Type:</label>
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
      <div class="col">
        <label class="form-label">Date Range:</label>
        <div class="input-group">
          <input type="date" v-model="filters.startDate" class="form-control" placeholder="Start Date">
          <span class="input-group-text">to</span>
          <input type="date" v-model="filters.endDate" class="form-control" placeholder="End Date">
        </div>
      </div>
      <div class="col">
        <button class="btn btn-primary" @click="findNearMe">Find Events Near Me</button>
      </div>
    </div>
  </div>
</template>

<script>
import Notiflix from 'notiflix';

export default {
  data() {
    return {
      filters: {
        location: '',
        eventType: '',
        startDate: '',
        endDate: ''
      },
      url_query: '',
      userCoordinates: null
    }
  },
  mounted() {
    this.buildQuery();
  },
  watch: {
    filters: {
      handler() {
        this.buildQuery();
      },
      deep: true
    }
  },
  methods: {
    buildQuery() {
      const { location, eventType, startDate, endDate } = this.filters;
      const query = new URLSearchParams({
        ...(location && { location }),
        ...(eventType && { eventType }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      }).toString();
      this.url_query = query;
      return query;
    },
    findNearMe() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userCoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            };
            // You can now use this.userCoordinates to filter events near the user's location
            console.log('User coordinates:', this.userCoordinates);
          },
          (error) => {
            console.error('Error getting location:', error);
            Notiflix.Notify.Failure('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        Notiflix.Notify.Failure('Geolocation is not supported by this browser.');
      }
    }
  }
}
</script>

<style scoped>
.list-group-item {
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>