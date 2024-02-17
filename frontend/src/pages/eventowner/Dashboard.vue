<template>
  <div class="container mt-5">
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style="width: 280px"
    >
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <router-link :to="'/test'" href="#" class="nav-link active" aria-current="page">
            Home
          </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="'/test'" href="#" class="nav-link text-white" aria-current="page">
            Events
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
