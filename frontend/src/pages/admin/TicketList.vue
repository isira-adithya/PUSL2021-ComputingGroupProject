<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-white"><center>Tickets</center></h1> <!-- Add the heading here -->
        </div>
      </div>
      <div class="row">
        <div class="col" style="margin-bottom: 10px;">
          <h3 class="text-white mb-2">Filter by ticket read status</h3><br><br>
          <button class="btn btn-primary mb-3 mr-2" @click="filterByStatus('new')">New Tickets</button>
          <button class="btn btn-primary mb-3" @click="filterByStatus('viewed')">Already Viewed Ticket</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <!-- Event Table -->
          <table class="table table-bordered text-center text-white">
            <thead class="">
              <tr>
                <th scope="col">Ticket ID</th>
                <th scope="col">Full Name</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="event in filteredEvents" :key="event.id">
                <td class="align-middle">{{ event.id }}</td>
                <td class="align-middle">{{ event.fullName }}</td>
                <td class="align-middle">{{ event.email }}</td>
                <td class="align-middle">{{ event.createdAt }}</td>
                <td class="align-middle">
                  <button class="btn btn-primary mb-3" @click="viewEvent(event.id)">View Ticket</button>
                  <button class="btn btn-danger mb-3" @click="deleteEvent(event.id)">Delete</button>
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
export default {
  data() {
    return {
      events: [
        { id: 1, fullName: 'Sanuth Karunagoda', email: 'example@gmail.com', createdAt: '2024-01-21' },
        // Add more Ticket data as needed
      ],
      filterStatus: 'all' // Default status filter
    };
  },
  computed: {
    filteredEvents() {
      if (this.filterStatus === 'new') {
        return this.events.filter(event => !event.viewed);
      } else if (this.filterStatus === 'viewed') {
        return this.events.filter(event => event.viewed);
      } else {
        return this.events; // No filter applied
      }
    }
  },
  methods: {
    filterByStatus(status) {
      this.filterStatus = status;
    },
    viewEvent(eventId) {
      // Implement view event functionality
      console.log("Viewing event with ID:", eventId);
    },
    deleteEvent(eventId) {
      // Implement delete event functionality
      console.log("Deleting event with ID:", eventId);
    }
  }
};
</script>

<style scoped>
.bgbody {
  background-color: rgba(0, 0, 0, 0.921);
  color: white;
  height: 100vh;
}

.table-bordered th,
.table-bordered td {
  border-width: 3px;
}

/* Add margin to the buttons */
.mb-3 {
  margin-left: 4px;
}

h1{
  margin-bottom: 5%;
  margin-top: 5%;
}
</style>
