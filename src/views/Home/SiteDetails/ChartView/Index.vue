<template>
  <v-layout
    :hide-footer="true"
    :back-white="true">
    <div class="col-md-12 main-content">
      <div class="col-md-12 text-right">
        <v-btn-normal
          :on-click="registerSection"
          :type="['btn-green', 'd-inline-block']"
          :width="'160px'"
          :height="'50px'">Register Section
        </v-btn-normal>
      </div>
      <template v-for="(section, idx) in sections">
        <div
          :key="idx"
          class="details-group">
          <div class="chart"/>
          <div class="sensor">
            <div class="col-md-12 text-center">
              <template v-if="section.site_subtype === 'female'">
                <img src="../../../../assets/icons/female.png">
              </template>
              <template v-else>
                <img src="../../../../assets/icons/male.png">
              </template>
            </div>
            <div class="col-md-12 text-center text-uppercase summary">{{ section.site_subtype }} Section Summary</div>
            <div class="col-md-12 d-flex buttons">
              <div class="col-md-6">
                <v-btn-normal
                  :on-click="registerSensor"
                  :params="section.id"
                  :type="'btn-green'"
                  :width="'100%'"
                  :height="'50px'">Register Sensor
                </v-btn-normal>
              </div>
              <div class="col-md-6">
                <v-btn-normal
                  :on-click="removeSection"
                  :params="section.id"
                  :type="'btn-red'"
                  :width="'100%'"
                  :height="'50px'">Remove Section
                </v-btn-normal>
              </div>
            </div>
            <div class="col-md-12 d-flex sensor-status">
              <div class="col-md-8">
                <img src="../../../../assets/icons/brightness.png">
                <span>Active sensors : </span>
                <span class="sensor-cnt">{{ section.sensors.length }}</span>
              </div>
              <div class="col-md-4 text-right align-self-center">
                <span class="circle active d-inline-block"/>
              </div>
            </div>
            <div class="col-md-12 d-flex sensor-status">
              <div class="col-md-8">
                <img src="../../../../assets/icons/brightness.png">
                <span>Inative sensors : </span>
                <span class="sensor-cnt">{{ section.sensors.length }}</span>
              </div>
              <div class="col-md-4 text-right align-self-center">
                <span class="circle d-inline-block"/>
              </div>
            </div>
            <div class="col-md-12 text-center see-more">
              <router-link :to="{ name: 'site-details.list-view' }">SEE MORE</router-link>
            </div>
          </div>
        </div>
      </template>
    </div>
    <modal
      name="alert-modal"
      width="400"
      height="180">
      <div class="modal-inside alert-modal">
        <div class="col-md-12 text-center msg">
          Are you sure you want to delete?
        </div>
        <div class="col-md-12 d-flex">
          <div class="col-md-6">
            <v-btn-normal
              :on-click="cancelRemove"
              :width="'100%'"
              :height="'45px'">
              Cancel
            </v-btn-normal>
          </div>
          <div class="col-md-6">
            <v-btn-normal
              :on-click="deleteSection"
              :type="'btn-red'"
              :width="'100%'"
              :height="'45px'">
              Delete
            </v-btn-normal>
          </div>
        </div>
      </div>
    </modal>
    <modal
      name="registration-modal"
      width="570"
      height="555">
      <div class="modal-inside custom-modal">
        <div class="col-md-12 text-center text-uppercase mb-4">
          <h5>Sensor Registration</h5>
        </div>
        <form @submit="submit">
          <div class="form-group mb-5">
            <div class="input-group">
              <p>Sensor Type</p>
              <JqxComboBox
                v-model="formData.sensorType"
                :width="'100%'"
                :height="50"
                :source="source"
                :selected-index="0"
              />
            </div>
          </div>
          <div class="form-group mb-3">
            <div class="input-group">
              <p>Mac id</p>
              <input
                v-validate="'required'"
                v-model="formData.macId"
                class="form-control"
                type="text"
                name="mac-id"
              >
              <span class="error-msg">{{ errors.first('mac-id') }}</span>
            </div>
          </div>
          <div class="form-group mb-3">
            <div class="input-group">
              <p>Wifi Password</p>
              <div class="col-md-12 d-flex pl-0 pr-0">
                <div class="col-md-8 pl-0">
                  <input
                    v-validate="'required'"
                    v-model="formData.wifiPassword"
                    class="form-control"
                    type="text"
                    name="wifi-password"
                  >
                  <span class="error-msg">{{ errors.first('wifi-password') }}</span>
                </div>
                <div class="col-md-4 pr-0">
                  <v-btn-normal
                    :on-click="generate"
                    :type="'btn-green'"
                    :width="'100%'"
                    :height="'50px'">
                    Generate
                  </v-btn-normal>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row justify-content-center mt-2">
            <div class="col-md-6">
              <v-btn-normal
                :on-click="submit"
                :width="'100%'"
                :height="'55px'">
                Submit
              </v-btn-normal>
            </div>
          </div>
        </form>
      </div>
    </modal>
    <modal
      name="section-modal"
      width="570"
      height="300">
      <div class="modal-inside custom-modal">
        <div class="col-md-12 text-center text-uppercase mb-4">
          <h5>Section Registration</h5>
        </div>
        <form @submit="submit">
          <div class="form-group">
            <div class="input-group">
              <p>Section Type</p>
              <JqxComboBox
                v-model="section"
                :width="'100%'"
                :height="50"
                :source="sectionTypes"
                :selected-index="0"
              />
            </div>
          </div>
          <div class="form-group row justify-content-center">
            <div class="col-md-6">
              <v-btn-normal
                :on-click="createSection"
                :width="'100%'"
                :height="'55px'">
                Submit
              </v-btn-normal>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </v-layout>
