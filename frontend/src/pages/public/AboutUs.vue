<template>
    <div class="container mt-5">
        <div id="about-us-container">
        <div id="team-info">
            <h1>The Event Hive Team</h1>

           <h5> <p><b>"Welcome To Event Hive, Where Unforgettable Events Around The Island Are Displayed. We Curate Exceptional Experiences, Blending Innovation with Tradition. Join Us for                                                                                                                         Extraordinary <br>
           Events That Leave Learning Memories."</b></p></h5>
        </div>
        <div id="team-members">
            <div class="team-member">
                <img src="/assets/images/dev-team/isira_adithya.jpg">
                <p>Isira Adithya</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/dev-team/sanuth.jpg">
                <p>Sanuth Karunagoda</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/dev-team/thiyara.jpg">
                <p>Thiyara Bandara</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/dev-team/hashen.jpg">
                <p>Hashen Ruwanpura</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/dev-team/nesith.jpg">
                <p>Nesith Perera</p>
            </div>
            <div class="team-member">
                <img src="/assets/images/dev-team/savija.jpg">
                <p>Savija Ranasinghe </p>
            </div>
        </div>
    </div>


    </div>
  </template>
  
  <script>
  export default {
    name: "FileVue",
    components: {},
    mounted() {
    },
    data() {
      return {
      };
    },
    methods: {
      test() {
        alert(1)
      }
    },
  };
  </script>
  <style scoped>

body {
            margin: 0;
            padding: 0;
            background: black center/cover no-repeat;
            font-family: 'Arial', sans-serif;
            color: white;
        }

        #about-us-container {
            display: flex;
            align-items: center;
            justify-content: space-around;
            height: 100vh;
        }

        #team-info {
            width: 40%;
            padding: 20px;
            margin-bottom: 2in;
            box-sizing: border-box;
        }
      
         #team-info h1 {
            font-size: 24px; 
            font-family: 'Georgia', serif; 
            font-style: italic;
            margin-bottom: 15px;
        }
        
        #team-info p {
            font-size: 18px;
            line-height: 1.5; 
            margin-bottom: 15px;
        }

        #team-members {
            width: 50%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }

        .team-member {
            width: 30%;
            margin: 10px;
            text-align: center;
        }

         img {
            max-width: 50%;
            border-radius: 25%;
           }
        </style>
    