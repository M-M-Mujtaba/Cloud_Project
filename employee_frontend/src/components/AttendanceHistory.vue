<template>
  <div>
    <top-header></top-header>
    <h1>Attendance History</h1>
    <b-table striped hover :items="items"></b-table>
  </div>
</template>

<script>
import topheaderVue from "../components/topheader.vue";
const axios = require("axios").default;

export default {
  components: {
    "top-header": topheaderVue,
  },

  data() {
    return {
      items: [],

      fields: [
        {
          key: "Date",
          label: "Date",
        },
        {
          key: "Checkin Time",
          label: "Time",
        },
        {
          key: "Presense",
          label: "Status",
        },
      ],
    };
  },

  created() {
    console.log("INside attendance history");
    var id = localStorage.uid;
    console.log(localStorage.uid);
    axios
      .post("http://localhost:8000/Attendance", { userid: id})
      .then(
        (response) => {
          console.log(response.data.Data);
          this.items = response.data.Data;
          // console.log(this.rows)
        },
        (error) => {
          console.log(error);
        }
      );
  },
};
</script>

<style>
</style>