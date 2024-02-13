<template>
  <div class="mb-3">
    <label :for="fileInputId" class="form-label text-black-50"
      >{{ label }}</label
    >
    <br />
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Face Image Preview"
      width="150px"
      class="mt-2 img-thumbnail rounded"
    />
    <div class="row">
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
import Notiflix from 'notiflix';
import axios from 'axios';
export default {
  props: {
    label: {
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
    handleFileUpload() {
      const fileInput = document.getElementById(this.fileInputId);
      const file = fileInput.files[0];
      
      Notiflix.Loading.hourglass();

      const formData = new FormData();
      formData.append('file', file);
      axios.post('/api/eventowner/upload', formData).then((res) => {
        Notiflix.Loading.remove();

        if (res.data['success']){
          this.imageUrl = res.data['url'];
        } else {
          throw 'Something went wrong';
        }

        Notiflix.Notify.success("Image uploaded!");
      }).catch((err) => {
        console.error(err);
        Notiflix.Loading.remove();
        Notiflix.Notify.failure("Something went wrong, please try again later.");
        fileInput.value = null;
      })
    },
    deleteNicFront() {
      // Handle deletion logic here
      // For example, you can reset formData.nic_front to null
      // this.formData.nic_front = null;
    },
  },
};
</script>
  