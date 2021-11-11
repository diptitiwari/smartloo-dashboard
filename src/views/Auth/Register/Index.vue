<template>
  <v-layout>
    <div class="row justify-content-center">
      <span class="title">Welcome back</span>
      <span class="comment">Fill out the form to get started.</span>
      <v-modal :padding="'60px 0 30px 0'">
        <div>
          <div>
            <form @submit="register">
              <div class="form-group">
                <div class="input-group">
                  <p>First Name</p>
                  <input
                    v-model="user.firstName"
                    type="text"
                    placeholder="First name"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <p>Last Name</p>
                  <input
                    v-model="user.lastName"
                    type="text"
                    placeholder="Last name"
                    class="form-control"
                  >
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <p>Email</p>
                  <input
                    v-model="user.email"
                    type="email"
                    placeholder="Email"
                    class="form-control" >
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <p>Phone Number</p>
                  <vue-tel-input
                    v-model="user.phone"
                    :enabled-country-code="true"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-4">
                  <v-btn-normal
                    :on-click="register"
                    :type="'btn-blue'">Get started</v-btn-normal>
                </div>
                <div class="col-md-8 text-right">
                  <span class="login">
                    <span>Already have an account?</span>
                    <router-link :to="{ name: 'login.index' }">Login</router-link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </v-modal>
    </div>
  </v-layout>
</template>

<script>
/* ============
 * Register Index Page
 * ============
 *
 * Page where the user can register.
 */

import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import VModal from "@/components/modals/Modal.vue";
import { register } from "@/services/register.js";

export default {
  /**
   * The name of the page.
   */
  name: "RegisterIndex",

  /**
   * The components the page can use.
   */
  components: {
    VLayout,
    VBtnNormal,
    VModal
  },

  /**
   * The data that can be used by the page.
   *
   * @returns {Object} The view-model data.
   */
  data() {
    return {
      user: {
        firstName: null,
        lastName: null,
        email: null,
        phone: null
      }
    };
  },

  /**
   * The methods the page can use.
   */
  methods: {
    /**
     * Will register the user.
     *
     * @param {Object} user The user to be registered.
     */

    async register() {
      const data = await register(this.user);
      console.log(this.user);
      // this.$store.dispatch('auth/register', this.user);
    }
  }
};
</script>

<style scoped>
</style>
