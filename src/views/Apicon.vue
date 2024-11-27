<template>
  <div>
    <h1>API CONNECT</h1>
    <v-row>
      <v-col cols="3" v-for="(item, index) in apidata" :key="index">
        <div>
          <v-card width="350">
            <v-img src="../assets/profile.jpg"></v-img>
            <v-card-title primary-title>
              {{ item.name }} {{ item.surname }}, {{ item.age }}</v-card-title
            >
            <v-card-actions>
              <v-btn color="success" @click="alert(item.sex)">alert</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogedit" width="500">
      <v-card>
        <v-card-title primary-title> {{ savemode }} </v-card-title>
        <v-card-text> 
            <v-row>
                <v-col cols="12">
                    <v-text-field name="username" label="Username" id="id" v-model="postdata.username" outlined></v-text-field>
                    <v-text-field name="password" label="Password" id="id" v-model="postdata.password" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="name" label="Name" id="id" v-model="postdata.name" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="surname" label="Surname" id="id" v-model="postdata.surname" outlined></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-text-field name="age" label="Age" id="id" v-model="postdata.age" outlined></v-text-field>
                    <v-text-field name="sex" label="Sex" id="id" v-model="postdata.sex" outlined></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="info" text>save</v-btn>
            <v-btn color="error" text>cancel</v-btn>
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
        // ใช้สำหรับเคลียข้มูลที่ส่งไปยัง API
        username: "",
        password: "",
        name: "",
        surname: "",
        age: "",
        sex: "",
      },
      dialogedit: true,
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
    getData() {
      this.axios.get("http://localhost:3000/users").then((response) => {
        console.log(response.data);
        this.apidata = response.data;
      });
    },
  },
};
</script>

<style>
</style>