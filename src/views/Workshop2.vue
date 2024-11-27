<template>
  <div class="container">
    <v-card class="app-card">
      <v-card-title class="justify-center">
        <h2 class="text-h4 gradient-text" dark>คำนวณเกรด</h2>
      </v-card-title>
      <v-text-field
        name="score"
        label="กรอกคะแนน"
        id="score"
        v-model="score"
        outlined
        class="score-input"
      ></v-text-field>
      <div class="text-center">
        <v-btn color="#7E57C2" @click="GradeCalculator()">ตัดเกรด</v-btn>
      </div>
      <v-card-text>
        <div class="grade-container" v-if="grade">
          <div class="grade-circle" :class="gradeColor">
            <span class="grade-text">{{ grade }}</span>
          </div>
          <div class="grade-label">{{ gradeMessage }}</div>
        </div>
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
  computed: {
    gradeColor() {
      const colors = {
        'A': 'grade-a',
        'B': 'grade-b',
        'C': 'grade-c',
        'D': 'grade-d',
        'F': 'grade-f'
      };
      return colors[this.grade] || '';
    },
    gradeMessage() {
      const messages = {
        'A': 'ยอดเยี่ยม!',
        'B': 'ดีมาก!',
        'C': 'ดี',
        'D': 'ผ่าน',
        'F': 'ต้องปรับปรุง'
      };
      return messages[this.grade] || '';
    }
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
.grade-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

.grade-circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  animation: popIn 0.5s ease-out;
}

.grade-text {
  font-size: 3em;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.grade-label {
  font-size: 1.2em;
  font-weight: 500;
  margin-top: 10px;
  animation: fadeIn 0.5s ease-out;
}

.grade-a {
  background: linear-gradient(45deg, #4CAF50, #8BC34A);
  box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
}

.grade-b {
  background: linear-gradient(45deg, #2196F3, #03A9F4);
  box-shadow: 0 0 20px rgba(33, 150, 243, 0.4);
}

.grade-c {
  background: linear-gradient(45deg, #FFC107, #FFE082);
  box-shadow: 0 0 20px rgba(255, 193, 7, 0.4);
}

.grade-d {
  background: linear-gradient(45deg, #FF9800, #FFB74D);
  box-shadow: 0 0 20px rgba(255, 152, 0, 0.4);
}

.grade-f {
  background: linear-gradient(45deg, #f44336, #ef5350);
  box-shadow: 0 0 20px rgba(244, 67, 54, 0.4);
}

@keyframes popIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  80% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.app-card {
  width: 300px;
  height: 400px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
}
</style>
