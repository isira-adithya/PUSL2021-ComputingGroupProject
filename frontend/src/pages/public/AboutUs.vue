<template>
    <div class="body2" id="section1" :style="[section1, section]">
    <div class="container">zbr
        <center><h2 class="mb-5 text-white font-2">
            About Us </h2></center>
      <div id="about-us-container" class="row align-items-center">
        <div id="team-info" class="col-md-6 order-md-1 order-2">
          <div class="d-flex flex-column justify-content-center h-100">
            <h1 class="text-center mb-4">The Event Hive Team</h1>
            <p class="text-center"><b>Welcome To Event Hive, Where Unforgettable Events Around The Island Are Displayed. We Curate Exceptional Experiences, Blending Innovation with Tradition. Join Us for Extraordinary Events That Leave Learning Memories.</b></p>
          </div>
        </div>
        <div id="team-members" class="row justify-content-center col-md-6 order-md-2 order-1">
          <div class="team-member col-6 col-md-4" v-for="(member, index) in teamMembers" :key="index">
            <img :src="member.image" class="img-fluid">
            <p>{{ member.name }}</p>
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
        teamMembers: [
          { name: 'Isira Adithya', image: '/assets/images/dev-team/isira_adithya.jpg' },
          { name: 'Sanuth Karunagoda', image: '/assets/images/dev-team/sanuth.jpg' },
          { name: 'Thiyara Bandara', image: '/assets/images/dev-team/thiyara1.jpg' },
          { name: 'Hashen Ruwanpura', image: '/assets/images/dev-team/hashen.jpg' },
          { name: 'Nesith Perera', image: '/assets/images/dev-team/nesith.jpg' },
          { name: 'Savija Ranasinghe', image: '/assets/images/dev-team/savija.jpg' }
        ],
        imagePath1: process.env.BASE_URL + 'assets/images/editProfile.png'
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
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 1)), url(${this.imagePath1})`, // Dynamically set the URL   
       
      };
    },
    

    

  },
  };
  </script>
  
  <style scoped>
  .body2 {
    background: black center/cover no-repeat;
    font-family: 'Arial', sans-serif;
    color: white;
  }
  
  #about-us-container {
    min-height: 94vh;
  }
  
  #team-info {
    padding: 60px 60px; /* Adjusted padding */
    box-sizing: border-box;
  }
  
  #team-info h1 {
    font-size: 34px;
    font-family: 'Stick No Bills', sans-serif;
    font-style: italic;
    margin-bottom: 15px;
  }
  
  #team-info p {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  #team-members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .team-member {
    width: 30%;
    margin: 10px;
    text-align: center;
  }
  
  img {
    max-width: 94%;
    border-radius: 20%;
  }
  .font-2 {
  font-family: 'Stick No Bills', sans-serif;
  margin-top: 2%; /* Adjusted margin */
  margin-bottom: 3%; /* Optional: Adjusted margin bottom */
  font-size: 43px;
  color: #ffffff;
}

  

  
  @media (max-width: 767px) {
    #team-info {
      order: 2;
    }
    
    #team-members {
      order: 1;
    }
  }
  </style>
  