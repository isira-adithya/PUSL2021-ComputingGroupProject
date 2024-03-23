<template>
    <div class="bg-black">
      <div class="mb-4 text-center p-5">
        <h1 class="font-1 m-0 text-white">Buy Tickets</h1><br />
      </div>
      <div>
        <div class="container">
          <div class="row">
  
            <div class="col-md-6 mx-auto text-left">
              <form @submit.prevent="submitForm">
                <div class="row mb-4">
                  <div class="col-md-6 mb-5">
                    <label for="ID" class="form-label text-white">Ticket ID</label>
                    <input v-model="ticket.id" type="text" class="form-control white-bg " id="ID">
                  </div>
                  <div class="col-md-6 mb-5">
                    <label for="Name" class="form-label text-white">Event Name</label>
                    <input v-model="ticket.name" type="text" class="form-control white-bg " id="Name">
                  </div>
                  <div class="col-md-6 mb-5">
                    <label for="Price" class="form-label text-white">Ticket Price</label>
                    <input v-model="ticket.price" type="text" class="form-control white-bg  " id="Price">
                  </div>
                  <div class="col-md-6 mb-5">
                    <label for="Quantity" class="form-label text-white">Quantity</label>
                    <input v-model="ticket.quantity" type="number" class="form-control white-bg " id="Quantity">
                  </div>
                <div class="mb-5 ">
                  <label for="Description" class="form-label text-white">Description</label>
                  <textarea v-model="ticket.description" class="form-control white-bg " id="Description" rows="5"></textarea>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <button type="submit" class="btn text-white custom-button w-100">Buy</button>
                </div>
              </div>
              </form>
              <br />
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
          quantity: '',
          description: ''
        }
      };
    },
    methods: {
      submitForm() {
        // Logic to handle form submission
        console.log('Form submitted');
        console.log('Ticket Data:', this.ticket);
      },
      cancelPurchase() {
        // Logic to handle cancellation
        console.log('Purchase cancelled');
      }
    }
  };
  </script>
  
<style scoped>
  .bg-black{
    min-height:75.9vh;
  }

  .custom-input {
    border: none;
    border-radius: 0;
    margin-bottom: 3rem;
    color: #ffffff;
    background-color: rgb(0, 0, 0);
    border-radius: 8px;
    background-size: cover;
    background-position: center;
    padding-left: 40px; /* adjust the padding to accommodate the image */
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

  .form-control{
    border: none;  
  }

  .form-control:focus{
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.2);
    color: #ffffff;
  }

  .main-container {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
  }

  .white-bg {
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  .custom-button {
    background-color: #111F4D;
  }
  
  .custom-button:hover {
    background-color: #020923 !important;
  }
</style>