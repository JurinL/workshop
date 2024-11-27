<template>
  <div>
    <h1>API CONNECT</h1>
    <v-btn color="success" @click="newItem()">newItem</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <div>
          <v-card width="350">
            <v-img src="../assets/profile.jpg"></v-img>
            <v-card-title primary-title class="text-h5">
              {{ item.productName }}
            </v-card-title>
            <v-card-subtitle>
              {{ item.description }}
            </v-card-subtitle>
            <v-card-text>
              {{ item.price }}฿,{{ item.stock }}
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" @click="editItem(item)">edit</v-btn>
              <v-btn color="error" @click="deleteItem(item)">delete</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogedit" width="600">
      <v-card>
        <v-card-title primary-title> {{ savemode }} </v-card-title>
        <v-card-text> 
            <v-row>
                <v-col cols="12">
                    <v-text-field name="productName" label="Product Name" id="id" v-model="postdata.productName" outlined></v-text-field>
                    <v-textarea name="description" label="Description" id="id" v-model="postdata.description" outlined></v-textarea>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="price" label="Price" id="id" v-model="postdata.price" outlined hint="Only Numbers"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="stock" label="Stock" id="id" v-model="postdata.stock" outlined hint="Only Numbers"></v-text-field>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      apidata: [],
      id: "",
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
    savemode(){
        return this.id === '' ? 'New Product' : 'Edit Product'
    }
  },
  created() {
    this.getData();
  },
  methods: {
    newItem(){
      this.id = ''
      this.post = true
      this.postdata = {...this.postdefault}
      this.dialogedit = true
    },
    editItem(item){
      this.id = item._id
      this.post = false
      this.postdata = {...item}
      this.dialogedit = true
    },
    closeItem(){
      this.id = ''
      this.postdata = {...this.postdefault}
      this.dialogedit = false
    },
    saveSelect(){
      if(this.id != '') {
        this.savePutdata()
      }else{
        this.savePostdata()
      }
    },
    getData() {
      this.axios.get("http://localhost:3000/products" 
//,{ headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') } } สำหรับการใช้งาน API ที่ต้องการการตรวจสอบสิทธิ์
      ).then((response) => {
        console.log(response.data);
        this.apidata = response.data;
      });
    },
    async savePostdata () {
      try {
        const {data} = await this.axios.post('http://localhost:3000/products', this.postdata)
        console.log(data)
        alert('create success')
        this.getData()
        this.closeItem()
      }catch(error){
        console.log(error)
        alert('error')
      }
    },
    async savePutdata () {
      try {
        const {data} = await this.axios.put('http://localhost:3000/products/'+ this.id, this.postdata)
        console.log(data)
        alert('update success')
        this.getData()
        this.closeItem()
      }catch(error){
        console.log(error)
        alert('error')
      }
    },
    async deleteItem (item) {
      if(confirm('Are you sure? you want to delete ' + item.name + '?'))
      try {
        const {data} = await this.axios.delete('http://localhost:3000/products/'+ item._id)
        console.log(data)
        alert('delete success')
        this.getData()
        this.closeItem()
      }catch(error){
        console.log(error)
        alert('error')
      }
    }
  },
};
</script>

<style>
</style>