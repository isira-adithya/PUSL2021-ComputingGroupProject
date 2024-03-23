<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-white"><center>Your Tickets 🎫</center></h1>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <table v-if="receipts.length > 0" class="table table-bordered text-center text-white">
            <thead class="">
              <tr>
                <th scope="col">Event Name</th>
                <th scope="col">Ticket Name</th>
                <th scope="col">Ticket Price</th>
                <th scope="col">Ticket Code</th>
                <th scope="col">Payment Method</th>
                <th scope="col">Payment Date/Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="receipt in receipts" :key="receipt.id">
                <td class="align-middle">{{ receipt.ticket.event.name }}</td>
                <td class="align-middle">{{ receipt.ticket.name }}</td>
                <td class="align-middle">{{ receipt.ticket.price }}</td>
                <td class="align-middle">{{ receipt.ticketCode }}</td>
                <td class="align-middle">{{ receipt.paymentMethod }}</td>
                <td class="align-middle">{{ receipt.paymentDateTime }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="text-white" style="font-size: 150%;">No Receipts To View</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  mounted() {
    axios.get("/api/common/tickets/receipts")
      .then(response => {
        this.receipts = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },
  data() {
    return {
      receipts: []
    };
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

h1{
  margin-bottom: 5%;
  margin-top: 5%;
  font-family: 'Stick No Bills', sans-serif;
}
</style>