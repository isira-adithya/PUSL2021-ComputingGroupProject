<template>
  <div>
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-white bg-black"
      style="width: 280px"
    >
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link
            :to="'/eventowner/dashboard/analytics'"
            href="#"
            class="nav-link active"
            aria-current="page"
          >
            Analytics
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            :to="'/eventowner/dashboard/add-event'"
            href="#"
            class="nav-link text-white"
            aria-current="page"
          >
            Add Event
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            :to="'/eventowner/dashboard/events'"
            href="#"
            class="nav-link text-white"
            aria-current="page"
          >
            Manage Events
          </router-link>
        </li>
        
      </ul>
      <hr />
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "EventOwnerDashboardVue",
  components: {},
  mounted() {},
  data() {
    return {};
  },
  methods: {},
};
</script>
