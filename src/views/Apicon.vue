<template>
  <div class="green-theme">
    <v-container>
      <!-- Update header card -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4" color="green darken-1" elevation="3" shaped>
            <v-card-title class="text-h4 white--text py-4 px-6">
              Online Shop
              <v-spacer></v-spacer>
              
              <!-- Add this new orders button -->
              <v-btn 
                fab 
                small 
                color="white" 
                class="mr-4"
                @click="$router.push('/orders')"
              >
                <v-icon color="green darken-1">mdi-clipboard-text</v-icon>
              </v-btn>
              
              <v-badge
                :content="cartItems.length"
                :value="cartItems.length"
                color="red"
                offset-x="12"
                offset-y="12"
              >
                <v-btn fab small color="white" @click="cartDialog = true">
                  <v-icon color="green darken-1">mdi-cart</v-icon>
                </v-btn>
              </v-badge>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- Update new item button -->
      <v-btn color="green darken-2" dark class="mb-4" @click="newItem()">
        <v-icon left>mdi-plus</v-icon>
        Add New Item
      </v-btn>

      <!-- Update product cards -->
      <v-row>
        <v-col cols="4" v-for="(item, index) in apidata" :key="index">
          <v-card width="400" class="product-card" elevation="2">
            <v-img
              src="../assets/profile.jpg"
              height="250"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.7)"
            >
              <v-card-title class="text-h5">{{
                item.productName
              }}</v-card-title>
            </v-img>
            <v-card-text class="pt-4">
              <div class="text-h5 green--text text--darken-2 mb-2">
                {{ item.price }}฿
              </div>
              <div class="grey--text text--darken-1">
                {{ item.description }}
              </div>
            </v-card-text>
            <v-card-actions class="px-4 pb-4">
              <v-chip color="green lighten-4" small label>
                <v-icon left small>mdi-package-variant</v-icon>
                Stock: {{ item.stock }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn-group>
                <v-btn
                  icon
                  small
                  :disabled="item.quantity <= 1"
                  @click="item.quantity--"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <v-btn text disabled>{{ item.quantity }}</v-btn>
                <v-btn
                  icon
                  small
                  :disabled="item.quantity >= item.stock"
                  @click="item.quantity++"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-btn-group>
              <v-btn
                color="green darken-1"
                dark
                rounded
                class="ml-2"
                @click="addToCart(item)"
              >
                <v-icon left>mdi-cart-plus</v-icon>
                Add
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Edit Create Dialog -->
    <v-dialog v-model="dialogedit" width="600">
      <v-card>
        <v-card-title primary-title> {{ savemode }} </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-text-field
                name="productName"
                label="Product Name"
                id="id"
                v-model="postdata.productName"
                outlined
              ></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                id="id"
                v-model="postdata.description"
                outlined
              ></v-textarea>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="price"
                label="Price"
                id="id"
                v-model="postdata.price"
                outlined
                hint="Only Numbers"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                name="stock"
                label="Stock"
                id="id"
                v-model="postdata.stock"
                outlined
                hint="Only Numbers"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeItem()">cancel</v-btn>
          <v-btn color="info" text @click="saveSelect()">save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Shopping Cart Dialog -->
    <v-dialog v-model="cartDialog" max-width="600px">
      <v-card class="cart-dialog">
        <v-card-title class="green darken-1 white--text">
          <v-icon left color="white">mdi-cart</v-icon>
          Shopping Cart
          <v-spacer></v-spacer>
          <div class="subtitle-1">{{ cartItems.length }} items</div>
        </v-card-title>

        <v-card-text class="pa-4">
          <v-list>
            <v-list-item v-for="item in cartItems" :key="item.id" class="mb-2">
              <v-list-item-avatar size="60">
                <v-img src="../assets/profile.jpg" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ item.productName }}
                </v-list-item-title>
                <v-list-item-subtitle class="green--text text--darken-2">
                  {{ item.price }}฿ x {{ item.cartQuantity }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="d-flex align-center">
                <div class="text-h6 green--text text--darken-2 mr-4">
                  {{ (item.price * item.cartQuantity).toFixed(2) }}฿
                </div>
                <v-btn icon color="red lighten-1" @click="removeFromCart(item)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>

          <v-row align="center" class="px-3">
            <v-col cols="6">
              <div class="text-h5">Total Amount:</div>
            </v-col>
            <v-col cols="6" class="text-right">
              <div class="text-h4 green--text text--darken-2">
                {{ cartTotal }}฿
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="pa-4 green lighten-5">
          <v-btn text color="grey darken-1" @click="cartDialog = false">
            <v-icon left>mdi-arrow-left</v-icon>
            Continue Shopping
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            dark
            :disabled="!cartItems.length"
            @click="checkout()"
          >
            Proceed to Checkout
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      id: "",
      cartDialog: false,
      cartItems: [],
      postStatus: false,
      postdata: {
        // ใช้สำหรับส่งข้อมูลไปยัง API
        productName: "",
        description: "",
        price: "",
        stock: "",
      },
      postdefault: {
        // ใช้สำหรับเคลียข้อมูลที่ส่งไปยัง API
        productName: "",
        description: "",
        price: "",
        stock: "",
      },
      dialogedit: false,
    };
  },
  computed: {
    savemode() {
      return this.id === "" ? "New Product" : "Edit Product";
    },
    cartTotal() {
      return this.cartItems
        .reduce((total, item) => total + item.price * item.cartQuantity, 0)
        .toFixed(2);
    },
  },
  created() {
    this.getData();
    this.getCartItems();
  },
  methods: {
    newItem() {
      this.id = "";
      this.post = true;
      this.postdata = { ...this.postdefault };
      this.dialogedit = true;
    },
    editItem(item) {
      this.id = item._id;
      this.post = false;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    closeItem() {
      this.id = "";
      this.postdata = { ...this.postdefault };
      this.dialogedit = false;
    },
    saveSelect() {
      if (this.id != "") {
        this.savePutdata();
      } else {
        this.savePostdata();
      }
    },
    getData() {
      this.axios.get("http://localhost:3000/products").then((response) => {
        this.apidata = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
      });
    },
    async savePostdata() {
      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/products",
          this.postdata
        );
        console.log(data);
        alert("create success");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    async savePutdata() {
      try {
        const { data } = await this.axios.put(
          "http://localhost:3000/products/" + this.id,
          this.postdata
        );
        console.log(data);
        alert("update success");
        this.getData();
        this.closeItem();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    },
    async deleteItem(item) {
      if (confirm("Are you sure? you want to delete " + item.productName + "?"))
        try {
          const { data } = await this.axios.delete(
            "http://localhost:3000/products/" + item._id
          );
          console.log(data);
          alert("delete success");
          this.getData();
          this.closeItem();
        } catch (error) {
          console.log(error);
          alert("error");
        }
    },
    addToCart(product) {
      const quantity = parseInt(product.quantity) || 1;

      // Enhanced stock validation
      if (quantity > product.stock) {
        alert("Not enough stock available");
        return;
      }

      const existingProduct = this.cartItems.find(
        (item) => item.productName === product.productName
      );

      if (existingProduct) {
        // Check total quantity including existing cart items
        const totalQuantity = existingProduct.cartQuantity + quantity;
        if (totalQuantity > product.stock) {
          alert(`Cannot add more items. Stock limit is ${product.stock}`);
          return;
        }
        existingProduct.cartQuantity += quantity;
      } else {
        this.cartItems.push({
          ...product,
          cartQuantity: quantity,
        });
      }

      this.$nextTick(() => {
        this.cartDialog = true;
      });
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },

    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },
    getCartItems() {
      const cart = localStorage.getItem("cart");
      if (cart) {
        this.cartItems = JSON.parse(cart);
      }
    },
    async checkout() {
      if (this.cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      try {
        const orderData = {
          items: this.cartItems.map((item) => ({
            productId: item._id,
            productName: item.productName,
            quantity: item.cartQuantity,
            price: item.price,
          })),
          totalAmount: this.cartTotal,
          orderDate: new Date(),
          status: "pending",
        };
        console.log(orderData);

        const { data } = await this.axios.post(
          "http://localhost:3000/orders/",
          orderData
        );
        console.log(data);
        // Update product stock
        for (const item of this.cartItems) {
          const updatedStock = {
            ...item,
            stock: item.stock - item.cartQuantity,
          };
          await this.axios.put(
            `http://localhost:3000/products/${item._id}`,
            updatedStock
          );
        }

        alert("Order placed successfully!");
        this.cartItems = [];
        this.cartDialog = false;
        localStorage.removeItem("cart");
        this.getData(); // Refresh product list to show updated stock
      } catch (error) {
        console.error("Checkout error:", error);
        alert("Failed to place order. Please try again.");
      }
    },
  },
};
</script>

<style>
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

.v-card-title {
  border-bottom: none;
  position: relative;
}

.v-card-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: #81c784;
  border-radius: 3px;
}

.cart-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.cart-dialog .v-list-item {
  margin: 8px;
  border-radius: 12px;
  background: rgba(245, 245, 245, 0.8);
  backdrop-filter: blur(8px);
}

.cart-dialog .v-list-item:hover {
  background-color: #e8f5e9;
  transform: translateX(4px);
}

.cart-dialog .v-card-title {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.cart-dialog .v-list-item-avatar {
  border: 2px solid #81c784;
}

.v-btn {
  transition: all 0.2s ease;
}

.v-btn:hover {
  transform: translateY(-2px);
}

.v-list-item {
  transition: all 0.3s ease;
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

.cart-dialog .v-list-item:hover {
  background: rgba(232, 245, 233, 0.9);
  transform: scale(1.02);
}
</style>

