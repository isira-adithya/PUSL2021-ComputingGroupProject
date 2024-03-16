<template>
    <div>
      <!-- Event Table -->
      <div class="container mt-5">
        <table class="table table-bordered text-center text-white">
          <thead class="">
            <tr>
              <th scope="col">Event Name</th>
              <th scope="col">Event Description</th>
              <th scope="col">Venue</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(event, index) in events" :key="index">
              <td class="align-middle">{{ event.name }}</td>
              <td class="align-middle">{{ event.description }}</td>
              <td class="align-middle">{{ event.venue }}</td>
              <td class="align-middle">{{ event.date }}</td>
              <td class="align-middle">
                <button class="btn btn-primary" @click="viewEvent(event)">View Event</button>
                <button class="btn btn-danger" @click="deleteEvent(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [
          {
            name: 'Lumin 2024',
            description: 'A Huge DJ Night',
            venue: 'Sri Lanka',
            date: '2024/01/12'
          }
          // Add more events here if needed
        ]
      };
    },
    methods: {
      viewEvent(event) {
        // Implement view event functionality
        console.log('View event:', event);
      },
      deleteEvent(index) {
        // Implement delete event functionality
        this.events.splice(index, 1);
      }
    }
  };
  </script>
  
  <style scoped>
  body {
    background-color: black;
    /* Set background color to black */
    color: white;
    /* Set text color to white */
  }
  
  .table-bordered th,
  .table-bordered td {
    border-width: 3px;
    /* Set inner border width to 2px */
  }
  </style>
  