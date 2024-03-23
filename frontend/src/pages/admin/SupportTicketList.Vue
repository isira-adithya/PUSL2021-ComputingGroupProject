<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-white"><center>Support Ticket</center></h1>
        </div>
      </div>
      <div class="row">
        <div class="col" style="margin-bottom: 10px;">
          <h3 class="text-white mb-2">Filter by ticket status</h3><br><br>
          <button class="btn btn-primary mb-3 mr-2" @click="filterByStatus('new')">New Tickets</button>
          <button class="btn btn-primary mb-3" @click="filterByStatus('resolved')">Resolved Tickets</button>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table v-if="filteredTickets.length > 0" class="table table-bordered text-center text-white">
            <thead class="">
              <tr>
                <th scope="col">Ticket ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Subject</th>
                <th scope="col">Created At</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in filteredTickets" :key="ticket.id">
                <td class="align-middle">{{ ticket.id }}</td>
                <td class="align-middle">{{ ticket.name }}</td>
                <td class="align-middle">{{ ticket.email }}</td>
                <td class="align-middle">{{ ticket.subject }}</td>
                <td class="align-middle">{{ ticket.createdAt }}</td>
                <td class="align-middle">
                  <button class="btn btn-primary mb-3" @click="viewTicket(ticket.id)">View</button>
                  <button class="btn btn-danger mb-3" @click="deleteTicket(ticket.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-white" style="font-size: 150%;">No Tickets To View</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [
        { id: 1, name: 'John Doe', email: 'john@example.com', subject: 'Support Request', createdAt: '2024-03-21', status: 'new' },
        // Add more ticket data as needed
      ],
      filterStatus: 'all' // Default status filter
    };
  },
  computed: {
    filteredTickets() {
      if (this.filterStatus === 'new') {
        return this.tickets.filter(ticket => ticket.status === 'new');
      } else if (this.filterStatus === 'resolved') {
        return this.tickets.filter(ticket => ticket.status === 'resolved');
      } else {
        return this.tickets; // No filter applied
      }
    }
  },
  methods: {
    filterByStatus(status) {
      this.filterStatus = status;
    },
    viewTicket(ticketId) {
      // Implement view ticket functionality
      console.log("Viewing ticket with ID:", ticketId);
    },
    deleteTicket(ticketId) {
      // Implement delete ticket functionality
      console.log("Deleting ticket with ID:", ticketId);
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