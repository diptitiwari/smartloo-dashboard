<template>
  <v-layout
    :hide-footer="true"
    :back-white="true">
    <div class="col-md-12 main-content">
      <div class="bg-white pl-3 pr-3 pt-3 mb-4">
        <div class="row">
          <div class="col-md-6">
            <b-form-group
              id="fieldset-1"
              label="Site Name"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="siteInfo.name"
                disabled
                trim/>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Address"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="siteInfo.address"
                disabled
                trim/>
            </b-form-group>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="City"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.city"
                    disabled
                    trim/>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="Site Type"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.site_type"
                    disabled
                    trim/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="Latitude"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.latitude"
                    disabled
                    trim/>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="Longitude"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.longitude"
                    disabled
                    trim/>
                </b-form-group>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="wifi Password"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.wifi_pwd"
                    disabled
                    trim/>
                </b-form-group>
              </div>
              <div class="col-md-6">
                <b-form-group
                  id="fieldset-1"
                  label="Wifi SSID"
                  label-for="input-1">
                  <b-form-input
                    id="input-1"
                    v-model="siteInfo.wifi_ssid"
                    disabled
                    trim/>
                </b-form-group>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <b-form-group
              id="fieldset-1"
              label="Usage Current Day"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="siteSummary.usage.current_day"
                disabled
                trim/>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Usage Current Week"
              label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="siteSummary.usage.current_week"
                disabled
                trim/>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Electricity"
              label-for="input-1">
              <b-form-input
                id="input-1"
                :value="siteSummary.electricity.status ? 'On' : 'Off'"
                disabled
                trim
              />
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Water Level"
              label-for="input-1">
              <b-progress
                :value="siteSummary.water.value"
                :max="max"
                show-progress
                animated/>
            </b-form-group>
            <b-form-group
              id="fieldset-1"
              label="Rating Avg 30 Days"
              label-for="input-1">
              <star-rating
                :rating="siteSummary.rating.avg_30days"
                read-only/>
            </b-form-group>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <b-card no-body>
              <b-tabs
                v-model="tabIndex"
                card
                content-class="mt-3">
                <!-- New Tab Button (Using tabs-end slot) -->
                <template v-slot:tabs-end>
                  <b-nav-item
                    v-b-popover.hover.top="'Register Section'"
                    href="#"
                    @click.prevent="registerSection"
                  >
                    <b>+</b>
                  </b-nav-item>
                </template>
                <!-- Render this if no tabs -->

                <template v-slot:empty>
                  <div class="text-center text-muted">
                    There are no open tabs
                    <br>Open a new tab using the
                    <b>+</b>button above.
                  </div>
                </template>
                <b-tab
                  v-for="(section, idx) in sections"
                  :title="section.site_subtype"
                  :key="idx"
                  no-body
                >
                  <Sensor
                    v-for="(sensor, sIdx) in section.sensors"
                    :key="sIdx"
                    :id="sensor.id"
                    :mac_id="sensor.mac_id"
                    :sensor_type="sensor.sensor_type"
                    :status="sensor.status"
                    :wifi_pwd="sensor.wifi_pwd"
                    class="pl-3 mr-3"
                    @remove-sensor="removeSensor"
                  />
                  <b-card-footer>
                    <div class="row mb-2">
                      <div class="col-md-6"/>
                      <div
                        class="col-md-4"
                        align="right">
                        <v-btn-normal
                          :params="section.id"
                          :on-click="removeSection"
                          height="35px"
                        >Remove Section</v-btn-normal>
                      </div>
                      <div
                        class="col-md-2"
                        align="right">
                        <v-btn-normal
                          :on-click="openSensorModal"
                          height="35px">Register Sensor</v-btn-normal>
                      </div>
                    </div>
                  </b-card-footer>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
        </div>
        <register-sensor
          :form-data="sensorForm"
          :section="sections[tabIndex].id"
          :generate="generate"
          @register="registerSensor"
        />
        <section-register @register="createSection"/>
        <delete-section
          @cancelRemove="cancelRemove"
          @deleteSection="deleteSection"/>
      </div>
    </div>
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
import BarChart from "@/components/charts/Bar.vue";
import Sensor from "../components/Sensor.vue";
import RegisterSensor from "../components/Register.vue";
import SectionRegister from "../components/SectionRegister.vue";
import DeleteSection from "../components/DeleteSection.vue";
import StarRating from "vue-star-rating";
import {
  registerSensor as registerSensorService,
  registerSection as registerSectionService
} from "@/services/register";
import Vue from "vue";

