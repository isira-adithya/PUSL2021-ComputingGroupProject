<template>
  <div class="bg-black" v-if="ticket != null">
    <div class="mb-4 text-center p-5">
      <h1 class="font-1 m-0 text-white  mb-4">Buy Tickets for {{ ticket.event_name }}</h1>
      <img :src="ticket.event_images[0]" alt="">
      <br />
    </div>
    <div>
      <div class="container">
        <div class="row">
          <div class="col-md-6 mx-auto text-left">
            <form @submit.prevent="submitForm">
              <div class="row mb-4">
                <div class="col-md-6 mb-5">
                  <label for="ID" class="form-label text-white"
                    >Ticket Name</label
                  >
                  <input
                    v-model="ticket.name"
                    type="text"
                    class="form-control text-black"
                    id="ID"
                    disabled
                  />
                </div>
                <div class="col-md-6 mb-5">
                  <label for="Name" class="form-label text-white"
                    >Event Name</label
                  >
                  <input
                    v-model="ticket.event_name"
                    type="text"
                    class="form-control text-black"
                    id="Name"
                    disabled
                  />
                </div>
                <div class="mb-5">
                  <label for="Description" class="form-label text-white"
                    >Description</label
                  >
                  <textarea
                    v-model="ticket.description"
                    class="form-control text-black"
                    id="Description"
                    rows="5"
                    disabled
                  ></textarea>
                </div>
                <div class="col-md-6 mb-5">
                  <label for="Price" class="form-label text-white"
                    >Ticket Price ($)</label
                  >
                  <input
                    v-model="ticket.price"
                    type="text"
                    class="form-control text-black"
                    id="Price"
                    disabled
                  />
                </div>
                <div class="col-md-6 mb-2">
                  <label for="Quantity" class="form-label text-white"
                    >Quantity</label
                  >
                  <input
                    v-model="ticket_quantity"
                    type="number"
                    class="form-control text-white"
                    id="Quantity"
                    @change="total_price = ticket_quantity * ticket.price"
                  />
                </div>
              </div>
              <div class="mb-5">
                <label for="Total" class="form-label text-white"
                  >Total Price ($)</label
                >
                <input
                  v-model="total_price"
                  type="text"
                  class="form-control text-black"
                  id="Total"
                  disabled
                />
              </div>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-6 mb-3">
                  <button
                  @click="buyTicket()"
                  type="submit"
                  class="btn btn-primary custom-button w-100"
                  >
                  Buy
                </button>
                <div class="col-3"></div>
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
import Notiflix from 'notiflix';
import axios from 'axios';

export default {
  
  data() {
    return {
      ticket: null,
      ticket_quantity: 0,
      total_price: 0,
    };
  },
  mounted() {
    // Fetch the event data
    Notiflix.Loading.change('Please wait...');
    axios
      .get(`/api/common/tickets/${this.$route.params.id}`)
      .then((response) => {
        this.ticket = response.data;
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        Notiflix.Loading.remove();
      });
  },
  methods: {
    buyTicket() {
      if (this.ticket_quantity <= 0) {
        Notiflix.Notify.failure("Please enter a valid quantity!");
        return;
      }
      Notiflix.Confirm.show(
        "Buy Ticket",
        "Are you sure you want to buy this ticket?",
        "Yes",
        "No",
        () => {
          Notiflix.Loading.standard();
          axios
            .post(`/api/common/tickets/buy`, {
              ticket_id: this.ticket.ticket_id,
              quantity: this.ticket_quantity
            })
            .then((response) => {
              const paymentResponse = response.data;
              if (paymentResponse['success']){
                window.location.href = paymentResponse['approvalLink'];
              } else {
                Notiflix.Notify.failure("Failed to buy ticket!");
              }
            })
            .catch((error) => {
              Notiflix.Notify.failure("Something went wrong. Please try again later.");
              console.log(error);
            })
            .finally(() => {
              Notiflix.Loading.remove();
            });
        },
        function () {}
      );
    },
  },
};
</script>
  
<style scoped>
.bg-black {
  min-height: 75.9vh;
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
  font-family: "Stick No Bills", sans-serif;
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

.form-control {
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
}

.form-control:focus {
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.2);
}

.main-container {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 10px;
}

.custom-button {
  background-color: #111f4d;
}

  .custom-button {
    background-color: #111F4D;
  }
  
  .custom-button:hover {
    background-color: #020923 !important;
  }
</style>