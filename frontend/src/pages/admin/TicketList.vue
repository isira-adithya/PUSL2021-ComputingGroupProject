<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-white"><center>Tickets</center></h1> <!-- Add the heading here -->
        </div>
      </div>
      <div class="row">
        <div class="col">
          <!-- Event Table -->
          <table v-if="tickets.length > 0" class="table table-bordered text-center text-white">
            <thead class="">
              <tr>
                <th scope="col">Ticket ID</th>
                <th scope="col">Ticket Name</th>
                <th scope="col">Username</th>
                <th scope="col">Event</th>
                <th scope="col">Price</th>
                <th scope="col">Operations</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ticket in tickets" :key="ticket.ticket_id">
                <td class="align-middle">{{ ticket.ticket_id }}</td>
                <td class="align-middle">{{ ticket.name }}</td>
                <template v-if="ticket.event != null">
                  <td class="align-middle"><router-link :to="`/admin/user-management/${ticket.event.user.user_id}`">{{ ticket.event.user.user_name }}</router-link></td>
                  <td class="align-middle"><router-link :to="`/admin/event-management/${ticket.event.uuid}`">{{ ticket.event.name }}</router-link></td>
                </template>
                <template v-else>
                  <td class="align-middle">[USER_NOT_FOUND]</td>
                  <td class="align-middle">[EVENT_DELETED]</td>
                </template>
                <td class="align-middle">{{ ticket.price }}</td>
                <td class="align-middle">
                  <router-link :to="`/admin/dashboard/ticket/${ticket.ticket_id}`" class="btn btn-primary mb-3">View Payments</router-link>
                  <button class="btn btn-danger mb-3" @click="deleteTicket(ticket)">Delete</button>
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
import axios from 'axios';
import Notiflix from 'notiflix';
export default {
  name: "TicketsVue",
  data() {
    return {
      tickets: [],
    };
  },
  computed: {
      
  },
  methods: {
      deleteTicket(ticket) {
          Notiflix.Confirm.show('Delete Ticket', 'Are you sure you want to delete this ticket?', 'Yes', 'No', () => {
              axios.delete(`/api/admin/tickets/${ticket.ticket_id}`).then((response) => {
                  Notiflix.Report.success('Success', 'Ticket Deleted Successfully', 'OK');
                  this.tickets = this.tickets.filter((t) => t.ticket_id !== ticket.ticket_id);
              }).catch((error) => {
                  Notiflix.Report.failure('Error', 'Ticket Deletion Failed', 'OK');
              });
          });
      },  
  },
  mounted() {
      Notiflix.Loading.dots();
      axios.get("/api/admin/tickets").then((response) => {
        this.tickets = response.data;
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        Notiflix.Loading.remove();
      });
  }
};
</script>

<style scoped>
.bgbody {
  background-color: rgba(0, 0, 0, 0.95);
  color: white;
  min-height: 75.9vh;
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
