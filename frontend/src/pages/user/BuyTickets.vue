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
                    class="form-control text-white"
                    id="ID"
                  />
                </div>
                <div class="col-md-6 mb-5">
                  <label for="Name" class="form-label text-white"
                    >Event Name</label
                  >
                  <input
                    v-model="ticket.event_name"
                    type="text"
                    class="form-control text-white"
                    id="Name"
                  />
                </div>
                <div class="mb-5">
                  <label for="Description" class="form-label text-white"
                    >Description</label
                  >
                  <textarea
                    v-model="ticket.description"
                    class="form-control text-white"
                    id="Description"
                    rows="5"
                  ></textarea>
                </div>
                <div class="col-md-6 mb-5">
                  <label for="Price" class="form-label text-white"
                    >Ticket Price</label
                  >
                  <input
                    v-model="ticket.price"
                    type="text"
                    class="form-control text-white"
                    id="Price"
                  />
                </div>
                <div class="col-md-6 mb-5">
                  <label for="Quantity" class="form-label text-white"
                    >Quantity</label
                  >
                  <input
                    v-model="ticket_quantity"
                    type="number"
                    class="form-control text-white"
                    id="Quantity"
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <button
                    type="submit"
                    class="btn text-white custom-button w-100"
                  >
                    Buy
                  </button>
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
      ticket_quantity: 1,
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
    submitForm() {
      // Logic to handle form submission
      console.log("Form submitted");
      console.log("Ticket Data:", this.ticket);
    },
    cancelPurchase() {
      // Logic to handle cancellation
      console.log("Purchase cancelled");
    },
    buyTicket() {
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
            })
            .then((response) => {
              Notiflix.Notify.success("Ticket bought successfully!");

              // Refresh the page
              axios
                .get(`/api/common/events/${this.uuid}`)
                .then((response) => {
                  this.event = response.data;
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              Notiflix.Notify.failure("You have to login to buy a ticket!");
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

.custom-button:hover {
  background-color: #020923 !important;
}
</style>