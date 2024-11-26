<template>
  <div class="container">
    <v-card class="app-card" color="blue-grey lighten-2">
      <v-card-title>
        <h2>คำนวณเกรด</h2>
      </v-card-title>
      <v-text-field name="score" label="กรอกคะแนน" id="score" v-model="score"></v-text-field>
      <div>
        <v-btn color="success" @click="GradeCalculator()">ตัดเกรด</v-btn>
      </div>
      <v-card-text>
        <h1>{{ grade }}</h1>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      score: null,
      grade: "",
    };
  },
  methods: {
    GradeCalculator() {
      if (this.score > 100 || this.score < 0)
        alert("คะแนนห้ามต่ำกว่า 0 หรือมากกว่า 100");
      else if (this.score == null) alert("กรุณากรอกคะแนน");
      else if (this.score >= 80) this.grade = "A";
      else if (this.score >= 70) this.grade = "B";
      else if (this.score >= 60) this.grade = "C";
      else if (this.score >= 50) this.grade = "D";
      else if (this.score >= 0) this.grade = "F";
      else alert("รับค่าเฉพาะตัวเลข");
    },
  },
};
</script>

<style>
.app-card {
  width: 300px;
  height: 300px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  justify-items: center;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
h1 {
  text-align: center;
  font-weight: bold;
  font-family: monospace;
}
</style>