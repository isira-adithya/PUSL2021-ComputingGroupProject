<template>
  <div class="bgbody">
    <div class="container">
      <button class="btn btn-primary mb-3" @click="addUserOrAdmin">
        Add New User / Administrator
      </button>
      <span style="margin-right: 10px"></span>
      <button class="btn btn-primary mb-3" @click="seeAllAdministrators">
        See All Administrators
      </button>
      <br />
      <br />
      <div class="row">
        <div class="col">
          <table class="table table-bordered text-center text-white">
            <thead class="">
              <tr>
                <th scope="col">E-mail</th>
                <th scope="col">Phone</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in users" :key="index">
                <td class="align-middle">{{ user.email.email }}</td>
                <td class="align-middle">{{ user.phone.number }}</td>
                <td class="align-middle">
                  {{ user.first_name }} {{ user.last_name }}
                </td>
                <td class="align-middle">{{ user.address }}</td>
                <td class="align-middle">
                  <button
                    class="btn btn-primary me-2"
                    @click="viewTicket(user)"
                  >
                    View User
                  </button>
                  <button class="btn btn-danger ms-2" @click="deleteUser(user)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from "notiflix";

export default {
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
  methods: {
    fetchUsers() {
      // Replace this URL with your backend API endpoint to fetch users
      const apiUrl = "/api/admin/users";

      // Fetch users from the backend using Axios
      axios
        .get(apiUrl)
        .then((response) => {
          this.users = response.data; // Update the users array with data from the backend
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
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
      this.$router.push(`/admin/user-management/${user.user_id}`);
    },
    deleteUser(user) {
      // Add logic to delete a user
      Notiflix.Confirm.show(
        "Delete User",
        "Are you sure you want to delete this user?",
        "Yes",
        "No",
        () => {
          // Replace this URL with your backend API endpoint to delete a user
          const apiUrl = `/api/admin/users/${user.user_id}`;

          // Delete the user from the backend using Axios
          axios
            .delete(apiUrl)
            .then((response) => {
              const index = this.users.indexOf(user);
              if (index !== -1) {
                this.users.splice(index, 1);
              }
              Notiflix.Notify.success("User deleted successfully");
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              Notiflix.Notify.failure("Failed to delete user");
            });
        }
      );
    },
  },
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

/* Add margin to the buttons */
.mb-3 {
  margin-left: 4px;
}

h1 {
  margin-bottom: 5%;
  margin-top: 5%;
  font-family: "Stick No Bills", sans-serif;
}
</style>
