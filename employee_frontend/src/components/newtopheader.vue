<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar variant="faded" type="dark">
        <b-navbar-brand href="/">
          <img
            src="../../images/logo2.png"
            contain
            class="d-inline-block align-top"
            height="50px"
            width="auto"
            alt="logo"
          />
        </b-navbar-brand>
      </b-navbar>

      <b-navbar-brand href="#">Employee Portal</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/" size="md">User Name</b-nav-item>
          <b-button
            pill
            varient="outline-secondary"
            size="md"
            class="my-2 my-sm-0"
            type="submit"
            v-on:click="logout"
            >Logout</b-button
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
      if(localStorage.token){
        delete localStorage.token;
        delete localStorage.uid;
        this.$router.replace("/");
      }
    }
  },
};
</script>

<style lang="scss" scoped>
#nav a.router-link-exact-active {
  color: white;
}
.bg-info {
  background-color: #298eb6 !important;
}
</style>