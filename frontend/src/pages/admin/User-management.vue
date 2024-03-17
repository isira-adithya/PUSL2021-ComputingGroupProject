<template>
  <div class="container mt-5">
    <button class="btn btn-primary" @click="addUserOrAdmin">Add New User / Administrator</button>
     <span style="margin-right: 10px;"></span>
    <button class="btn btn-primary" @click="seeAllAdministrators">See All Administrators</button>
    <br>
    <br>
    <table class="table table-bordered text-center text-white">
      <thead class="">
        <tr>
          <th scope="col">E-mail</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Country</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="align-middle">{{ user.email }}</td>
          <td class="align-middle">{{ user.firstName }}</td>
          <td class="align-middle">{{ user.lastName }}</td>
          <td class="align-middle">{{ user.country }}</td>
          <td class="align-middle">
            <button class="btn btn-primary" @click="viewTicket(user)">View Ticket</button>
            <button class="btn btn-danger" @click="deleteUser(user)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
  methods: {
    fetchUsers() {
      // Replace this URL with your backend API endpoint to fetch users
      const apiUrl = 'https://your-backend-api.com/users';

      // Fetch users from the backend using Axios
      axios.get(apiUrl)
        .then(response => {
          this.users = response.data; // Update the users array with data from the backend
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    addUserOrAdmin() {
      // Add logic to add a new user or administrator
    },
    seeAllAdministrators() {
      // Add logic to view all administrators
    },
    viewTicket(user) {
      // Add logic to view the ticket of a user
      console.log('Viewing ticket of:', user);
    },
    deleteUser(user) {
      // Add logic to delete a user
      const index = this.users.indexOf(user);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
  }
};
</script>

<style scoped>
body {
  background-color: black;
  /* Set background color to black */
  color: white;
  /* Set text color to white */
}

.table-bordered th,
.table-bordered td {
  border-width: 3px;
  /* Set inner border width to 2px */
}
</style>
