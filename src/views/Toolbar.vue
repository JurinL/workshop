<template>
  <div>
    <v-app-bar app color="green darken-4" dark elevation="4">
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/" class="mx-2">
        <v-icon left>mdi-home</v-icon>
        Home
      </v-btn>

      <v-btn text to="/apicon" class="mx-2">
        <v-icon left>mdi-shopping</v-icon>
        Online Shopping
      </v-btn>

      <v-btn text to="/orders" class="mx-2">
        <v-icon left>mdi-clipboard-list</v-icon>
        Orders
      </v-btn>

      <v-btn text to="/workshop1" class="mx-2">
        <v-icon left>mdi-tools</v-icon>
        Workshop 1
      </v-btn>

      <v-btn text to="/workshop2" class="mx-2">
        <v-icon left>mdi-tools</v-icon>
        Workshop 2
      </v-btn>

      <v-btn text to="/products" class="mx-2">
        <v-icon left>mdi-package-variant</v-icon>
        Products
      </v-btn>

      <v-btn text to="/users" class="ml-4">
        <v-icon left>mdi-account</v-icon>
        <span>Users</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      User: "",
      User2: "",
    };
  },
  created() {
    this.User = localStorage.getItem("User");
    this.User2 = this.$cookies.get("User");
  },
};
</script>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.v-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}
</style>