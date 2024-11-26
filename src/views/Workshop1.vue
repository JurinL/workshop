<template>
  <div>
    <h1>My Profile</h1>
    <div class="container">
      <v-card class="d-flex" elevation="12" height="45vh">
        <v-img
          src="../assets/profile.jpg"
          width="34vb"
          contain
        ></v-img>

        <v-card-text>
          <v-card-title class="Title">{{ name }}</v-card-title>
          <v-card-subtitle>{{ university }}</v-card-subtitle>
          <v-card-text> งานอดิเรก : {{ hobby }}</v-card-text>
          <v-card-text>
              <v-list-item>
                <v-icon left>mdi-email</v-icon>{{ email }}
                <v-icon left>mdi-phone</v-icon>{{ phone }}
              </v-list-item>
              <v-card-actions style="display: flex; justify-content: center">
                <v-btn color="success" width="15vw"><v-icon size="30">mdi-thumb-up</v-icon>Like</v-btn>
                <v-btn color="red" width="15vw"><v-icon size="30">mdi-thumb-down</v-icon>Dislike</v-btn>
              </v-card-actions>
          </v-card-text>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "Profile",
  data() {
    return {
      name: "Jurin Laiyakosit",
      university: "มหาวิทยาลัยสงขลานครินทร์ สาขาวิศวกรรมคอมพิวเตอร์",
      email: "jurin37@hotmail.co.th",
      phone: "+66950244763",
      hobby: "อ่านหนังสือ ฟังเพลง เล่นเกม",
      like: "แมว",
      dislike: "แมลงสาบ",
      show: false,
    };
  },
};
</script>
  
<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
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
</style>