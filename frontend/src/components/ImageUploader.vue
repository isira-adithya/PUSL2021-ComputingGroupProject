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
      const fileInput = this.$refs.fileInput;
      const file = fileInput.files[0];

      // Handle file upload logic here
      // For example, you can use FormData to send the file to the server

      // Assuming you want to update formData.nic_front with the file URL
      // this.formData.nic_front = 'URL_TO_YOUR_UPLOADED_FILE';
    },
    deleteNicFront() {
      // Handle deletion logic here
      // For example, you can reset formData.nic_front to null
      // this.formData.nic_front = null;
    },
  },
};
</script>
  