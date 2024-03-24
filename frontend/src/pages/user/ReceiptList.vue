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
          <table v-if="receipts.length > 0" class="table table-striped text-center text-white">
            <thead class="">
              <tr>
                <th scope="col" class="bg-black text-white">Event Name</th>
                <th scope="col" class="bg-black text-white">Ticket Name</th>
                <th scope="col" class="bg-black text-white">Price</th>
                <th scope="col" class="bg-black text-white">Payment Method</th>
                <th scope="col" class="bg-black text-white">Payment Date/Time</th>
                <th scope="col" class="bg-black text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="receipt in receipts" :key="receipt.id">
                <td class="align-middle bg-black" style="color:aliceblue;">{{ receipt.ticket.event.name }}</td>
                <td class="align-middle bg-black" style="color:aliceblue;">{{ receipt.ticket.name }}</td>
                <td class="align-middle bg-black" style="color:aliceblue;">{{ receipt.payment.amount / receipt.payment.ticket_quantity }} $</td>
                <td class="align-middle bg-black" style="color:aliceblue;">{{ receipt.payment_method }}</td>
                <td class="align-middle bg-black" style="color:aliceblue;">{{ receipt.created_at }}</td>
                <td class="align-middle bg-black" style="color:aliceblue;">
                  <router-link :to="`/user/tickets/${receipt.receipt_id}`" class="btn btn-primary">View</router-link>
                </td>
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
import Notiflix from 'notiflix';
export default {
  mounted() {
    Notiflix.Loading.arrows();
    axios.get("/api/common/tickets/receipts")
      .then(response => {
        this.receipts = response.data;
      })
      .catch(error => {
        console.error(error);
      }).finally(() => {
        Notiflix.Loading.remove();
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