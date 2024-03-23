<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1 class="text-white"><center>Receipt List</center></h1>
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
                <td class="align-middle">{{ receipt.eventName }}</td>
                <td class="align-middle">{{ receipt.ticketName }}</td>
                <td class="align-middle">{{ receipt.ticketPrice }}</td>
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
export default {
  data() {
    return {
      receipts: [
        {
          id: 1,
          eventName: 'Concert ABC',
          ticketName: 'General Admission',
          ticketPrice: '$50',
          ticketCode: 'GA123456',
          paymentMethod: 'Credit Card',
          paymentDateTime: '2024-03-25 19:30:00'
        },
        // Add more receipt data as needed
      ]
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