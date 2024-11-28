<template>
  <div class="green-theme">
    <v-container>
      <!-- Update header card -->
      <v-row>
        <v-col cols="12">
          <v-card class="mb-4" color="green darken-1">
            <v-card-title class="text-h4 white--text">
              Online Shop
              <v-spacer></v-spacer>
              <v-badge
                :content="cartItems.length"
                :value="cartItems.length"
                color="red"
                overlap
              >
                <v-btn icon color="white">
                  <v-icon @click="cartDialog = true">mdi-cart</v-icon>
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
          <v-card width="400" class="product-card" elevation="4">
            <v-img src="../assets/profile.jpg" height="200" cover></v-img>
            <v-card-title primary-title class="text-h5 green--text">
              {{ item.productName }}
              <v-spacer></v-spacer>
              <v-icon color="green darken-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon color="red" @click="deleteItem(item)">mdi-delete</v-icon>
            </v-card-title>
            <v-card-text>
              <div class="text-h6 green--text text--darken-2">{{ item.price }}฿</div>
            </v-card-text>
            <v-card-subtitle>{{ item.description }}</v-card-subtitle>
            <v-card-actions class="px-4">
              <v-chip color="green lighten-4" small>
                Stock: {{ item.stock }}
              </v-chip>
              <v-spacer></v-spacer>
              <v-btn icon small :disabled="item.quantity <= 1" @click="item.quantity--">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <span class="mx-2">{{ item.quantity }}</span>
              <v-btn icon small :disabled="item.quantity >= item.stock" @click="item.quantity++">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              <v-btn color="green darken-1" dark @click="addToCart(item)">
                Add to Cart
                <v-icon right>mdi-cart-plus</v-icon>
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
      <v-dialog v-model="cartDialog" max-width="500px">
        <v-card>
          <v-card-title>Shopping Cart</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item v-for="item in cartItems" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ item.productName }} (x{{ item.cartQuantity }})
                  </v-list-item-title>
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
            <div class="text-h6 pt-4">Total: {{ cartTotal }}฿</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="checkout()"> Checkout </v-btn>
            <v-btn color="grey" text @click="cartDialog = false"> Close </v-btn>
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
        .reduce((total, item) => total + item.price * item.quantity, 0)
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
  background-color: #f1f8e9;
  min-height: 100vh;
  padding: 20px 0;
}

.product-card {
  transition: transform 0.2s;
  border-radius: 8px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.v-card-title {
  border-bottom: 2px solid #81c784;
}
</style>

