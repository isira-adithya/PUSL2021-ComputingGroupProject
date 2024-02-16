<template>
  <div class="mb-3">
    <label :for="fileInputId" class="form-label text-black-50">{{
      label
    }}</label>
    <br />
    <div v-if="imageUrl.length <= 0">
      <img
        v-if="displayImageurl"
        :src="displayImageurl"
        width="150px"
        class="mt-2 img-thumbnail rounded"
      />
    </div>
    <img
      v-if="imageUrl"
      :src="imageUrl"
      width="150px"
      class="mt-2 img-thumbnail rounded"
    />
    <div class="row mt-2">
      <div class="col-8">
        <input
          type="file"
          class="form-control"
          :id="fileInputId"
          @change="handleFileUpload()"
          required
        />
      </div>
      <button
        class="btn btn-danger btn-sm col-1"
        v-if="imageUrl"
        @click="deleteNicFront"
      >
        <font-awesome-icon icon="fa-solid fa-trash" />
      </button>
      <div class="col-3"></div>
    </div>
  </div>
</template>
  
  <script>
import Notiflix from "notiflix";
import axios from "axios";
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    displayImageurl: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imageUrl: "",
      fileInputId: `imageUpload-${Math.random().toString(36).substr(2, 9)}`, // Generate a unique ID for file input
    };
  },
  methods: {
    async getASignedUrl(contentType) {
      try {
        const session = JSON.parse(localStorage.getItem("session"));
        let apiEndpoint = "";
        switch (session.role) {
          case "EVENT_OWNER":
            apiEndpoint = "/api/eventowner/file/upload";
            break;
          case "VISITOR":
            apiEndpoint = "/api/visitor/file/upload";
            break;
          default:
            throw "Invalid role";
        }
        const response = await axios.post(apiEndpoint, {content_type: contentType});
        return response.data["upload_url"];
      } catch (err) {
        console.error(err);
        return null;
      }
    },

    async handleFileUpload() {
      const fileInput = document.getElementById(this.fileInputId);
      const file = fileInput.files[0];

      Notiflix.Loading.hourglass();

      const signedUploadUrl = await this.getASignedUrl(file.type);

      if (signedUploadUrl != null) {
        
        axios
          .put(signedUploadUrl, file, {
            headers: {
              'x-amz-acl': 'public-read',
              'Content-Type': file.type
            }
          })
          .then((res) => {
            Notiflix.Loading.remove();
            if (res.status != 200){
              throw 'S3 bucket did not respond correctly.'
            }
            Notiflix.Notify.success("Image uploaded!");
            this.imageUrl = signedUploadUrl.split("?")[0];
          })
          .catch((err) => {
            console.error(err);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure(
              "Something went wrong, please try again later.2"
            );
            fileInput.value = null;
          });
      } else {
        Notiflix.Loading.remove();
        Notiflix.Notify.failure(
          "Something went wrong, please try again later."
        );
      }
    },

    deleteNicFront() {
      const fileInput = document.getElementById(this.fileInputId);
      // Handle deletion logic here
      // For example, you can reset formData.nic_front to null
      // this.formData.nic_front = null;
      axios
        .delete("/api/eventowner/file/delete", {
          file_path: "FIXME: Add the correct identifier here.",
        })
        .then((res) => {
          Notiflix.Loading.remove();

          if (res.data["success"]) {
            this.imageUrl = res.data["url"];
          } else {
            throw "Something went wrong";
          }

          Notiflix.Notify.success("Image deleted!");
        })
        .catch((err) => {
          console.error(err);
          Notiflix.Loading.remove();
          Notiflix.Notify.failure(
            "Something went wrong, please try again later."
          );
          fileInput.value = null;
        });
    },
  },
};
</script>
  