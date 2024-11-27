<template>
  <div>
    <h1>API CONNECT</h1>
    <v-btn color="success" @click="newItem()">newItem</v-btn>
    <v-row>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <div>
          <v-card width="350">
            <v-img src="../assets/profile.jpg"></v-img>
            <v-card-title primary-title>
              {{ item.name }} {{ item.surname }}, {{ item.age }}
            </v-card-title>
            <v-card-actions>
              <v-btn color="success" @click="editItem(item)">edit</v-btn>
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
                    <v-text-field :disabled="!postStatus" name="username" label="Username" id="id" v-model="postdata.username" outlined></v-text-field>
                    <v-text-field :disabled="!postStatus" name="password" label="Password" id="id" v-model="postdata.password" password outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="name" label="Name" id="id" v-model="postdata.name" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="surname" label="Surname" id="id" v-model="postdata.surname" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="age" label="Age" id="id" v-model="postdata.age" outlined hint="Only Numbers"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="sex" label="Sex" id="id" v-model="postdata.sex" outlined hint="male, female"></v-text-field>
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
        username: "",
        password: "",
        name: "",
        surname: "",
        age: "",
        sex: "",
      },
      postdefault: {
        // ใช้สำหรับเคลียข้อมูลที่ส่งไปยัง API
        username: "",
        password: "",
        name: "",
        surname: "",
        age: "",
        sex: "",
      },
      dialogedit: false,
    };
  },
  computed: {
    savemode(){
        return this.id === '' ? 'New User' : 'Edit User'
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
      this.axios.get("http://localhost:3000/users").then((response) => {
        console.log(response.data);
        this.apidata = response.data;
      });
    },
    async savePostdata () {
      try {
        const {data} = await this.axios.post('http://localhost:3000/users', this.postdata)
        console.log(data)
        alert('save success')
        this.getData()
        this.closeItem()
      }catch(error){
        console.log(error)
        alert('error')
      }
    },
    async savePutdata () {
      try {
        const {data} = await this.axios.put('http://localhost:3000/users/'+ this.id, this.postdata)
        console.log(data)
        alert('save success')
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