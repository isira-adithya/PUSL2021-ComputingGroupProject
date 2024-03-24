<template>
  <div v-if="images.length > 0">
    <div class="row" id="carousel-items">
      <div v-for="image in images" :key="image" class="col">
        <img class="d-block w-100" :src="image" alt="First slide" />
        <button
          type="button"
          class="btn btn-danger btn-sm"
          @click="$emit('deleteImage', image)"
        >
          <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "ImagesManagementCarouselVue",
  props: {
    images: {
      type: Array,
      required: true,
    },
    autoSlideShow: {
      type: Boolean,
      required: true,
    },
    slideShowInterval: {
      type: Number,
      required: true,
    },
  },
  components: {},
  mounted() {
    setInterval(() => {
      if (this.autoSlideShow && this.images.length > 0) {
        this.currentImageIndex =
          (this.currentImageIndex + 1) % this.images.length;
      }
    }, this.slideShowInterval);
  },
  data() {
    return {
      currentImageIndex: 0,
    };
  },
  methods: {
    deleteImage(url) {
      this.$emit("delete-image", url);
    },
  },
};
</script>

<!-- Embed the following method in the code when using this component -->
<!-- 
  deleteImage(url) {
  Notiflix.Confirm.show(
    "Delete Image",
    "Are you sure you want to delete this image?",
    "Yes",
    "No",
    function () {
      this.images = this.images.filter((image) => image !== url);
      Notiflix.Notify.success("Image deleted successfully");
    }.bind(this),
    function () {
      Notiflix.Notify.failure("Image deletion cancelled");
    }
  );
}, 
-->