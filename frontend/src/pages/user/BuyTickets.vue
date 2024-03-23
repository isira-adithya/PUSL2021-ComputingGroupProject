<template>
    <div>
      <br /><br />
      <div class="mb-4 text-center">
        <h3 class="font-1">Buy Tickets</h3><br />
      </div>
      <div>
        <div class="container">
          <div class="row">
  
            <div class="col-md-6 mx-auto text-left">
              <form @submit.prevent="submitForm">
                <div class="row mb-3">
                  <div class="col-md-6">
                    <label for="ID" class="form-label">Ticket ID</label>
                    <input v-model="ticket.id" type="text" class="form-control white-bg no-border increased-height" id="ID">
                  </div>
                  <div class="col-md-6">
                    <label for="Name" class="form-label">Event Name</label>
                    <input v-model="ticket.name" type="text" class="form-control white-bg no-border increased-height" id="Name">
                  </div>
                  <div class="col-md-6">
                    <label for="Price" class="form-label">Ticket Price</label>
                    <input v-model="ticket.price" type="text" class="form-control white-bg no-border increased-height" id="Price">
                  </div>
                  <div class="col-md-6">
                    <label for="Quantity" class="form-label">Quantity</label>
                    <input v-model="ticket.quantity" type="number" class="form-control white-bg no-border increased-height" id="Quantity">
                  </div>
                </div>
                <div class="mb-3">
                  <label for="Description" class="form-label">Description</label>
                  <textarea v-model="ticket.description" class="form-control white-bg no-border" id="Description" rows="5"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Buy</button>
                <button type="button" @click="cancelPurchase" class="btn btn-danger">Cancel</button>
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
  