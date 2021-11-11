<template>
  <v-layout>
    <div class="row justify-content-center">
      <span class="title">Verification Code</span>
      <span class="comment">Sent to {{ identification }}</span>
      <v-modal
        :padding="'30px 0 34px 0'"
        style="margin-top: 20px">
        <div>
          <v-btn-circle :on-click="back">
            <img
              src="../../../assets/icons/arrow_right_white.png"
              width="18"
              style="margin-top: -2px"
            >
          </v-btn-circle>
          <div
            v-if="errorMsg"
            class="col-md-12 mt-3">
            <div
              class="alert alert-danger"
              role="alert">{{ errorMsg }}</div>
          </div>
          <div class="msg-label">
            <p :class="{'error': error}">Enter the 6 digit code sent to your phone</p>
          </div>
          <div class="text-center">
            <form
              id="promo-form"
              @submit.prevent="verify">
              <div class="input-group verify-code-input">
                <template v-for="(item, index) in otps">
                  <input
                    :key="index"
                    v-model="otps[index]"
                    type="text"
                    class="form-control"
                    maxlength="1"
                    required
                    @keyup="autoFocusInputField"
                  >
                </template>
              </div>
            </form>
            <div class="col-md-12 row justify-content-center">
              <v-btn-normal
                :on-click="verify"
                :type="'btn-blue'"
                :width="'150px'"
                style="margin-bottom: 54px"
              >Next</v-btn-normal>
            </div>
            <div class="col-md-12 text-center">
              <span>
                <span>I have a problem.</span>
                <a
                  class="resend"
                  @click="resendOTP">Resend OTP</a>
              </span>
            </div>
          </div>
        </div>
      </v-modal>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Veirfy Index Page
 * ============
 *
 * Page where the user can verify phone number.
 */

import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import VBtnCircle from "@/components/buttons/BtnCircle.vue";
import VModal from "@/components/modals/Modal.vue";
import Vue from "vue";

export default {
  /**
   * The name of the page.
   */
  name: "VerifyIndex",

  /**
   * The components the page can use.
   */
  components: {
    "v-layout": VLayout,
    "v-btn-normal": VBtnNormal,
    "v-modal": VModal,
    "v-btn-circle": VBtnCircle
  },

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      otps: [null, null, null, null, null, null],
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
  /**
   * The methods the page can use.
   */
  methods: {
    back() {
      this.$router.go(-1);
    },

    verify() {
      if (this.otps.filter(otp => otp === null).length > 0) {
        this.error = true;
      } else {
        let otp = "";
        this.otps.forEach((element) => {
          otp += element;
        });
        return Vue.$http
          .get(`auth/token?identification=${this.identification}&otp=${otp}`)
          .then((response) => {
            console.log("verify data : ", response.data);
            const { access_token } = response.data;
            this.$store.dispatch("auth/verify", response.data);
          })
          .catch((error) => {
            const res = error.response.data;
            this.errorMsg = res.status === 500 ? res.error : res.message;
          });
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
      console.log(charCode);
      switch (charCode) {
        case 8: // backsapce
          event.target.value = value;
          element = prevElement;
          if (element) {
            element.focus();
          }
          return;
        case 9: // tab
          break;
        case 37: // left arrow
          event.target.value = value;
          element = prevElement;
          break;
        case 39: // right arrow
          event.target.value = value;
          element = nextElement;
          if (element != null) {
            element.setSelectionRange(0, 0);
            element.focus();
          } else {
            event.target.setSelectionRange(0, 0);
            event.target.focus();
          }
          break;
        default:
          console.log(charCode);
          if (charCode >= 48 && charCode <= 57) {
            // in case of number
            event.target.value = charCode - 48;
            element = nextElement;
          }
      }
      if (element != null) {
        element.setSelectionRange(0, 0);
        element.focus();
      }
      // if (this.otpForm.valid && charCode >= 48 && charCode <= 57) {
      // 	this.verifyPhone();
      // }
    }
  }
};
</script>
<style scoped>
.msg-label p {
  font-size: 15px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #263035;
  margin: 0 auto 0px auto;
}

.custom-modal .input-group {
  display: inline-block;
}

.custom-modal .input-group input {
  display: inline-block;
  width: 56px;
  height: 56px;
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgba(156, 156, 156, 0.16);
  background-color: #ffffff;
  margin: 0px 5px;
}

.custom-modal input {
  font-size: 24px !important;
}

#promo-form {
  margin: 30px 0px;
}

.error {
  color: red !important;
  font-weight: bold;
}

.resend {
  color: #007bff !important;
  cursor: pointer;
}

.resend:hover {
  text-decoration: underline !important;
}
</style>
