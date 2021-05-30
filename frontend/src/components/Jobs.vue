<template>
  <div>
    <top-header></top-header>
    <h1>Deliveries</h1>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :paginate="true"
      :responsive="true"
      :lineNumbers="false"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field === 'Status'" :key="renderKey">
          <b-button
            block
            v-if="props.row.Status == 0"
            type="button"
            class="btn btn-danger"
            v-on:click="getCurrentTime(currUser, props.row['Package_ID'],props.row['Status'])"
            >Start</b-button
          >
          <b-button
            block
            v-else-if="props.row.Status == 1"
            type="button"
            class="btn btn-warning"
            v-on:click="getCurrentTime(currUser, props.row['Package_ID'],props.row['Status'])"
            >Delivering</b-button
          >
          <b-button
            block
            v-else-if="props.row.Status == 2"
            type="button"
            class="btn btn-success"
            v-on:click="getCurrentTime(14, props.row['Package_ID'],props.row['Status'])"
            >Delivered</b-button
          >
        </span>
        <span v-else> {{ props.formattedRow[props.column.field] }} </span>
      </template>
    </vue-good-table>
  </div>
</template>



<script>
import topheaderVue from '../components/topheader.vue';
const axios = require("axios").default;


export default {
  components: {
    'top-header': topheaderVue
  },
  data() {
    return {
      currUser: localStorage.uid,
      renderKey: 0,
      columns: [
        {
          label: "PackageID",
          field: "Package_ID",
          type: "number",
        },
        {
          label: "Delivery Address",
          field: "Address",
        },
        {
          label: "Status",
          field: "Status",
          type: "text",
        },
      ],
      rows: [],
    };
  },

  methods: {
    getCurrentTime: function (uid, pid,status) {
      console.log(uid);
      console.log(pid);
      var now = new Date();
      // console.log(this.rows)
      var timestamp =
        now.getHours() +
        ":" +
        (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
        ":" +
        (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds());
      
      if(status < 2){
        status += 1;
      }
      axios.post("http://localhost:8000/time", {
        contentType: "application/json",
        data: { stime: timestamp, user: uid, pkgID: pid, stat: status },
      });
      //   .then(
      //   (response) => {
      //     console.log(response);
      //   },
      //   (error) => {
      //     console.error(error);
      //   }
      // );
      this.fetchdata();
      this.renderKey++;

    },
    fetchdata: function () {
      axios.get("http://localhost:8000/Deliveries").then(
        (response) => {
          console.log(response.data.Data);
          this.rows = response.data.Data;
          // console.log(this.rows)
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },

  created() {
    this.fetchdata();
    // axios.get("http://localhost:8000/Deliveries").then(
    //   (response) => {
    //     console.log(response.data.Data);
    //     this.rows = response.data.Data;
    //     // console.log(this.rows)
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  },
};
</script>

<style>
</style>