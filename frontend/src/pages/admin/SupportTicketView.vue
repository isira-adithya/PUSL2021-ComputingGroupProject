<template>
  <div class="bgbody">
    <div class="mb-4 text-center">
      <h1 class="text-white font-1">Ticket ID-{{ formData.id }}</h1><br>
    </div>
    <div>
      <div class="container">
        <div class="row">
          <!-- Left Part: Form -->
          <div class="col-md-6 mx-auto text-left">
            <form>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="name" class="form-label text-white">Name:</label>
                  <input type="text" v-model="formData.name" class="form-control white-bg no-border increased-height" id="name" readonly>
                </div>
                <div class="col-md-6">
                  <label for="email" class="form-label text-white">Email:</label>
                  <input type="text" v-model="formData.email" class="form-control white-bg no-border increased-height" id="email" readonly>
                </div>
                <div class="col-md-6">
                  <label for="date" class="form-label text-white">Date / Time:</label>
                  <input type="text" v-model="formData.date" class="form-control white-bg no-border increased-height" id="date" readonly>
                </div>
                <div class="col-md-6">
                  <label for="subject" class="form-label text-white">Subject</label>
                  <input type="text" v-model="formData.subject" class="form-control white-bg no-border increased-height" id="subject" readonly>
                </div>
              </div>
              <div class="mb-3">
                <label for="ticketContent" class="form-label text-white">Ticket Content:</label>
                <textarea v-model="formData.content" class="form-control white-bg no-border" id="ticketContent" rows="5" readonly></textarea>
              </div>
              <div class="mb-3">
                <button type="button" @click="deleteTicket" class="btn btn-danger mr-2" style="margin-right: 5px;">Delete</button>
                <button @click="goBack" class="btn btn-secondary" style="margin-right: 5px;">Go Back</button>
              </div>
            </form>
            <br>
          </div>
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
      formData: {
        id: null,
        name: '',
        email: '',
        date: '',
        subject: '',
        content: ''
      }
    }
  },
  mounted() {
    // Fetch ticket data from the backend when the component is mounted
    this.fetchTicketData();
  },
  methods: {
    fetchTicketData() {
      axios.get('/api/tickets/') // Replace '/api/tickets/' with actual API endpoint
        .then(response => {
          this.formData = response.data;
        })
        .catch(error => {
          console.error("Error fetching ticket data:", error);
        });
    },
    deleteTicket() {
      // Send a DELETE request to your backend API to delete the ticket
      axios.delete('/api/tickets/' + this.formData.id) // Replace '/api/tickets/' with your actual API endpoint
        .then(response => {
          console.log("Ticket deleted successfully");
          // Optionally, you can also reset the form data here
          this.formData = {
            id: null,
            name: '',
            email: '',
            date: '',
            subject: '',
            content: ''
          };
        })
        .catch(error => {
          console.error("Error deleting ticket:", error);
        });
    },
    goBack() {
      // Implement your logic to navigate back
      console.log("Navigating back...");
      // For now, let's just go to the previous page
      window.history.back();
    }
  }
}
</script>

<style scoped>
.bgbody {
  background-size: cover;
  background-attachment: fixed;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.95);
  margin: 0;
  padding: 0;
  height: 100vh;
}

.form-control {
  border: none;
  border-radius: 0;
  margin-bottom: 1rem;
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.increased-height {
  height: 50px;
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: none;
  color: #ffffff;
}

.font-1 {
  font-family: 'Stick No Bills', sans-serif;
}

label.form-label {
  text-align: left;
  display: block;
  margin-bottom: 0.2rem;
}

.white-bg {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.3);
}

.table-bordered th,
.table-bordered td {
  border-width: 4px;
}
</style>