<template>
    <div class="bgbody">
      <div class="mb-4 text-center">
        <h3 class="font-1">Ticket ID-2</h3><br>
      </div>
      <div>
        <div class="container">
          <div class="row">
            <!-- Left Part: Form -->
            <div class="col-md-6 mx-auto text-left">
              <form>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="name" class="form-label">Username:</label>
                    <input type="text" v-model="formData.name" class="form-control white-bg no-border increased-height" id="name">
                  </div>
                  <div class="col-md-6">
                    <label for="email" class="form-label">User E-mail:</label>
                    <input type="text" v-model="formData.email" class="form-control white-bg no-border increased-height" id="email">
                  </div>
                  <div class="col-md-6">
                    <label for="Date" class="form-label">Date / Time:</label>
                    <input type="text" v-model="formData.date" class="form-control white-bg no-border increased-height" id="date">
                  </div>
                  <div class="col-md-6">
                    <label for="subject" class="form-label">Status</label>
                    <input type="text" v-model="formData.status" class="form-control white-bg no-border increased-height" id="subject">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="title" class="form-label">Title</label>
                  <textarea v-model="formData.title" class="form-control white-bg no-border" id="title" rows="1"></textarea>
                </div>
                <div class="mb-3">
                  <label for="ticketContent" class="form-label">Ticket Content / Subject:</label>
                  <textarea v-model="formData.content" class="form-control white-bg no-border" id="ticketContent" rows="5"></textarea>
                </div>
                <button type="button" @click="markAsRead" class="btn btn-primary">Mark As Read</button>
                <button type="button" @click="deleteTicket" class="btn btn-danger">Delete</button>
                <button @click="goBack" class="btn btn-secondary">Go Back</button>
              </form>
              <br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: '',
          email: '',
          date: '',
          status: '',
          title: '',
          content: ''
        }
      }
    },
    methods: {
      markAsRead() {
        // Implement your logic to mark the ticket as read
      },
      deleteTicket() {
        // Implement your logic to delete the ticket
      },
      goBack() {
        // Implement your logic to navigate back
      }
    }
  }
  </script>
  
  <style scoped>
  .bgbody {
    background-size: cover;
    background-attachment: fixed;
    color: #ffffff;
    background-color: #000000;
    margin: 0;
    padding: 0;
  }
  
  .form-control {
    border: none;
    border-radius: 0;
    margin-bottom: 3rem;
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
  
  .font-2 h2 {
    font-size: 23px;
    font-weight: 750;
    margin-top: 20px;
    margin-bottom: 40px;
  }
  
  label.form-label {
    text-align: left;
    display: block;
    margin-bottom: 0.2rem;
  }
  
  a {
    color: #ffffff;
  }
  
  .main-container {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
  }
  
  .white-bg {
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.3);
  }
  </style>
  