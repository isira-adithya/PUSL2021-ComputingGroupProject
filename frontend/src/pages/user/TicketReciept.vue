<template>
    <div class="bg-black">
      <div class="mb-4 text-center p-5">
        <h1 class="font-1 m-0 text-white">Ticket Receipt</h1>
      </div>
      <div>
        <div class="container">
          <div class="row">
            <div class="col-md-6 mx-auto text-left">
              <form>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="id" class="form-label text-white">Ticket ID</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.id" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="name" class="form-label text-white">Ticket Name</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.name" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="price" class="form-label text-white">Ticket Price</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.price" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="EventName" class="form-label text-white">Event Name</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.eventName" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="PayMethod" class="form-label text-white">Payment Method</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.paymentMethod" disabled>
                  </div>
                  <div class="col-md-6">
                    <label for="Date/Time" class="form-label text-white">Payment Date/Time</label>
                    <input type="text" class="form-control white-bg no-border increased-height" v-model="ticket.paymentDateTime" disabled>
                  </div>
                </div>
                <div class="row">
                <div class="col-md-6 mb-3">
                  <button type="submit" class="btn text-white custom-button w-100">Print</button>
                </div>
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
  export default {
    data() {
      return {
        ticket: {
          id: '',
          name: '',
          price: '',
          eventName: '',
          paymentMethod: '',
          paymentDateTime: ''
        }
      };
    },
    methods: {
      printTicket() {
        // Print logic goes here
        console.log('Printing ticket...');
      }
    }
  }
  </script>
  
  <style scoped>
  .bg-black{
    min-height:75.9vh;
  }
  
  .form-control {
    border: none;
    border-radius: 0;
    margin-bottom: 3rem;
    color: #ffffff;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    padding-left: 40px; /* adjust the padding to accommodate the image */
  }
  
  .increased-height {
    height: 50px;
  }
  
  .form-control:focus {
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: none;
    color: #ffffff;
  }
  
  .form-control:disabled{
      background-color: rgba(255, 255, 255, 0.2);
  }
  
  .font-1 {
    font-family: 'Stick No Bills', sans-serif;
    margin-top: 20px;
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

    
  .custom-button {
    background-color: #111F4D;
  }
  
  .custom-button:hover {
    background-color: #020923 !important;
  }
  </style>