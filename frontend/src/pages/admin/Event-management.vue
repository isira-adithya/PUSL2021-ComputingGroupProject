<template>
  <div class="bgbody">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="table-responsive">
            <table class="table table-bordered text-center text-white">
              <thead>
                <tr>
                  <th scope="col">Event Name</th>
                  <th scope="col">Event Type</th>
                  <th scope="col">Location</th>
                  <th scope="col">Date / Time</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(event, index) in events" :key="index">
                  <td class="align-middle">{{ event.name }}</td>
                  <td class="align-middle">{{ event.category }}</td>
                  <td class="align-middle">{{ event.location }}</td>
                  <td class="align-middle">{{ event.date_time }}</td>
                  <td class="align-middle">
                    <button
                      class="btn btn-primary mr-md-3 mb-2 mb-md-0"
                      @click="viewTicket(event)"
                    >
                      View Ticket
                    </button>
                    <button
                      class="btn btn-danger ml-md-3 mb-2 mb-md-0"
                      @click="deleteEvent(event)"
                    >
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
  </div>
</template>

<script>
import axios from "axios";
import Notiflix from "notiflix";

export default {
  data() {
    return {
      events: [],
    };
  },
  mounted() {
    this.fetchEvents(); // Fetch events when the component is mounted
  },
  methods: {
    fetchEvents() {
      // Replace this URL with your backend API endpoint to fetch events
      const apiUrl = "/api/admin/events";

      // Fetch events from the backend using Axios
      Notiflix.Loading.arrows();
      axios
        .get(apiUrl)
        .then((response) => {
          this.events = response.data; // Update the events array with data from the backend
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    },
    viewTicket(event) {
      console.log(event)
      this.$router.push(`/admin/event-management/${event.uuid}`);
    },
    deleteEvent(event) {
      // Add logic to delete an event
      // You can use the event.uuid to identify the event to delete

      Notiflix.Confirm.show(
        "Delete Event",
        "Are you sure you want to delete this event?",
        "Yes",
        "No",
        () => {
          Notiflix.Loading.arrows();
          axios
            .delete(`/api/eventowner/events/${event.uuid}`)
            .then((response) => {
              Notiflix.Report.success(
                "Success",
                "Event deleted successfully",
                "OK",
                () => {
                  this.fetchEvents(); // Fetch events again to update the list
                }
              );
            })
            .catch((error) => {
              console.error("Error deleting event:", error);
              Notiflix.Report.failure(
                "Error",
                "An error occurred while deleting the event",
                "OK"
              );
            })
            .finally(() => {
              Notiflix.Loading.remove();
            });
          const index = this.events.indexOf(event);
          if (index !== -1) {
            this.events.splice(index, 1);
          }
        },
        () => {
          // Do nothing if the user clicks "No"
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
  min-height: 100vh;
  padding: 20px 0;
}

h1 {
  font-family: "Stick No Bills", sans-serif;
}

.table-bordered th,
.table-bordered td {
  border-width: 4px;
}

/* Add margin to the buttons */
.btn {
  margin-bottom: 10px;
}

@media (min-width: 768px) {
  .btn {
    margin-bottom: 0;
  }
}
.btn + .btn {
  margin-left: 10px;
}
</style>
