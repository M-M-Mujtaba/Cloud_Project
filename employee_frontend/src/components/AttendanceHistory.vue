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

      // fields: [
      //   {
      //     key: "Date",
      //     label: "_Date",
      //   },
      //   {
      //     key: "Checkin Time",
      //     label: "Time",
      //   },
      //   {
      //     key: "Presence",
      //     label: "Status",
      //   },
      // ],
    };
  },

  created() {
    console.log("INside attendance history");
    var id = localStorage.username;
    console.log(id);
    axios
      .get(`http://khdd.codes:30008/attendance/${id}`)
      .then(
        (response) => {
          console.log(response.data.results);
          this.items = response.data.results;
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