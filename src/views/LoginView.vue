<template>
  <div>
    <h1>Hello World</h1>
    <h1>{{ name }}</h1>
    <TestProps :name="name" />
    <!-- send value to TestProps.vue -->
    <v-btn color="success" @click="callAlert()">CallAlert</v-btn>
    <v-btn color="success" @click="show = !show">switch</v-btn>
    <div v-if="show">
      <CardImg />
    </div>
    <!-- <h1 v-for="(item, index) in items" :key="index">
        {{ item.message }}
      </h1> -->
    <v-row>
      <v-col cols="3" v-for="(item, index) in items" :key="index">
        <div>
          <v-card>
            <v-img :src="item.imglink"></v-img>
            <v-card-title primary-title> {{ item.message }} </v-card-title>
            <v-card-actions>
              <v-btn color="success" @click="callAlertparams(item.message)"
                >alert</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
      <v-col cols="12">
        <h1>{{ value1 }}</h1>
        <v-text-field
          name="value1"
          label="กรอกรายละเอียด"
          id="value1"
          v-model="value1"
        ></v-text-field>
        <v-btn color="success" @click="setLocalStorage()">Set</v-btn>
        <v-btn color="success" @click="removeLocalStorage()">Remove</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardImg from "../components/CardImg.vue";
import TestProps from "../components/TestProps.vue";

export default {
  components: {
    CardImg,
    TestProps,
  },
  data() {
    return {
      value1: "",
      name: "Jurin",
      show: false,
      items: [
        {
          message: "Foo",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
        {
          message: "Bar",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
        {
          message: "Foo",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
        {
          message: "Bar",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
        {
          message: "Foo",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
        {
          message: "Bar",
          imglink:
            "https://swansoftwaresolutions.com/wp-content/uploads/2020/01/Benefits-of-Using-VUE.JS.jpeg",
        },
      ],
    };
  },
  methods: {
    callAlert() {
      alert("Hello World");
    },
    callAlertparams(item) {
      alert(item);
    },
    setLocalStorage() {
      localStorage.setItem("User", this.value1);
      this.$cookies.set("User", this.value1, "60s");
    },
    removeLocalStorage() {
      localStorage.removeItem("User");
      this.$cookies.remove("User");
    },
  },
};
</script>

<style>
</style>