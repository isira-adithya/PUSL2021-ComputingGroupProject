<template>
  <div class="container py-4 bg-black text-white">
    <div class="row">
      <div class="col-lg-2"></div>
      <div class="col-lg-8">
        <form class="container">
          <div class="mb-3">
            <label class="form-label">Event Name</label>
            <input type="email" class="form-control" />
          </div>
          <div class="mb-3">
            <label class="form-label">Event Description</label>
            <textarea class="form-control" style="height: 25vh"></textarea>
            <div class="form-text text-white-50">
              You can use <b><i><a href="https://www.markdownguide.org/">markdown</a></i></b> to add styles and other various elements to your event description
            </div>
          </div>
          <div class="mb-3">
            <ImageUploader ref="eventImageUpload1" :customCssLabel="'color: white;'" :label="'Image'" />
          </div>
          <div class="mb-3">
            <label class="form-label">Date / Time</label>
            <VueDatePicker v-model="date_time" />
          </div>
          
          <button @click="submitForm()" type="submit" class="btn btn-light">Create</button>
        </form>
      </div>
      <div class="col-lg-2"></div>
    </div>
  </div>
</template>
  
  <script>
import ImageUploader from '../../../components/ImageUploader.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


export default {
  name: "EventOwnerAddEventVue",
  components: {ImageUploader, VueDatePicker},
  mounted() {},
  data() {
    return {
      date_time: new Date(),
    };
  },
  methods: {
    submitForm() {
      // convert this.date_time to unix timestamp
      const timestamp = new Date(this.date_time).getTime() / 1000;
      console.log(`Date/Time: ${this.date_time} | Timestamp: ${timestamp}`);
    },
  },
};
</script>