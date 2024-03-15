<template>
  <div class="container mt-4">
    <div class="row mb-3">
      <div class="col">
        <label for="location" class="form-label">Location:</label>
        <input id="location" v-model="filters.location" class="form-control" placeholder="Location">
      </div>
      <div class="col">
        <label for="eventType" class="form-label">Event Type:</label>
        <input id="eventType" v-model="filters.eventType" class="form-control" placeholder="Event Type">
      </div>
      <div class="col">
        <label class="form-label">Date Range:</label>
        <div class="input-group">
          <input type="date" v-model="filters.startDate" class="form-control" placeholder="Start Date">
          <span class="input-group-text">to</span>
          <input type="date" v-model="filters.endDate" class="form-control" placeholder="End Date">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <ul class="list-group">
          <li v-for="item in items" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ item.name }}</h5>
              <p class="mb-0">{{ item.location }} - {{ item.eventType }} - {{ item.date }}</p>
            </div>
            <button class="btn btn-sm btn-primary">Details</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filters: {
        location: '',
        eventType: '',
        startDate: '',
        endDate: ''
      },
      items: []
    }
  },
  mounted() {
    this.fetchEvents();
  },
  watch: {
    filters: {
      handler() {
        this.fetchEvents();
      },
      deep: true
    }
  },
  methods: {
    fetchEvents() {
      const { location, eventType, startDate, endDate } = this.filters;
      const query = new URLSearchParams({
        ...(location && { location }),
        ...(eventType && { eventType }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      }).toString();

      axios.get(`/api/common/events?${query}`)
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error(error);
        });
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