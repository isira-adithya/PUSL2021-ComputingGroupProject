<template>
  <div class="verification-container">
    <div class="container mt-5">
      <h2 class="text-center" style="margin-bottom: 4%;">Pending Event Owner Verifications</h2>
      <div v-if="verifications && verifications.length > 0">
        <template v-for="(verification, index) in verifications" :key="`verification-${index}`">
          <div class="verification-section" style="margin-bottom: 30px;"> <!-- Increased margin-bottom -->
            <h4>Verification ID - {{ verification.verification_id }}</h4>
            <div class="verification-details">
              <table class="table table-bordered text-center text-white">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ verification.user.user_name }}</td>
                    <td>{{ verification.user.email.email }}</td>
                    <td>{{ verification.user.phoneNumber.number }}</td>
                    <td>{{ verification.created_at }}</td>
                    <td>
                      <button class="btn btn-primary me-2" @click="approveVerification(verification)">Approve</button>
                      <button class="btn btn-danger ms-2" @click="rejectVerification(verification)">Reject</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="image-container">
                <h5 style="margin-bottom: 25px; margin-top: 25px">Images / Documents</h5>
                <div class="image-row">
                  <div class="image-column">
                    <h5>ID Front</h5>
                    <img :src="verification['nicfront_image_link']" alt="ID Front">
                  </div>
                  <div class="image-column">
                    <h5>ID Back</h5>
                    <img :src="verification['nicback_image_link']" alt="ID Back">
                  </div>
                  <div class="image-column">
                    <h5>Selfie</h5>
                    <img :src="verification['face_image_link']" alt="Selfie">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div v-else>
        <p>No pending verifications</p>
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
      verifications: [],
    };
  },
  mounted() {
    this.fetchVerifications();
  },
  methods: {
    fetchVerifications() {
      axios
        .get("/api/admin/verifications")
        .then((response) => {
          this.verifications = response.data;
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    },
    approveVerification(verification) {
      Notiflix.Loading.arrows();
      axios
        .post(`/api/admin/verifications/${verification.verification_id}`, {
          verification_status: "VERIFIED",
        })
        .then((response) => {
          Notiflix.Notify.Success('Verification Approved');
          this.verifications = this.verifications.filter(
            (v) => v.verification_id !== verification.verification_id
          );
        })
        .catch((error) => {
          console.error("Error approving verification:", error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    },
    rejectVerification(verification) {
      Notiflix.Loading.arrows();
      axios
        .post(`/api/admin/verifications/${verification.verification_id}`, {
          verification_status: "REJECTED",
        })
        .then((response) => {
          Notiflix.Notify.failure('Verification Rejected');
          this.verifications = this.verifications.filter(
            (v) => v.verification_id !== verification.verification_id
          );
        })
        .catch((error) => {
          console.error("Error approving verification:", error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    },
  },
};
</script>

<style scoped>
.verification-container {
  background-color: #000000ea;
  color: white;
  padding: 20px;
}

.verification-section {
  margin-bottom: 10px; /* Increased margin-bottom */
  border: 2px solid #444;
  padding: 48px;
}

.verification-details {
  border-top: 2px solid #444;
  margin-top: 15px;
}

.table-bordered th,
.table-bordered td {
  border-width: 4px;
  
}

.image-container {
  margin-top: 20px;
}

.image-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.image-column {
  flex-basis: 30%;
  margin-bottom: 20px;
}

.image-column img {
  width: 80%;
  border: 2px solid #fff;
  border-radius: 5px;
}

.btn {
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
}

.btn-danger {
  background-color: #dc3545;
}

h2 {
        font-family: 'Stick No Bills', sans-serif;
        
      
    }
</style>
