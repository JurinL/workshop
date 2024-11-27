<template>
  <div>
    <h1>Profile</h1>
    <v-container>
      <v-row>
        <!-- Profile Cards -->
        <v-col v-for="(person, index) in people" :key="index" cols="3">
          <v-card @click="showProfile(person)" class="profile-card">
            <v-img :src="person.image" height="40vh" width="25vb"></v-img>
            <v-card-title>{{ person.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Profile Dialog -->
      <v-dialog v-model="dialog" max-width="1500">
        <div class="container">
          <v-card class="d-flex" height="50vh" width="75%" v-if="selectedPerson">
            <v-img :src="selectedPerson.image" width="20vw" height="50vh"></v-img>
              <v-card-text>
                <v-card-title class="Title">{{ selectedPerson.name }}</v-card-title>
                <v-divider></v-divider>
                <v-card-subtitle>{{ selectedPerson.university }}</v-card-subtitle>
                <v-card-subtitle>System Engineer</v-card-subtitle>
                <v-row>
                  <v-col cols="6">
                    <v-list>
                      <v-list-item>
                        <v-icon color="blue">mdi-email</v-icon>
                        <v-list-item-content>
                          <v-list-item-title>Email</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedPerson.email }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-icon color="purple">mdi-phone</v-icon>
                        <v-list-item-content>
                          <v-list-item-title>Phone</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedPerson.phone }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                        <v-list-item>
                          <v-icon color="blue darken-3">mdi-facebook</v-icon>
                          <v-list-item-content>
                            <v-list-item-title>Facebook</v-list-item-title>
                            <v-list-item-subtitle>
                              <a :href="selectedPerson.facebookUrl" target="_blank" class="facebook-link">
                                {{ selectedPerson.facebook }}
                              </a>
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                  </v-col>

                  <v-col cols="6">
                    <v-list>
                      <v-list-item>
                        <v-icon color="green">mdi-thumb-up</v-icon>
                        <v-list-item-content>
                          <v-list-item-title>Likes</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedPerson.likes }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-icon color="red">mdi-thumb-down</v-icon>
                        <v-list-item-content>
                          <v-list-item-title>Dislikes</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedPerson.dislikes }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-icon color="yellow">mdi-star</v-icon>
                        <v-list-item-content>
                          <v-list-item-title>Hobbies</v-list-item-title>
                          <v-list-item-subtitle>{{ selectedPerson.hobby }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
        </div>
      </v-dialog>
    </v-container>
  </div>
</template>

  <script>
import JurinImg from '../assets/profile.jpg'
export default {
  name: 'Test',
  data() {
    return {
      dialog: false,
      selectedPerson: null,
      people: [
  {
    name: 'Jurin Laiyakosit',
    image: JurinImg,
    university: 'Prince of Songkla University, Computer Engineering',
    email: 'jurin37@hotmail.co.th',
    phone: '+66950244763',
    facebook: 'Jurin Laiyakosit',
    facebookUrl: 'https://www.facebook.com/Jurin.zz',  // Replace with your actual Facebook URL
    hobby: 'Reading, Gaming, Music',
    likes: 'Cats, Books, Weekends',
    dislikes: 'Bugs, Traffic, Mondays'
  },
  {
    name: 'Test Test',
    image: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
    university: 'Prince of Songkla University, Computer Engineering',
    email: 'jurin37@hotmail.co.th',
    phone: '+66950244763',
    facebook: 'Jurin Laiyakosit',
    facebookUrl: 'https://www.facebook.com/Jurin.zz',  // Replace with your actual Facebook URL
    hobby: 'Reading, Gaming, Music',
    likes: 'Cats, Books, Weekends',
    dislikes: 'Bugs, Traffic, Mondays'
  }
]
    }
  },
  methods: {
    showProfile(person) {
      this.selectedPerson = person
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.facebook-link {
  text-decoration: none;
  color: inherit;
}
.facebook-link:hover {
  color: #4267B2;
}
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: scale(1.02);
}
h1 {
  text-align: center;
  font-size: 4vw;
  font-weight: bold;
  margin-top: 30wh;
  color: white;
  background-color: black;
  font-family: monospace;
}
.Title {
  font-size: 4vw;
  margin-bottom: 4%;
  color: black;
  font-family: fantasy;
}
.v-icon {
  font-size: 2.5vw;
  margin-right: 1vw;
  margin-left: 1vw;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
</style>
