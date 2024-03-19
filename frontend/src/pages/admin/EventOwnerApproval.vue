<template>
    <div>
        <!-- Event Table -->
        <div class="container mt-5">
            <h4>Pending Event Owner Verifications</h4>
            <table v-if="verifications && verifications.length > 0" class="table table-bordered text-center text-white">
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
                        <td class="align-middle">{{ verification.created_at }}</td>
                        <td class="align-middle">
                            <button class="btn btn-primary me-2" @click="approveVerification(verification)">Approve</button>
                            <button class="btn btn-danger ms-2" @click="rejectVerification(verification)">Reject</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <p>No pending verifications</p>
            </div>  
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Notiflix from 'notiflix';

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
        approveVerification(verification) {
            console.log(verification)
            // Implement view event functionality
            Notiflix.Loading.arrows();
            axios.post(`/api/admin/verifications/${verification.verification_id}`, {
                verification_status: 'VERIFIED'
            }).then(response => {
                this.verifications = this.verifications.filter(v => v.id !== verification.verification_id);
            }).catch(error => {
                console.error('Error approving verification:', error);
            }).finally(() => {
                Notiflix.Loading.remove();
            });
        },
        rejectVerification(verification) {
            // Implement delete event functionality
            Notiflix.Loading.arrows();
            axios.post(`/api/admin/verifications/${verification.verification_id}`, {
                verification_status: 'REJECTED'
            }).then(response => {
                this.verifications = this.verifications.filter(v => v.id !== verification.verification_id);
            }).catch(error => {
                console.error('Error approving verification:', error);
            }).finally(() => {
                Notiflix.Loading.remove();
            });
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