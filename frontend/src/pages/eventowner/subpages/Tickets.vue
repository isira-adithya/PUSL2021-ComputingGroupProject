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
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Operations</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="ticket in tickets" :key="ticket.ticket_id">
                  <td class="align-middle">{{ ticket.id }}</td>
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
            <p v-else class="text-white" style="font-size: 150%;">No Old Tickets To View</p>
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
      
    },
    mounted() {
        Notiflix.Loading.dots();
        axios.get("/api/eventowner/tickets").then((response) => {
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
  