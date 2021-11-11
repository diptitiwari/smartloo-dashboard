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
        <form @submit.prevent="verify">
          <h2 class="text-center mt-3">Verification Code</h2>
          <b-form-group
            id="input-group-2"
            class="mt-4"
            label="Enter the 6 digit code sent to your phone"
            label-for="input-2"
          >
            <b-form-input
              v-validate="'required'"
              v-model="otps"
              type="number"
              name="otp"
              placeholder="Enter the 6 digit code"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('otps') }}</span>
          </b-form-group>
          <div class="form-group mt-2">
            <b-row>
              <b-col md="6">
                <button
                  class="btn btn-primary btn-lg btn-block"
                  @click="back">Back</button>
              </b-col>
              <b-col md="6">
                <button
                  class="btn btn-primary btn-lg btn-block"
                  @click="verify">Next</button>
              </b-col>
            </b-row>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "Verify",
  data() {
    return {
      otps: null,
      error: false,
      identification: null,
      errorMsg: null
    };
  },
  mounted() {
    this.identification = this.$store.state.auth.identification;
    if (!this.identification) {
      Vue.router.push({
        name: "login.index"
      });
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },

    async verify() {
      try {
        const response = await Vue.$http.get(`auth/token?identification=${this.identification}&otp=${this.otps}`);
        console.log(response);
        const { access_token } = response.data;
        this.$store.dispatch("auth/verify", response.data);
      } catch (error) {
        const res = error.response.data;
        this.$notify({
          group: "alert",
          type: "error",
          text: res.message,
          width: 400
        });
        this.errorMsg = res.status === 500 ? res.error : res.message;
      }
    },

    resendOTP() {
      this.errorMsg = null;
      this.error = false;
      Vue.$http
        .get(`auth/otp?identification=${this.identification}`)
        .then((response) => {
          // this.$store.dispatch('auth/login', this.identification);
        })
        .catch((error) => {
          const res = error.response.data;
          this.errorMsg = res.status === 500 ? res.error : res.message;
        });
    },

    autoFocusInputField(event) {
      const charCode = event.which ? event.which : event.keyCode;
      const { value } = event.target;
      const prevElement = event.srcElement.previousElementSibling;
      const nextElement = event.srcElement.nextElementSibling;
      let element = null;
      event.target.value = null;
      element = nextElement;
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
    width: 100% !important;
  }
}
</style>
