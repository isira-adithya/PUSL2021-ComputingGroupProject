<template>
    <div>
      <div id="section1" :style="[section1]" class="section text-center text-white d-flex justify-content-center align-items-center">
        <div class="container">
          <div class="row">
            <h1 class="font-1 display-1">WELCOME TO EVENT HIVE</h1>
          </div>
          <div class="row">
            <p class="font-2 h3">ADMIN PANEL</p>
          </div>
        </div>
        <div class="arrow-container text-center">
          <a href="#section2" class="scroll-down">
            <i class="fas fa-chevron-down fa-color"></i>
          </a>
        </div>
      </div>
  
      <div id="section2" class="d-flex">
        <div class="container w-100">
          <div class="row justify-content-center ">
            <!-- First Card: Manage Users -->
            <div v-for="(card, index) in cards" :key="index" class="col-sm-3 custom-card card text-center m-3">
              <img :src="card.icon" class="card-img-top mx-auto d-block" :alt="card.alt">
              <div class="card-body">
                <a :href="card.link" class="text-white text-decoration-none px-3 py-1 button-color rounded-1">{{ card.title }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imagePath1:
          process.env.BASE_URL + "./assets/images/admin-home/adbg.jpeg",

        cards: [
          { title: 'Manage Users', icon: './assets/images/admin-home/mo.jpg', link: '/assets/html/Event_Submission.html', alt: 'User Icon' },
          { title: 'Manage Events', icon: './assets/images/admin-home/mp.jpg', link: '/assets/html/Event_Submission.html', alt: 'Calendar Icon' },
          { title: 'Manage Tickets', icon: 'ticket-icon.png', link: '/assets/html/Event_Submission.html', alt: 'Ticket Icon' },
          { title: 'Approve Events', icon: 'clipboard-icon.png', link: '/assets/html/Event_Submission.html', alt: 'Clipboard Icon' }
        ]

      }
    },
    
    computed:{
    section1() {
        return {
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${this.imagePath1})`, // Dynamically set the URL
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      },
    }
  }
  </script>

  <style scoped>


        #section1{
         
          background-size: cover;
          min-height: 89vh;
        }
        
        
        #section2{
          background:  rgba(0, 0, 0);
          padding: 70px !important;
        }

        .button-color {
          background-color: #111F4D;
        }
        .button-color:hover{
          background-color: #020923 !important;
          
        }
        .custom-card {
            width: 250px;
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 20px;
            border: solid 2px #111F4D;
        }

        .custom-card img {
            max-width: 200px;
            height: 300px;
        }

        .font-1{
          font-family: 'Stick No Bills', sans-serif;
        }

        .font-2{
          font-family: 'Poppins', sans-serif;
        }

        .scroll-down {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }

        .fa-color{
          color:rgb(255, 255, 255);

        }
        .fa-color:hover{
          color: rgb(207, 206, 206);
        }


        @media(max-width: 767px) {
          #section2{
            /* Adjust the height for smaller screens */
            padding: 120px 15px !important;
          }
        }
  </style>