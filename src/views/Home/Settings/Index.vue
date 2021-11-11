<template>
  <v-layout>
    <div class="row justify-content-center settings">
      <span class="title">Settings</span>
      <v-modal :padding="'60px 0 30px 0'">
        <div>
          <div>
            <form @submit.prevent="saveSettings()">
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
              <div class="form-group row justify-content-center">
                <div class="col-md-4">
                  <v-btn-normal
                    :on-click="saveSettings"
                    :type="'btn-blue'"
                    :width="'150px'">Save</v-btn-normal>
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
 * Settings Index Page
 * ============
 */

import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import VModal from "@/components/modals/Modal.vue";

export default {
  /**
   * The name of the page.
   */
  name: "SettingsIndex",

  /**
   * The components the page can use.
   */
  components: {
    "v-layout": VLayout,
    "v-btn-normal": VBtnNormal,
    "v-modal": VModal
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
        email: null
      }
    };
  },

  /**
   * The methods the page can use.
   */
  methods: {
    saveSettings() {
      this.$store.dispatch("account/update", this.user);
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 22px;
}

.settings {
  padding-top: calc(20vh - 100px) !important;
}
</style>
