<template>
  <div>
    <h1>{{ name }}</h1>
    <v-btn color="success" @click="callMain()">callMain</v-btn>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus.js"; // import ทั้งสองไฟล์
export default {
  props: ["name"], // get value from other components, get from LoginView.vue:5
    methods:{
        callMain() {
            EventBus.$emit('CallAlertMain') // รับฟังก์ชัน callAlert มาจาก LoginView.vue ผ่าน EventBus
        }
    }
};
</script>

<style>
</style>