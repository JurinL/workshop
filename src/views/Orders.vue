<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              Orders
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="orders"
              :search="search"
              :loading="loading"
              class="elevation-1"
            >
              <template #[`item.status`]="{ item }">
                <v-chip
                  :color="getStatusColor(item.status)"
                  dark
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template #[`item.actions`]="{ item }">
                <v-btn
                  small
                  color="primary"
                  @click="showOrderDetails(item)"
                >
                  View Details
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>

      <!-- Order Details Dialog -->
      <v-dialog v-model="dialog" max-width="700px">
        <v-card>
          <v-card-title>
            Order Details
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
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
                    <td>฿{{ product.quantity * product.price }}</td>
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