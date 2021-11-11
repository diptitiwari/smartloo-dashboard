<template>
  <div>
    <b-row>
      <b-col>
        <div class="p-0 mt-3 ml-3">
          <img
            src="@/assets/logo.png"
            width="75.6px"
            height="80.9px" >
        </div>
      </b-col>
    </b-row>
    <div class="container">
      <div class="login-form">
        <form @submit.prevent="login">
          <h2 class="text-center mt-3">Signin to continue to Dashboard</h2>
          <b-form-group
            id="input-group-2"
            label="User Name"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="identification"
              type="text"
              name="username"
              placeholder="Enter email either mobile no"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('username') }}</span>
          </b-form-group>
          <div class="form-group">
            <button class="btn btn-primary btn-lg btn-block">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Login",
  data() {
    return {
      signinType: "email",
      identification: null,
      errorMsg: ""
    };
  },
  methods: {
    login() {
      this.$validator.validate().then((valid) => {
        if (!valid) {
          console.log("invalid");
        } else {
          return Vue.$http
            .get(`auth/otp?identification=${this.identification}`)
            .then((response) => {
              this.$store.dispatch("auth/login", this.identification);
            })
            .catch((error) => {
              const res = error.response.data;
              this.$notify({
                group: "alert",
                type: "error",
                text: res.error,
                width: 400
              });
              this.errorMsg = res.status === 500 ? res.error : res.message;
            });
        }
      });
    },

    switchTo(method) {
      this.identification = null;
      this.signinType = method;
    }
  }
};
</script>

<style scoped>
.form-control,
.btn {
  border-radius: 2px;
}

.login-form {
  width: 350px;
  margin: 0 auto;
  padding: 55px 0 30px;
}

.login-form form {
  color: #fff;
  border-radius: 2px;
  margin-bottom: 15px;
  font-size: 13px;
  background: #42484c;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
  position: relative;
}

.login-form h2 {
  font-size: 22px;
  margin: 35px 0 25px;
}

.login-form input[type="checkbox"] {
  margin-top: 2px;
}

.login-form .btn {
  font-size: 16px;
  font-weight: bold;
  background: #083f80;
  border: none;
  margin-bottom: 20px;
  color: #fff;
  border-radius: 20px;
}

i {
  font-size: 100px;
  color: #fff;
}
@media (max-width: 450px) {
  .login-form {
    width: 100%;
  }
}
</style>
