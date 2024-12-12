<template>
  <div class="green-theme">
    <v-container>
      <v-card class="mb-4" color="green darken-1" elevation="3" shaped>
        <v-card-title class="text-h4 white--text py-4 px-6">
          Users Management
        </v-card-title>
      </v-card>

      <v-btn color="green darken-2" dark class="mb-4" @click="newItem()">
        <v-icon left>mdi-plus</v-icon>
        Add New User
      </v-btn>

      <v-row>
        <v-col cols="4" v-for="(item, index) in users" :key="index">
          <v-card class="product-card" elevation="2">
            <v-img
              :src="item.imageUrl || require('../assets/profile.jpg')"
              height="200"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7)"
            >
              <v-card-title class="text-h5">
                {{ item.name }} {{ item.surname }}
              </v-card-title>
            </v-img>
            <v-card-text class="pt-4">
              <div class="text-h5 green--text text--darken-2 mb-2">
                Age : {{ item.age }}
              </div>
              <div class="grey--text text--darken-1">Sex : {{ item.sex }}</div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon color="green darken-1" @click="editItem(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red" @click="deleteItem(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" width="600">
      <v-card>
        <v-card-title class="green darken-1 white--text">
          {{ formTitle }}
        </v-card-title>
        <v-card-text class="pt-4">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.username"
                  label="Username"
                  outlined
                  :disabled="editedIndex !== -1"
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.password"
                  name="name"
                  label="Enter your password"
                  type="password"
                  outlined
                  :disabled="editedIndex !== -1"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name"
                  outlined
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.surname"
                  label="Surname"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.age"
                  label="Age"
                  type="number"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editedItem.sex"
                  label="Sex"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  v-model="productImage"
                  label="Product Image"
                  accept="image/*"
                  prepend-icon="mdi-camera"
                  outlined
                  @change="handleImageChange"
                ></v-file-input>
                <v-img
                  v-if="imagePreview"
                  :src="imagePreview"
                  max-height="200"
                  contain
                ></v-img>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="green lighten-5">
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="close">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
    
    <script>
export default {
  name: "UserList",
  data: () => ({
    dialog: false,
    users: [],
    editedIndex: -1,
    productImage: null,
    imagePreview: null,
    editedItem: {
      username: "",
      password: "",
      name: "",
      surname: "",
      age: "",
      sex: "",
    },
    defaultItem: {
      username: "",
      password: "",
      name: "",
      surname: "",
      age: "",
      sex: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
    },
  },

  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.axios.get("http://localhost:3000/users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    newItem() {
      this.editedIndex = -1;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      if (confirm(`Are you sure you want to delete ${item.name}?`)) {
        try {
          await this.axios.delete(`http://localhost:3000/users/${item._id}`);
          await this.fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    handleImageChange(file) {
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      } else {
        this.imagePreview = null;
      }
    },

    async save() {
      try {
        if (
          !this.editedItem.name ||
          !this.editedItem.surname ||
          !this.editedItem.age ||
          !this.editedItem.sex
        ) {
          alert("Please fill in all required fields.");
          return;
        }

        if (this.editedIndex > -1) {
          await this.axios.put(
            `http://localhost:3000/users/${this.editedItem._id}`,
            this.editedItem
          );
        } else {
          await this.axios.post("http://localhost:3000/users", this.editedItem);
        }
        await this.fetchUsers();
        this.close();
      } catch (error) {
        console.error("Error saving user:", error);
      }
    },
  },
};
</script>
    
    <style scoped>
.green-theme {
  background: linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%);
  min-height: 100vh;
  padding: 24px 0;
}

.product-card {
  animation: fadeIn 0.5s ease-out;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>  