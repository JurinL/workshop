<template>
  <div class="Profile">
    <h1>My Profile</h1>
    <div class="container">
      <v-card class="d-flex" width="70%" elevation="12" height="auto">
        <v-img
          src="../assets/profile.jpg"
          width="34vb"
          height="auto"
          contain
        ></v-img>
        <v-card-text>
          <v-card-title class="Title">{{ name }}</v-card-title>
          <v-card-subtitle>{{ university }}</v-card-subtitle>
          <v-card-text> งานอดิเรก : {{ hobby }}</v-card-text>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-icon left color="green">mdi-thumb-up</v-icon>{{ like }}
                <v-icon left color="red">mdi-thumb-down</v-icon>{{ dislike }}
              </v-col>
              <v-col cols="12">
                <v-icon left>mdi-email</v-icon>{{ email }}
              </v-col>
              <v-col cols="12">
                <v-icon left>mdi-phone</v-icon>{{ phone }}
              </v-col>
            </v-row>
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