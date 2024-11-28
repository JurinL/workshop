<template>
  <v-container fluid class="orders-container">
    <!-- Updated Header with API Console Button -->
    <v-row class="header-banner mb-6">
      <v-col cols="12" class="d-flex align-center justify-space-between">
        <div>
          <h1 class="white--text text-h4 font-weight-medium">
            <v-icon large color="white" class="mr-3">mdi-clipboard-text</v-icon>
            Order Management
          </h1>
          <p class="white--text mt-2">Track and manage all your orders in one place</p>
        </div>
        <v-btn
          color="white"
          class="green--text text--darken-2"
          elevation="2"
          rounded
          @click="goToApiConsole"
        >
          <v-icon left>mdi-console</v-icon>
          API Console
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="custom-card">
          <v-card-title class="green lighten-4">
            <v-icon large color="green darken-2" class="mr-2">mdi-shopping</v-icon>
            Orders
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search Orders"
              single-line
              hide-details
              filled
              dense
              rounded
              class="custom-search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="orders"
            :search="search"
            :loading="loading"
            class="elevation-0"
            :loading-text="'Loading orders...'"
          >
            <template #[`item.status`]="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                dark
                small
                label
              >
                {{ item.status }}
              </v-chip>
            </template>
            <template #[`item.actions`]="{ item }">
              <v-btn
                small
                color="green darken-2"
                elevation="2"
                rounded
                @click="showOrderDetails(item)"
                class="white--text"
              >
                <v-icon left small>mdi-eye</v-icon>
                View Details
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Enhanced Order Details Dialog -->
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title class="green lighten-4">
          <v-icon color="green darken-2" class="mr-2">mdi-package-variant</v-icon>
          Order Details
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pt-4">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in selectedOrderProducts" :key="product.id">
                  <td>{{ product.productName }}</td>
                  <td>{{ product.quantity }}</td>
                  <td>฿{{ product.price }}</td>
                  <td class="green--text text--darken-2 font-weight-bold">
                    ฿{{ product.quantity * product.price }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container> 
</template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'Orders',
    data() {
      return {
        search: '',
        loading: false,
        orders: [],
        dialog: false,
        selectedOrderProducts: [],
        headers: [
          { text: 'Order ID', value: '_id' },
          { text: 'Customer Name', value: 'customerName' },
          { text: 'Order Date', value: 'orderDate' },
          { text: 'Total Amount', value: 'totalAmount' },
          { text: 'Status', value: 'status' },
          { text: 'Actions', value: 'actions', sortable: false }
        ]
      }
    },
    methods: {
      goToApiConsole() {
        window.location.href = 'http://localhost:8080/apicon'
      },
      async fetchOrders() {
        this.loading = true
        try {
          const response = await axios.get('http://localhost:3000/orders')
          this.orders = response.data
        } catch (error) {
          console.error('Error fetching orders:', error)
        } finally {
          this.loading = false
        }
      },
      getStatusColor(status) {
        switch (status.toLowerCase()) {
          case 'pending':
            return 'orange'
          case 'completed':
            return 'green'
          case 'cancelled':
            return 'red'
          default:
            return 'grey'
        }
      },
      async showOrderDetails(order) {
        try {
          // Assuming there's an endpoint to fetch order details by ID
          const response = await axios.get(`http://localhost:3000/orders/${order._id}/products`)
          this.selectedOrderProducts = response.data
          this.dialog = true
        } catch (error) {
          console.error('Error fetching order details:', error)
        }
      }
    },
    created() {
      this.fetchOrders()
    }
  }
  </script>

  
<style scoped>
.orders-container {
  background-color: #f5f5f5;
}

.header-banner {
  background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-card {
  border-radius: 8px;
  overflow: hidden;
}

.custom-search {
  max-width: 300px;
}

.v-data-table {
  background: white;
}

.v-data-table >>> .v-data-table-header {
  background-color: #f5f5f5;
}

.v-data-table >>> th {
  font-size: 0.95rem !important;
  font-weight: 600 !important;
  color: #1b5e20 !important;
}
</style>