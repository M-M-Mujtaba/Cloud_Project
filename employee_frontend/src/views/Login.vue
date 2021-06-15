<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        v-model="email"
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        v-model="password"
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        required
      />
      <button class="btn btn-lg btn-primary btn-block" type="submit">
        Sign in
      </button>
    </form>
  </div>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8000/login", { email: this.email, password: this.password })
        .then((response) => this.loginSuccessful(response))
        .catch(() => this.loginFailed());
      //this.loginSuccessful(response)
    },

    loginSuccessful(req) {
      if (!req.data.token) {
        this.loginFailed();
        return;
      }

      localStorage.token = req.data.token;
      localStorage.uid = req.data.user.ID;
      localStorage.type = req.data.user.EmployeeType;
      localStorage.ismarked = 0;
      if(req.data.user.EmployeeType === "Salaried"){
        //console.log("Message:Checkingtype");
        localStorage.type = 0;
      }
      else{
        localStorage.type = 1;
      }
      console.log(localStorage.type);
      
      this.error = false;

      this.$router.replace("/Home");
    },

    loginFailed() {
      this.error = "Login failed!";
      delete localStorage.token;
    },
  },

  created(){
    if(localStorage.token){
      this.$router.replace("/Home");
    }
  }
};
</script>

<style lang="css">
body {
  background: #f8f4ef;
}

.login-wrapper {
  background: #fff;
  width: 70%;
  margin: 12% auto;
}

.form-signin {
  max-width: 330px;
  padding: 10% 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
