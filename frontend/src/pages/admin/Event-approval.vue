<template>
    <div>
        <!-- Event Table -->
        <div class="container mt-5">
            <table class="table table-bordered text-center text-white">
                <thead class="">
                    <tr>
                        <th scope="col">Event Name</th>
                        <th scope="col">Event Description</th>
                        <th scope="col">Venue</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(event, index) in events" :key="index">
                        <td class="align-middle">{{ event.name }}</td>
                        <td class="align-middle">{{ event.description }}</td>
                        <td class="align-middle">{{ event.venue }}</td>
                        <td class="align-middle">{{ event.date }}</td>
                        <td class="align-middle">
                            <button class="btn btn-primary" @click="viewEvent(event)">View Event</button>
                            <button class="btn btn-danger" @click="deleteEvent(event)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            events: []
        };
    },
    mounted() {
        this.fetchEvents();
    },
    methods: {
        fetchEvents() {
            axios.get('/api/events') // Replace '/api/events' with your backend endpoint
                .then(response => {
                    this.events = response.data;
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                });
        },
        viewEvent(event) {
            // Implement view event functionality
            console.log('View event:', event);
        },
        deleteEvent(event) {
            // Implement delete event functionality
            const index = this.events.indexOf(event);
            if (index !== -1) {
                this.events.splice(index, 1);
                // Send a request to delete the event from the backend as well
                axios.delete(`/api/events/${event.id}`) // Replace '/api/events/${event.id}' with your backend endpoint
                    .then(() => {
                        console.log('Event deleted successfully from the backend.');
                    })
                    .catch(error => {
                        console.error('Error deleting event from the backend:', error);
                    });
            }
        }
    }
};
</script>

<style scoped>
body {
    background-color: black;
    color: white;

}

.table-bordered th,
.table-bordered td {
    border-width: 3px;

}
</style>
