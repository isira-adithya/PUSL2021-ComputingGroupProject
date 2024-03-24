<template>
  <div class="bg-black">
    <div class="mb-4 text-center p-5">
      <h1 class="font-1 m-0 text-white">Ticket Receipt</h1>
    </div>
    <div>
      <div class="container" v-if="receipt != null">
        <div class="row">
          <div class="col-8 mx-auto text-left">
            <form>
              <div class="row mb-3">
                <img v-if="receipt.ticket.event != null" :src="receipt.ticket.event.images.split(',')[0]" class="mb-5">
                <div class="col-md-6">
                  <label for="id" class="form-label text-white"
                    >Receipt ID</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.receipt_id"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="EventName" class="form-label text-white"
                    >Event Name</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.ticket.event.name"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="price" class="form-label text-white"
                    >Ticket Price</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="ticket_price"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="name" class="form-label text-white"
                    >Ticket Name</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.ticket.name"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="PayMethod" class="form-label text-white"
                    >Payment Method</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.payment_method"
                    disabled
                  />
                </div>
                <div class="col-md-6">
                  <label for="Date/Time" class="form-label text-white"
                    >Payment Date/Time</label
                  >
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.created_at"
                    disabled
                  />
                </div>
                <div>
                  <label for="Date/Time" class="form-label text-white"
                    >Ticket Code</label
                  >
                  <pre class="text-white-50">This code is used to identify the ticket in an event.</pre>
                  <pre class="text-white-50">Please store this code in a safe place.</pre>
                  <input
                    type="text"
                    class="form-control white-bg no-border increased-height"
                    v-model="receipt.ticket_code"
                    disabled
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-3"></div>
                <div class="col-6 mb-3">
                  <div
                  class="btn text-white custom-button w-100"
                  @click="printTicket"
                  >
                  Print
                </div>
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
import axios from 'axios';
import Notiflix from 'notiflix';
export default {
  mounted() {
    Notiflix.Loading.arrows();
    axios
      .get("/api/eventowner/ticket-payments/" + this.$route.params.id)
      .then((response) => {
        this.receipt = response.data;
        this.ticket_price = (this.receipt.payment.amount / this.receipt.payment.ticket_quantity).toString() + "$";
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        Notiflix.Loading.remove();
      });
  },
  data() {
    return {
      receipt: null,
      ticket_price: 0
    };
  },
  methods: {
    printTicket() {
      window.print();
    },
  },
};
</script>
  
  <style scoped>
.bg-black {
  min-height: 75.9vh;
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

.form-control:disabled {
  background-color: rgba(255, 255, 255, 0.2);
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
  background-color: #111f4d;
}

.custom-button:hover {
  background-color: #020923 !important;
}
</style>