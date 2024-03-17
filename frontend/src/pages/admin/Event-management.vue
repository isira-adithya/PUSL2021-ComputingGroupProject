<template>
<div class="bgbody">
  <div class="container">
    <div class="row">
        <div class="col">
    <table class="table table-bordered text-center text-white">
      <thead class="">
        <tr>
          <th scope="col">Event Name</th>
          <th scope="col">Event Type</th>
          <th scope="col">Location</th>
          <th scope="col">Date / Time</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="index">
          <td class="align-middle">{{ event.eventName }}</td>
          <td class="align-middle">{{ event.eventType }}</td>
          <td class="align-middle">{{ event.location }}</td>
          <td class="align-middle">{{ event.dateTime }}</td>
          <td class="align-middle">
            <button class="btn btn-primary" @click="viewTicket(event)">View Ticket</button>
            <button class="btn btn-danger" @click="deleteEvent(event)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
        </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      events: []
    };
  },
  mounted() {
    this.fetchEvents(); // Fetch events when the component is mounted
  },
  methods: {
    fetchEvents() {
      // Replace this URL with your backend API endpoint to fetch events
      const apiUrl = 'https://your-backend-api.com/events';

      // Fetch events from the backend using Axios
      axios.get(apiUrl)
        .then(response => {
          this.events = response.data; // Update the events array with data from the backend
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },
    viewTicket(event) {
      // Add logic to view the ticket of an event
      console.log('Viewing ticket of:', event);
    },
    deleteEvent(event) {
      // Add logic to delete an event
      const index = this.events.indexOf(event);
      if (index !== -1) {
        this.events.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
.bgbody {
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  height: 100vh;
}

.table-bordered th,
.table-bordered td {
  border-width: 4px;
  
}

/* Add margin to the buttons */
.mb-3 {
  margin-left: 4px;
}

h1{
  margin-bottom: 5%;
  margin-top: 5%;
  font-family: 'Stick No Bills', sans-serif;
  
}
</style>
