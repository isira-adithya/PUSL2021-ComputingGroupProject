<template>
  <div v-if="images.length > 0">
    <div class="carousel slide" data-ride="carousel">
      <div class="carousel-inner" id="carousel-items">
        <div v-for="(image, index) in images" :key="image">
          <div
            :class="
              index == currentImageIndex
                ? 'carousel-item active'
                : 'carousel-item'
            "
          >
            <img class="d-block w-100" :src="image" alt="First slide" />
            <button
              class="btn btn-danger btn-sm col-1"
              v-if="imageUrl && !hideDeleteButton"
              @click="deleteNicFront"
            >
              <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
          </div>
        </div>
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
  methods: {},
};
</script>