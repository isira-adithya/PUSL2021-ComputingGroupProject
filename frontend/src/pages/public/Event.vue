<template>
  <div id="section1" :style="[section1, section]" class="background-container">
  <div v-if="event != null">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <div class="card" style="margin-top: 6%;">
          <div class="card-body text-black">
            <center><h5 style="margin-top: 10px;">Event Name:</h5>
            <h4 class="card-title">{{ event["name"] }}</h4></center>

            <div>
              <ImagesCarouselVue
                class="card-img-top rounded border"
                v-if="event.images.length > 0"
                :images="event.images"
                :auto-slide-show="true"
                :slide-show-interval="1000"
              />
            



            <p class="alert alert-warning mt-4">
              

              <ul class="list-group list-group-flush mt-4">
              <li class="list-group-item bg-transparent">
                Category:
                <i
                  ><b>{{
                    event["category"].charAt(0).toUpperCase() +
                    event["category"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Location:
                <i
                  ><b>{{
                    event["location"].charAt(0).toUpperCase() +
                    event["location"].slice(1)
                  }}</b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Date:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleDateString() }}
                  </b></i
                >
              </li>
              <li class="list-group-item bg-transparent">
                Time:
                <i
                  ><b>
                    {{ new Date(event["date_time"]).toLocaleTimeString() }}
                  </b></i
                >
              </li>
              
              <br><br>
              <b>Description:</b><br />
              <code>{{ event["description"] }}</code>
            </ul>
            </p>

            <!-- Comment Section in bootstrap -->
            <div class="mt-5">
              <div class="card-header"><h5>Comments</h5></div>
              <ul class="list-group list-group-flush" v-if="event.comments.length > 0">
                <li class="list-group-item">
                  <div class="row" v-for="comment in event.comments" :key="comment.id">
                    <div class="col-1">
                      <img
                        :src="comment.user_profile_image"
                        class="rounded-circle"
                        alt="..."
                        style="width: 100%"
                      />
                    </div>
                    <div class="col-11">
                      <b class="card-title text-sm">{{ comment.username }}</b>
                      <p class="card-text text-sm">
                        <i>
                          {{ comment.comment }}
                        </i>
                      </p>
                      <!-- Delete comment button -->
                      <span class="btn btn-danger btn-sm" @click="deleteComment(comment.comment_id)" style="font-size: smaller;" v-if="isLoggedIn && (user != null) && (comment.user_id == user.user_id)">
                        Delete
                      </span>
                    </div>
                    
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2"></div>
    </div>
  </div>
</div>
</div>
</template>
  
  <script>
import axios from "axios";
import Notiflix from "notiflix";
import ImagesCarouselVue from "../../components/ImagesCarousel.vue";

export default {
  name: "PublicEventsVue",
  components: { ImagesCarouselVue },
  mounted() {
    this.uuid = this.$route.params.uuid;

    Notiflix.Loading.dots("Loading...");
    axios
      .get(`/api/common/events/${this.uuid}`)
      .then((response) => {
        this.event = response.data;
        this.geoCoordinates = {
          lat: this.event.location_geocoordinates.lat,
          lng: this.event.location_geocoordinates.lng,
        };
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        Notiflix.Loading.remove();
      });

    // Check if the user is logged
    if (localStorage.getItem("isLoggedIn")) {
      if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
        this.isLoggedIn = true;
        this.user = JSON.parse(localStorage.getItem("session"));
      } else {
        this.isLoggedIn = false;
      }
    } else {
      this.isLoggedIn = false;
    }
  },
  data() {
    return {
    imagePath1: process.env.BASE_URL + 'assets/images/events.png',
      event: null,
      uuid: null,
      geoCoordinates: {
        lat: 1,
        lng: 1,
       
      },
      isLoggedIn: false,
      user: null,
      comment: "",
    };
  },
  computed: {
    section(){
      return{
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
      };
    },
    section1() {
      return {
        background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${this.imagePath1})`, // Dynamically set the URL   
       
      };
    },
    

    

  },
  methods: {},
};
</script>