</template>

<script>
/* ============
 * ChartView Page
 * ============
 *
 * The ChartView index page.
 */

import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import VModal from "vue-js-modal";
import Vue from "vue";

export default {
  /**
   * The name of the page.
   */
  name: "ChartViewIndex",

  components: {
    VLayout,
    VModal,
    JqxComboBox,
    "v-btn-normal": VBtnNormal
  },

  /**
   * The components that the page can use.
   */
  data() {
    return {
      formData: {
        sensorType: null,
        macId: null,
        wifiPassword: null
      },
      source: [
        "water_level",
        "smell",
        "foot_counter",
        "loudness",
        "test",
        "light",
        "feedback"
      ],
      sections: null,
      selectedSectionId: null,
      sectionTypes: [
        "male",
        "female",
        "common",
        "outside"
      ],
      section: null,
      id: null
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchSection();
  },

  methods: {
    registerSection() {
      this.section = this.sectionTypes[0];
      this.$modal.show("section-modal");
    },

    createSection() {
      Vue.$http
        .post("sites/section", {
          site_id: this.id,
      	section: {
            site_type: "section",
            site_subtype: this.section
          }
        })
        .then((response) => {
          const res = response.data;
          this.$notify({
            group: "alert",
            type: "success",
            text: "Section has been successfully registered",
            width: 400
          });
          this.fetchSection();
          this.$modal.hide("section-modal");
        })
        .catch((error) => {
          const res = error.response.data;
          this.$notify({
            group: "alert",
            type: "error",
            text: res.error,
            width: 400
          });
        });
    },

    registerSensor(id) {
      this.selectedSectionId = id;
      this.formData = {
        sensorType: this.source[0],
        macId: null,
        wifiPassword: null
      };
      this.$modal.show("registration-modal");
    },

    removeSection(id) {
      this.selectedSectionId = id;
      this.$modal.show("alert-modal");
    },

    cancelRemove() {
      this.$modal.hide("alert-modal");
    },

    deleteSection() {
      Vue.$http
        .delete(`sites?site_id=${this.selectedSectionId}`)
        .then((response) => {
          const res = response.data;
          this.$notify({
            group: "alert",
            type: "success",
            text: "Section has been successfully removed",
            width: 400
          });
          this.fetchSection();
        })
        .catch((error) => {
          const res = error.response.data;
          this.$notify({
            group: "alert",
            type: "error",
            text: res.error,
            width: 400
          });
        });
      this.$modal.hide("alert-modal");
    },

    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log(this.formData);
          Vue.$http
            .post("sensors", {
              sensor: {
                sensor_type: this.formData.sensorType,
                mac_id: this.formData.macId,
                wifi_pwd: this.formData.wifiPassword,
                site_id: this.selectedSectionId
              }
            })
            .then((response) => {
              const res = response.data;
              this.$notify({
                group: "alert",
                type: "success",
                text: "Sensor has been successfully registered",
                width: 400
              });
              this.fetchSection();
              this.$modal.hide("registration-modal");
            })
            .catch((error) => {
              const res = error.response.data;
              this.$notify({
                group: "alert",
                type: "error",
                text: res.error,
                width: 400
              });
            });
        }
      });
    },

    generate() {
      Vue.$http
        .get("sensors/wifi/generate")
        .then((response) => {
          const res = response.data;
          this.formData.wifiPassword = res.password;
        })
        .catch((error) => {
          const res = error.response.data;
          this.$notify({
            group: "alert",
            type: "error",
            text: res.error,
            width: 400
          });
        });
    },

    fetchSection() {
      Vue.$http
        .get(`sites?site_id=${this.id}`)
        .then((response) => {
          const res = response.data;
          console.log(res.site.sections);
          this.sections = res.site.sections;
        })
        .catch((error) => {
          const res = error.response.data;
          this.$notify({
            group: "alert",
            type: "error",
            text: res.error,
            width: 400
          });
        });
    }
  }
};
</script>
<style scoped>
    .main-content {
        padding: 35px 25px 0 25px;
    }

    .details-group {
        display: inline-flex;
        width: 100%;
    }

    .chart {
        display: inline-block;
        width: calc(100% - 468px);
        height: 390px;
        background-color: #fff;
				margin: 15px;
				border-radius: 4px;
    }

    .sensor {
        display: inline-block;
        width: 408px;
        height: 390px;
        background-color: #fff;
        margin: 15px;
				padding: 45px 0 15px 0;
				border-radius: 4px;
    }

    .summary {
        font-size: 18px;
        font-weight: 500;
        color: #39475b;
        margin-top: 12.5px;
        margin-bottom: 29px;
    }

    .circle {
        width: 16px;
        height: 16px;
        background-color: #39475b;
        border-radius: 50%;
    }

    .active {
        background-color: #1ed660;
    }

    .buttons {
        margin-bottom: 34px;
    }

    .sensor-status {
        margin-bottom: 15px;
    }

    .sensor-status img {
        margin-top: -2px;
        margin-right: 20px;
    }

    .sensor-status .sensor-cnt {
        font-weight: normal !important;
        color: #8998ac !important;
    }

    .sensor-status span {
        font-weight: 500;
        color: #39475b;
    }
    .see-more {
        margin-top: 38px;
    }

    .see-more a {
        color: #39475b;
        font-size: 14px;
        font-weight: 500;
    }

    .custom-modal .input-group p {
      font-size: 15px;
      font-weight: 500;
      color: #263035;
    }
</style>
