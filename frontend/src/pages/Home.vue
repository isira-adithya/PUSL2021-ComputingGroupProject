<template>
      <div id="section1" class="section text-center text-white d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="row">
              <h1 class="font-1 display-1">WELCOME TO EVENT HIVE</h1>
            </div>
            <div class="row">
              <p class="font-2 h3">Find Your Favourite Events</p>
            </div>
        </div>
        <div class="arrow-container text-center">
            <a href="#section2" class="scroll-down">
              <i class="fas fa-chevron-down fa-color"></i>
            </a>
        </div>
      </div>
    
      <div id="section2" class="justify-content-center align-items-center text-center text-white d-flex"> 
        <div class="container">
          <div>
            <a>
              <img src="/assets/images/event hive (1).png" alt="logo" class="custom-logo">
              </a>
          </div>
          <div class="custom-hr"></div>
          <div>
            <p class="font-2">
              Event Hive is a platform where you can find any type of extraordinary events happening island-wide including sport events, musical events, carnivals, charity events and concerts.
              with our website you can find information about your favorite events.
            </p>
          </div>
        </div>
      </div>

      <div id="section3" class="justify-content-center align-items-center text-center">
        <div class="container">
          <div class="row">
            <div class="col-md-6 d-flex justify-content-center align-items-center text-center">
              <div class="mt-4 ">
                <h1 class="font-1 text-white display-5 mb-4">Events We Support</h1>
              </div>
            </div>
            <div class="col-md-6 text-white  justify-content-center align-items-center">
              <div class="custom-boxes custom-box-width-1 mb-5 text-center">
                <p class="font-2 p-1">Concerts</p>
              </div>
              <div class="custom-boxes custom-box-width-2 mb-5 text-center">
                <p class="font-2 p-1">Charity Events</p>
              </div>
              <div class="custom-boxes custom-box-width-3 mb-5 text-center">
                <p class="font-2 p-1">Sports Events</p>
              </div>
              <div class="custom-boxes custom-box-width-4 mb-5 text-center">
                <p class="font-2 p-1">Cultural Events</p>
              </div>
              <div class="custom-boxes custom-box-width-5  text-center">
                <p class="font-2 p-1">Carnivals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
       

      <div id="section4" class="justify-content-center align-items-center text-center" >
        <div class="container">
          <div class="row">
            <div class=" d-flex ">
              <div class="mt-4 ">
                <h1 class="font-1 text-white display-5 mb-4">Want To Check Events Listed At Site?</h1>
              </div>
            </div>
            <div class="col-md-12 text-white  justify-content-center align-items-center">
              <div class="">
                <p class="font-2 p-1">Bored? or need to get info on an event you are looking forwards to? Check out the events listed at  our website by clicking the button below</p>
              </div>
            </div>
            <div class="col-md-12 text-white  justify-content-center align-items-center">
              <div class="">
                <a href="/assets/html/event.html" class="text-white text-decoration-none px-3 py-1 button-color rounded-1">EVENTS</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="section5" class="justify-content-center align-items-center text-center" >
        <div class="container">
          <div class="row">
            <div class=" d-flex ">
              <div class="mt-4 ">
                <h1 class="font-1 text-white display-5 mb-4">Want To Publish Your Event?</h1>
              </div>
            </div>
            <div class="col-md-12 text-white  justify-content-center align-items-center">
              <div class="">
                <p class="font-2 p-1">Publish your event with event  hive and let millions of people know , 
                  just click the button below and fill the quick form with correct details  and wait for the confirmation. </p>
              </div>
            </div>
            <div class="col-md-12 text-white  justify-content-center align-items-center">
              <div class="">
                <a href="/assets/html/Event_Submission.html" class="text-white text-decoration-none px-3 py-1 button-color rounded-1">PUBLISH</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
</template>

<script>
export default {
  name: 'HomeVue',
  components: {
    
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
}
</style>
