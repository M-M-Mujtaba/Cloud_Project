<template>
  <div>
  <top-header></top-header>
  <b-container>
    <b-row align-v="center">
      <!-- <task-card></task-card>     -->
      <b-col nd="3">
        <b-card
          title="Mark Attendance"
          img-src="../../images/markattendance1.png"
          img-alt="Job Info"
          img-top
          tag="article"
          style="max-width: 30res"
          class="mb-2"
          :key="Marked"
        >
          <!-- <b-card-text>Mark your attendance on daily basis.</b-card-text>  -->
          <b-button
            block
            v-if="Marked === false"
            v-on:click="markAttendance"
            class="btn btn-warning"
            >Un-Marked</b-button
          >

          <b-button block v-else-if="Marked === true" class="btn btn-success"
            >Marked</b-button
          >
        </b-card>
      </b-col>
      <b-col nd="3">
        <!-- in case of salaired employee condition will be changed accordingly and this card will not 
        be visible to salaried employee -->
        <b-card
          title="Available Deliveries"
          img-src="../../images/deliveryimage.webp"
          img-alt="Job Info"
          img-top
          tag="article"
          style="max-width: 20res"
          class="mb-2"
          v-if="emptype == 0"
        >
          <b-card-text
            >Choose any delivery location available in the list</b-card-text
          >
          <b-button varient="primary" to="Jobs">Deliveries</b-button>
        </b-card>
      </b-col>
      <b-col nd="3">
        <b-card
          title="Attendance History"
          img-src="../../images/history2.png"
          img-alt="Job Info"
          img-top
          tag="article"
          style="max-width: 20res"
          class="mb-2"
        >
          <b-card-text>Check your previous attendance records.</b-card-text>
          <b-button varient="primary" to="AttendanceHistory"
            >Attendance Records</b-button
          >
        </b-card>
      </b-col>
    </b-row>
  </b-container>
  </div>
</template>

<script>
import topheaderVue from '../components/topheader.vue';
const axios = require("axios").default;
// @ is an alias to /src
// import taskCard from "@/components/taskCard.vue";

export default {
  name: "Home",

  components: {
    'top-header': topheaderVue
    // "task-card": taskCard
  },
  data() {
    return {
      emptype: localStorage.type,
      Marked: false,
    };
  },
  methods: {
    markAttendance() {
      localStorage.ismarked = 2;
      var now = new Date();
      var date =
        now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
      var timestamp =
        now.getHours() +
        ":" +
        (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
        ":" +
        (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());

      console.log(date);
      console.log(localStorage.uid);
      console.log(timestamp)
      axios
        .put("http://khdd.codes:30008/mark_attendance", {
          username: localStorage.username
          //time: timestamp,
          //Date: date,
        })
        .then((response) => {
          this.Marked = true;
          console.log(this.Marked);
          console.log(response);
        })
        .catch((error) => console.log(error));
    },

    getattendance() {
      console.log("INSIDE GET ATTENDENCE");
      // var now = new Date();
      // var date1 =
      //   now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
      // var timestamp1 =
      //   now.getHours() +
      //   ":" +
      //   (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
      //   ":" +
      //   (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
      // console.log(date1);
      // console.log(timestamp1);
      axios
        .get("http://khdd.codes:30008/start_day")
        .then((response) => {
          console.log(this.Marked);
          console.log("INSIDE GET ATTENDANCE THEN");
          console.log(response);
        })
        .catch((error) => console.log(error));
    },
    checkAttendance() {
      console.log("INSIDE CHECK ATTENDANCE FUNCTION");
      console.log(localStorage.ismarked);
      if (localStorage.ismarked == 2) {
        console.log("mark attendance");
        this.Marked = true;
      } else if (localStorage.ismarked == 0) {
        console.log("inserting employee");
        this.getattendance();
        localStorage.ismarked = 1;
        this.Marked = false;
      }
    },
  },

  created() {
    console.log("inside created ");
    console.log(localStorage.ismarked);
    this.checkAttendance();
  },
};
</script>

<style lang="scss" scoped>
</style>
