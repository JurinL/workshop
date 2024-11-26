Sure! Here's the modified code to place the information next to the image:

```html
<template>
  <div>
    <h1>My Profile</h1>
    <div class="container">
      <v-card class="d-flex" elevation="12" height="55vh">
        <v-row>
          <v-col cols="4">
            <v-img src="../assets/profile.jpg" width="100%" height="100%" contain @click="show = !show"></v-img>
          </v-col>
          <v-col cols="8">
            <v-expand-transition>
              <v-card-text v-if="show">
                <v-card-title class="Title">{{ name }}</v-card-title>
                <v-card-subtitle>{{ university }}</v-card-subtitle>
                <v-card-text> งานอดิเรก : {{ hobby }}</v-card-text>
                <v-card-text>
                  <v-row>
                    <v-list-item>
                      <v-icon left>mdi-email</v-icon>{{ email }}
                      <v-icon left>mdi-phone</v-icon>{{ phone }}
                    </v-list-item>
                    <v-card-actions style="display: flex; justify-content: center">
                      <v-btn color="success" width="15vw">
                        <v-icon size="30">mdi-thumb-up</v-icon>Like
                      </v-btn>
                      <v-btn color="red" width="15vw">
                        <v-icon size="30">mdi-thumb-down</v-icon>Dislike
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card-text>
              </v-card-text>
            </v-expand-transition>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      name: 'Your Name',
      university: 'Your University',
      hobby: 'Your Hobby',
      email: 'your.email@example.com',
      phone: '123-456-7890'
    };
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.Title {
  font-size: 24px;
  font-weight: bold;
}

.v-btn {
  margin: 10px;
}

.v-card-actions {
  display: flex;
  justify-content: center;
}

.v-icon {
  margin-right: 5px;
}
</style>
```

This code uses Vuetify's grid system to place the image in a column on the left and the text in a column on the right. Let me know if you need any further adjustments!