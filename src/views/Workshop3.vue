
<template>
  <v-container>
    <!-- Header -->
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <v-card-title class="text-h4">
            Online Shop
            <v-spacer></v-spacer>
            <v-badge
              :content="cartItems.length"
              :value="cartItems.length"
              color="red"
              overlap
            >
              <v-btn icon>
                <v-icon @click="cartDialog = true">mdi-cart</v-icon>
              </v-btn>
            </v-badge>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <!-- Products Grid -->
    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card height="420">
          <v-img :src="product.image" height="200px" cover></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            <div class="text-h6 primary--text">{{ product.price }}฿</div>
            <div>{{ product.description }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn
              color="primary"
              @click="addToCart(product)"
            >
              Add to Cart
              <v-icon right>mdi-cart-plus</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-rating
              v-model="product.rating"
              readonly
              dense
              half-increments
              size="18"
            ></v-rating>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Shopping Cart Dialog -->
    <v-dialog v-model="cartDialog" max-width="500px">
      <v-card>
        <v-card-title>Shopping Cart</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item v-for="item in cartItems" :key="item.id">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.price }}฿</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="removeFromCart(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <div class="text-h6 pt-4">
            Total: ${{ cartTotal }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkout">
            Checkout
          </v-btn>
          <v-btn color="grey" text @click="cartDialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Workshop3',
  data() {
    return {
      cartDialog: false,
      cartItems: [],
      products: [
        {
          id: 1,
          name: 'Smartphone',
          price: 699.99,
          description: 'Latest model smartphone with advanced features',
          image: 'https://picsum.photos/id/1/500/300',
          rating: 4.5
        },
        {
          id: 2,
          name: 'Laptop',
          price: 1299.99,
          description: 'High-performance laptop for professionals',
          image: 'https://picsum.photos/id/2/500/300',
          rating: 5
        },
        {
          id: 3,
          name: 'Headphones',
          price: 199.99,
          description: 'Wireless noise-canceling headphones',
          image: 'https://picsum.photos/id/3/500/300',
          rating: 4
        },
        {
          id: 4,
          name: 'Smartwatch',
          price: 299.99,
          description: 'Fitness tracking smartwatch',
          image: 'https://picsum.photos/id/4/500/300',
          rating: 4.5
        }
      ]
    }
  },
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)
    }
  },
  methods: {
    addToCart(product) {
      this.cartItems.push(product)
      this.$nextTick(() => {
        this.cartDialog = true
      })
    },
    removeFromCart(item) {
      const index = this.cartItems.indexOf(item)
      if (index > -1) {
        this.cartItems.splice(index, 1)
      }
    },
    checkout() {
        if (this.cartItems.length === 0) alert('Your cart is empty.')
        else {
            alert('Thank you for your purchase!')
            this.cartItems = []
            this.cartDialog = false
        }
      
    }
  }
}
</script>

<style scoped>
.v-card {
  transition: transform 0.2s;
}
.v-card:hover {
  transform: translateY(-5px);
}
</style>
