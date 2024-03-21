<template>
  <div style="background-color: black;" id="section1" :style="[section1, section]">
  <div v-if="event != null">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8" style="margin-top: 3%;">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title"><center>{{ event["name"] }}</center></h2>

            <div>
              <ImagesCarouselVue
                class="card-img-top rounded border"
                v-if="event.images.length > 0"
                :images="event.images"
                :auto-slide-show="true"
                :slide-show-interval="1000"
              />
            
              <p class="alert alert-warning mt-4">
              <b>Description:</b><br />
              <code style="color:black;">{{ event["description"] }}</code>

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
            </ul>
            </p>
          </div>

            <div v-if="event.tickets.length > 0">
              <h4 class="mt-4 mb-2-">Tickets:</h4>
              <div class="row">
                <div
                  v-for="ticket in event.tickets"
                  :key="ticket.id"
                  class="col-6"
                >
                  <div class="alert alert-dark mt-2" style="font-size: smaller;">
                    <div>
                      <h5><i>{{ ticket.name }}</i></h5>
                      <p class="mt-3">
                        <b>Price:</b> {{ ticket.price }} €
                      </p>
                      <p>
                        <b>Description:</b><br>
                        <code>{{ ticket.description }}</code>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
<h4 class="mt-4">Location:</h4>
<div class="mb-4">
  <GMapMap
    :center="geoCoordinates"
    :zoom="13"
    map-type-id="terrain"
    style="height: 32vh"
    :options="{
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      rotateControl: false,
      fullscreenControl: false,
      disableDefaultUI: true,
    }"
  />
</div>

            <!-- Add Comment form -->
            <div class="mt-5" v-if="isLoggedIn">
              <div class="card-header"><h5>Add Comment</h5></div>
              <div class="card-body">
                <form>
                  <div class="form-group">
                    <label for="comment">Comment:</label>
                    <textarea
                      class="form-control"
                      id="comment"
                      rows="3"
                      v-model="comment"
                    ></textarea>
                  </div>
                  <button @click="addComment()" class="btn btn-primary btn-sm mt-2">
                    Submit
                  </button>
                </form>
              </div>
            </div>

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
      event: null,
      uuid: null,
      geoCoordinates: {
        lat: 1,
        lng: 1,
      },
      isLoggedIn: false,
      user: null,
      comment: "",
      imagePath1: process.env.BASE_URL + 'assets/images/event2.png',
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


  methods: {
    addComment() {
      Notiflix.Loading.standard();
      axios
        .post(`/api/common/comments/new`, {
          comment: this.comment,
          event_uuid: this.uuid,
        })
        .then((response) => {
          Notiflix.Notify.success("Comment added successfully!");

          // Refresh the page
          axios
            .get(`/api/common/events/${this.uuid}`)
            .then((response) => {
              this.event = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          Notiflix.Notify.failure("You have to login to add a comment!");
          console.log(error);
        })
        .finally(() => {
          Notiflix.Loading.remove();
        });
    },

    deleteComment(comment_id) {
      // Ask for confirmation using Notiflix.Confirm
      Notiflix.Confirm.show(
        "Delete Comment",
        "Are you sure you want to delete this comment?",
        "Yes",
        "No",
        () => {
          Notiflix.Loading.standard();
          axios
            .delete(`/api/common/comments/${comment_id}`)
            .then((response) => {
              Notiflix.Notify.success("Comment deleted successfully!");

              // Refresh the page
              axios
                .get(`/api/common/events/${this.uuid}`)
                .then((response) => {
                  this.event = response.data;
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              Notiflix.Notify.failure("You have to login to delete a comment!");
              console.log(error);
            })
            .finally(() => {
              Notiflix.Loading.remove();
            });
        },
        function () {}
      );
    },
  },
};
</script>

<style scoped>



</style>