<template>
  <div class="workshop-container">
    <h1>Profile</h1>
    <v-container>
      <v-row>
        <!-- Profile Cards -->
        <v-col v-for="(person, index) in people" :key="index" cols="3">
          <v-card @click="showProfile(person)" class="profile-card" elevation="3">
            <v-img :src="person.image" height="40vh" width="25vb" class="profile-image"></v-img>
            <v-card-title class="green-text">{{ person.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Profile Dialog -->
      <v-dialog v-model="dialog">
        <div class="container" width="3000">
          <v-card class="d-flex modern-dialog" height="50vh" width="75%" v-if="selectedPerson">
            <v-img :src="selectedPerson.image" width="20vw" height="50vh" class="dialog-image"></v-img>
            <v-card-text>
              <v-card-title class="modern-title">{{ selectedPerson.name }}</v-card-title>
              <v-divider class="green-divider"></v-divider>
              <v-card-subtitle class="university-text">{{ selectedPerson.university }}</v-card-subtitle>
              <v-card-subtitle class="role-text">System Engineer</v-card-subtitle>
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
.workshop-container {
  background-color: #f5f5f5;
  min-height: 100vh;
}

.profile-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(76, 175, 80, 0.2);
}

.profile-image {
  border-bottom: 3px solid #4CAF50;
}

h1 {
  text-align: center;
  font-size: 3.5vw;
  font-weight: 600;
  margin: 2rem 0;
  color: white;
  background-color: #2E7D32;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
}

.modern-title {
  font-size: 3vw;
  color: #2E7D32;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
}

.green-text {
  color: #2E7D32;
  font-weight: 500;
}

.university-text {
  color: #66BB6A;
  font-size: 1.2rem;
}

.role-text {
  color: #81C784;
  font-weight: 500;
}

.green-divider {
  border-color: #4CAF50;
  margin: 1rem 0;
}

.modern-dialog {
  border-radius: 20px;
  overflow: hidden;
}

.dialog-image {
  border-right: 4px solid #4CAF50;
}

.v-icon {
  font-size: 2rem;
  color: #4CAF50 !important;
}

.facebook-link {
  text-decoration: none;
  color: #2E7D32;
  transition: color 0.2s ease;
}

.facebook-link:hover {
  color: #1B5E20;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}

.v-list-item {
  margin: 0.5rem 0;
}

.v-list-item-content {
  padding: 0.5rem 0;
}
</style>
