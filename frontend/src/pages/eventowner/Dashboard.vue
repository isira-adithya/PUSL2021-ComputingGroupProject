<template>
  <div>
    <div class="row" style="width: 100%; margin-left: 0px;">
      <div class="col-lg-2 col-4" style="padding: 0px;">
        <div class="d-flex flex-column px-3 text-white bg-black" style="height:100%;">
          <h5>Event Owner - Dashboard</h5>
          <hr />
          <ul class="nav px-lg-4 nav-pills flex-column mb-auto">

            <li class="nav-item">
              <router-link
                :to="'/eventowner/dashboard/add-event'"
                href="#"
                :class="page=='add-event'?'nav-link active':'nav-link text-white'"
                aria-current="page"
              >
                Add Event
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                :to="'/eventowner/dashboard/events'"
                href="#"
                :class="page=='events'?'nav-link active':'nav-link text-white'"
                aria-current="page"
              >
                Events
              </router-link>
            </li>
          </ul>
          <hr />
        </div>
      </div>
      <div class="col" style="padding: 0px;">
        <EventOwnerAnalyticsVue v-if="page=='analytics'"/>
        <AddEventVue v-if="page=='add-event'"/>
        <EventVue v-if="page=='event'"/>
        <EventsVue v-if="page=='events'"/>
      </div>
    </div>
  </div>
</template>
  
  <script>
import AddEventVue from './subpages/AddEvent.vue';
import EventVue from './subpages/Event.vue';
import EventsVue from './subpages/Events.vue';

export default {
  name: "EventOwnerDashboardVue",
  components: {
    AddEventVue,
    EventVue,
    EventsVue
  },
  mounted() {
    this.page = this.$route.path.split("/")[3];
  },
  updated() {
    this.page = this.$route.path.split("/")[3];
  },
  data() {
    return {
      page: "analytics"
    };
  },
  methods: {},
};
</script>
