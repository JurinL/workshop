<template>
  <div class="container">
    <h1>My Profile</h1>
    <v-card class="profilecard" elevation="5">
      <v-img src="../assets/profile.jpg"></v-img>
      <v-card-title>Jurin Laiyakosit</v-card-title>
      <v-card-subtitle>มหาวิทยาลัยสงขลานครินทร์ คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</v-card-subtitle>
    </v-card>
  </div>
</template>

<script>
export default {};
</script>

<style>
h1 {
  color: blue;
  text-align: center;
  font-size: 50px;
}
.conntainer {
  display: flex;
  justify-content: center;
  align-content: center;
  width: 70%;
  margin: auto;
}
.profilecard {
    margin: auto;
    width: 50%;
}

</style>