export default {
  /**
   * The name of the page.
   */
  name: "ChartViewIndex",

  components: {
    "v-btn-normal": VBtnNormal,
    VLayout,
    VModal,
    JqxComboBox,
    BarChart,
    Sensor,
    RegisterSensor,
    SectionRegister,
    DeleteSection,
    StarRating
  },

  /**
   * The components that the page can use.
   */
  data() {
    return {
      max: 100,
      siteSummary: {
        usage: {
          current_day: 0,
          current_week: 0
        },
        water: {
          value: 0
        },
        electricity: {
          status: true
        },
        rating: {
          avg_30days: 5
        }
      },
      siteInfo: {
        name: ""
      },
      sensorModal: false,
      tabIndex: 0,
      labels: ["Raju Khunt", "Bhargav", "EB", "Trigital"],
      datasets: [
        {
          label: "GitHub Commits",
          backgroundColor: "#50E3C2",
          data: [40, 20, 12, 39]
        },
        {
          label: "BitBucket Commits",
          backgroundColor: "#F5A623",
          data: [10, 40, 39, 80]
        },
        {
          label: "GitLab Commits",
          backgroundColor: "#03BD5B",
          data: [40, 20, 12, 11]
        }
      ],
      sensorForm: {
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

      section: null,
      id: null
    };
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchSection();
    this.getsummary();
  },

  methods: {
    async getsummary() {
      try {
        const result = await Vue.$http.get(`sites/data/summary?site_id=${this.id}`);
        this.siteSummary = result.data;
      } catch (error) {
        const res = error.response.data;
        this.$notify({
          group: "alert",
          type: "error",
          text: res.error,
          width: 400
        });
      }
    },
    removeSensor(payload) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then((result) => {
          if (result.value) {
            Vue.$http
              .delete(`sensors?sensor_id=${payload.id}`)
              .then((response) => {
                const res = response.data;
                this.$notify({
                  group: "alert",
                  type: "success",
                  text: "Sensor has been successfully removed",
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
          }
        });
    },

    registerSection() {
      this.$modal.show("section-modal");
    },

    async createSection(item) {
      const obj = {
        site_id: this.id,
        section: {
          site_type: "section",
          site_subtype: item
        }
      };
      try {
        const result = await registerSectionService(obj);
        this.$notify({
          group: "alert",
          type: "success",
          text: "Section has been successfully registered",
          width: 400
        });
        this.fetchSection();
        this.$modal.hide("section-modal");
      } catch (error) {
        this.$notify({
          group: "alert",
          type: "error",
          text: error.error,
          width: 400
        });
      }
    },

    openSensorModal() {
      this.$modal.show("sensor-modal");
    },

    async registerSensor(id) {
      try {
        this.selectedSectionId = id;

        const mac_id_data = await Vue.$http.get(`sensors/?mac_id=${this.sensorForm.macId}`);

        if (mac_id_data.status == 204) {
          this.registerSensorAPI(id);
        } else {
          this.$swal.fire({
            title: "Are you sure?",
            text: "MAC_ID Already Exists!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Anyway Register!"
          }).then((result) => {
            if (result.value) {
              this.registerSensorAPI(id);
            }
          });
        }
      } catch (err) {

      }
    },

    async registerSensorAPI(id) {
      try {
        const { sensorType } = this.sensorForm;

        if (!sensorType) {
          this.sensorForm.sensorType = "water_level";
        }

        const result = await registerSensorService({
          sensor: {
            sensor_type: this.sensorForm.sensorType,
            mac_id: this.sensorForm.macId,
            wifi_pwd: this.sensorForm.wifiPassword,
            site_id: id
          }
        });
        this.$notify({
          group: "alert",
          type: "success",
          text: "Sensor has been successfully registered",
          width: 400
        });
        this.fetchSection();
        this.$modal.hide("sensor-modal");
      } catch (error) {
        this.$notify({
          group: "alert",
          type: "error",
          text: "Something went wrong",
          width: 400
        });
      }
    },
    removeSection(id) {
      this.selectedSectionId = id;
      this.$modal.show("delete-section-modal");
    },

    cancelRemove() {
      this.$modal.hide("delete-section-modal");
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
      this.$modal.hide("delete-section-modal");
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
            .then(() => {
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
          this.sensorForm.wifiPassword = res.password;
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
          this.siteInfo = res.site;
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
.active {
  background-color: #fff !important;
}
.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #264eee !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}
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

@media only screen and (min-width: 768px) {
  .site-chart {
    max-height: 280px;
  }
}
</style>
