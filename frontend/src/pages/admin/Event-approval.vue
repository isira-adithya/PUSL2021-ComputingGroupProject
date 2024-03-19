<template>
    <div>
        <!-- Event Table -->
        <div class="container mt-5">
            <h4>Event Owner Verifications</h4>
            <table class="table table-bordered text-center text-white">
                <thead class="">
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(verification, index) in verifications" :key="index">
                        <td class="align-middle">{{ verification.user.user_name }}</td>
                        <td class="align-middle">{{ verification.user.email.email }}</td>
                        <td class="align-middle">{{ verification.user.phoneNumber.number }}</td>
                        <td class="align-middle">{{ verification.date }}</td>
                        <td class="align-middle">
                            <button class="btn btn-primary" @click="viewVerification(verification)">View Event</button>
                            <button class="btn btn-danger" @click="deleteVerification(verification)">Delete</button>
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
            verifications: []
        };
    },
    mounted() {
        this.fetchVerifications();
    },
    methods: {
        fetchVerifications() {
            axios.get('/api/admin/verifications') // Replace '/api/events' with your backend endpoint
                .then(response => {
                    this.verifications = response.data;
                })
                .catch(error => {
                    console.error('Error fetching events:', error);
                });
        },
        viewVerification(event) {
            // Implement view event functionality
            console.log('View event:', event);
        },
        deleteVerification(event) {
            // Implement delete event functionality
            const index = this.verifications.indexOf(event);
            if (index !== -1) {
                this.verifications.splice(index, 1);
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