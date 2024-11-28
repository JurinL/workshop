<template>
    <div class="green-theme">
      <v-container>
        <v-card class="mb-4" color="green darken-1" elevation="3" shaped>
          <v-card-title class="text-h4 white--text py-4 px-6">
            Product Management
          </v-card-title>
        </v-card>
  
        <v-btn color="green darken-2" dark class="mb-4" @click="newItem()">
          <v-icon left>mdi-plus</v-icon>
          Add New Product
        </v-btn>
  
        <v-row>
          <v-col cols="4" v-for="(item, index) in products" :key="index">
            <v-card class="product-card" elevation="2">
              <v-img
                src="../assets/profile.jpg"
                height="200"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7)"
              >
                <v-card-title class="text-h5">{{ item.productName }}</v-card-title>
              </v-img>
              <v-card-text class="pt-4">
                <div class="text-h5 green--text text--darken-2 mb-2">
                  {{ item.price }}฿
                </div>
                <div class="grey--text text--darken-1">{{ item.description }}</div>
                <v-chip color="green lighten-4" class="mt-2" small>
                  <v-icon left small>mdi-package-variant</v-icon>
                  Stock: {{ item.stock }}
                </v-chip>
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
          <v-card-title class="green darken-1 white--text">{{ formTitle }}</v-card-title>
          <v-card-text class="pt-4">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="editedItem.productName"
                    label="Product Name"
                    outlined
                  ></v-text-field>
                  <v-textarea
                    v-model="editedItem.description"
                    label="Description"
                    outlined
                  ></v-textarea>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.price"
                    label="Price"
                    type="number"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="editedItem.stock"
                    label="Stock"
                    type="number"
                    outlined
                  ></v-text-field>
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
    name: 'ProductList',
    data: () => ({
      dialog: false,
      products: [],
      editedIndex: -1,
      editedItem: {
        productName: '',
        description: '',
        price: '',
        stock: ''
      },
      defaultItem: {
        productName: '',
        description: '',
        price: '',
        stock: ''
      }
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Product' : 'Edit Product'
      }
    },
  
    created() {
      this.fetchProducts()
    },
  
    methods: {
      async fetchProducts() {
        try {
          const response = await this.axios.get('http://localhost:3000/products')
          this.products = response.data
        } catch (error) {
          console.error('Error fetching products:', error)
        }
      },
  
      newItem() {
        this.editedIndex = -1
        this.editedItem = Object.assign({}, this.defaultItem)
        this.dialog = true
      },
  
      editItem(item) {
        this.editedIndex = this.products.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  
      async deleteItem(item) {
        if (confirm(`Are you sure you want to delete ${item.productName}?`)) {
          try {
            await this.axios.delete(`http://localhost:3000/products/${item._id}`)
            await this.fetchProducts()
          } catch (error) {
            console.error('Error deleting product:', error)
          }
        }
      },
  
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      async save() {
        try {
          if (this.editedIndex > -1) {
            await this.axios.put(
              `http://localhost:3000/products/${this.editedItem._id}`,
              this.editedItem
            )
          } else {
            await this.axios.post('http://localhost:3000/products', this.editedItem)
          }
          await this.fetchProducts()
          this.close()
        } catch (error) {
          console.error('Error saving product:', error)
        }
      }
    }
  }
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
  