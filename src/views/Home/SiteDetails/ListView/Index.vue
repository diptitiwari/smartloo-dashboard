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
      <template v-for="(section, i) in sections">
        <div
          :key="i"
          class="details-group mb-3">
          <div class="sensor">
            <div class="col-md-5 d-flex pl-3 pt-2 mt-1">
              <template v-if="section.site_subtype === 'female'">
                <img
                  src="../../../../assets/icons/female.png"
                  width="18.4"
                  height="24.8">
              </template>
              <template v-else>
                <img
                  src="../../../../assets/icons/male.png"
                  width="18.4"
                  height="24.8">
              </template>
              <div class="text-uppercase summary ml-3">{{ section.site_subtype }} Section</div>
            </div>
            <div class="col-md-7 text-right">
              <div class="d-flex btn-group">
                <div class="col-md-6">
                  <v-btn-normal
                    :on-click="registerSensor"
                    :params="section.id"
                    :type="'btn-green'"
                    :width="'160px'"
                    :height="'50px'">Register Sensor
                  </v-btn-normal>
                </div>
                <div class="col-md-6">
                  <v-btn-normal
                    :on-click="removeSection"
                    :params="section.id"
                    :type="'btn-red'"
                    :width="'160px'"
                    :height="'50px'">Remove Section
                  </v-btn-normal>
                </div>
              </div>
            </div>
          </div>
          <template v-for="(sensor, j) in sensors[i]">
            <div
              v-if="j >= (pages[i].currentPage * 3) && j < (pages[i].currentPage + 1) * 3"
              :key="j"
              class="sensor col-md-12">
              <span class="circle active"/>
              <div class="col-md-12 d-inline-flex pl-5 pr-0">
                <div class="col-md-3 d-flex sensor-status">
                  <div class="col-md-12 pr-0 pl-0">
                    <img src="../../../../assets/icons/brightness.png">
                    <span>Sensor type : {{ sensor.sensorType }}</span>
                  </div>

                </div>
                <div class="col-md-3 d-flex sensor-status">
                  <div class="col-md-12 pr-0 pl-0">
                    <img src="../../../../assets/icons/driving-license.png">
                    <span>Mac id : {{ sensor.macId }}</span>
                  </div>
                </div>
                <div class="col-md-6 p-0 d-inline-flex">
                  <div class="col-md-4 d-flex sensor-status">
                    <div class="col-md-12 pr-0 pl-0">
                      <img src="../../../../assets/icons/status.png">
                      <span>Status : {{ sensor.status }}</span>
                    </div>
                  </div>
                  <div class="col-md-6 d-flex sensor-status">
                    <div class="col-md-12 pr-0 pl-0">
                      <img src="../../../../assets/icons/lock.png">
                      <span class="password">Password :
                        <template v-if="sensor.show">
                          {{ sensor.wifiPassword }}
                        </template>
                        <template v-else>
                          ************
                        </template>
                      </span>
                      <img
                        src="../../../../assets/icons/view.png"
                        class="mr-0 ml-2 cursor-pointer"
                        @click="sensor.show = !sensor.show">
                    </div>
                  </div>
                  <div class="col-md-2 close-button">
                    <v-btn-normal
                      :on-click="removeSensor"
                      :params="{sectionId: i, sensorId: sensor.id}"
                      :width="'100%'"
                      :height="'48px'">
                      <img src="../../../../assets/icons/close-button.png">
                    </v-btn-normal>
                  </div>
                </div>
              </div>`
            </div>
          </template>
        </div>
        <div
          :key="i + 'b'"
          class="col-md-12 justify-content-center d-inline-flex">
          <v-btn-normal
            v-if="sensors[i].length > 0"
            :on-click="prev"
            :params="i"
            :width="'47px'"
            :height="'43px'"
            style="margin: 0px 7.5px"/>
          <h6 style="padding: 10px">{{ getPageStatus(i) }}</h6>
          <v-btn-normal
            v-if="sensors[i].length > 0"
            :on-click="next"
            :params="i"
            :width="'47px'"
            :height="'43px'"
            style="margin: 0px 7.5px">
            >
          </v-btn-normal>
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
              :on-click="deleteMethod"
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
      selectedSensorId: null,
      sectionTypes: [
        "male",
        "female",
        "common",
        "outside"
      ],
      section: null,
      id: null,
      pages: [],
      sensors: [],
      deleteType: null
    };
  },

  watch: {
    pages: {
      handler(newValue) { },
      deep: true
    },
    sections: {
      handler(newValue) { },
      deep: true
    },
    sensors: {
      handler(newValue) { },
      deep: true
    }
  },

  created() {
    this.id = this.$route.params.id;
    this.fetchSection();
  },

  mounted() {
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
          this.sections.push(res.site.sections[res.site.sections.length - 1]);
          this.pages.push({ currentPage: 0 });
          this.sensors.push([]);
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
      this.deleteType = "section";
      this.$modal.show("alert-modal");
    },

    removeSensor({ sectionId, sensorId }) {
      this.selectedSectionId = sectionId;
      this.selectedSensorId = sensorId;
      this.deleteType = "sensor";
      this.$modal.show("alert-modal");
    },

    cancelRemove() {
      this.$modal.hide("alert-modal");
    },

    deleteMethod() {
      if (this.deleteType === "section") {
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
            const sec = this.sections.find(section => section.id === this.selectedSectionId);
            const index = this.sections.indexOf(sec);
            this.sections.splice(index, 1);
            this.pages.splice(index, 1);
            this.sensors.splice(index, 1);
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
      } else if (this.deleteType === "sensor") {
        Vue.$http
          .delete(`sensors?sensor_id=${this.selectedSensorId}`)
          .then((response) => {
            const res = response.data;
            this.$notify({
              group: "alert",
              type: "success",
              text: "Sensor has been successfully removed",
              width: 400
            });
            const sen = this.sensors[this.selectedSectionId].find(sensor => sensor.id === this.selectedSensorId);
            const index = this.sensors[this.selectedSectionId].indexOf(sen);
            this.sensors[this.selectedSectionId].splice(index, 1);
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
      this.$modal.hide("alert-modal");
    },

    submit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
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
              const sec = this.sections.find(section => section.id === this.selectedSectionId);
              const index = this.sections.indexOf(sec);
              console.log(index);
              console.log("sensor is : ", res.sensor);
              this.sensors[index].push({
                sensorType: res.sensor.sensor_type,
                macId: this.formData.macId,
                status: "init",
                wifiPassword: res.sensor.wifi_pwd,
                show: false,
                id: res.sensor.id
              });
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
          this.sections.forEach((section) => {
            this.pages.push({ currentPage: 0 });
            const newSensor = [];
            section.sensors.forEach((sensor) => {
              newSensor.push({
                sensorType: sensor.sensor_type,
                macId: sensor.mac_id,
                status: sensor.status,
                wifiPassword: sensor.wifi_pwd,
                id: sensor.id,
                show: false
              });
            });
            this.sensors.push(newSensor);
          });
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

    prev(i) {
      if (this.pages[i].currentPage === 0) {
        return;
      }
      this.pages[i].currentPage--;
    },

    next(i) {
      if (this.pages[i].currentPage === Math.ceil(this.sensors[i].length / 3) - 1) {
        return;
      }
      this.pages[i].currentPage++;
    },

    getPageStatus(i) {
      if (this.sensors[i].length === 0) {
        return "No sensors to display";
      }
      return `${this.pages[i].currentPage + 1} of ${Math.ceil(this.sensors[i].length / 3)}`;
    }
  }
};
</script>
<style scoped>
    .main-content {
        padding: 35px 25px 0 25px;
    }

    .details-group {
        display: block;
				width: 100%;
				padding-right: 30px;
    }

    .sensor {
        display: inline-flex;
        width: 100%;
        height: 72px;
        background-color: #fff;
        margin: 15px;
				padding: 12px 0 12px 0;
				border-radius: 4px;
    }

    .summary {
        font-size: 15px;
  			font-weight: 500;
        color: #39475b;
    }

		.btn-group {
			width: 410px;
			height: 50px;
			padding: 0 15px;
			position: absolute;
			right: 0px;
		}

    .circle {
        width: 16px;
        height: 16px;
        background-color: #39475b;
				border-radius: 50%;
				position: absolute;
				margin: 16px;
				margin-left: 30px;
    }

    .active {
        background-color: #1ed660;
    }

    .buttons {
        margin-bottom: 34px;
    }

    .sensor-status {
				/* margin-bottom: 15px; */
				padding-right: 0px;
    }

		.sensor-status > div {
			padding-top: 11px;
		}
    .sensor-status img {
        margin-top: -2px;
        margin-right: 17px;
    }

    .sensor-status .sensor-cnt {
        font-weight: normal !important;
        color: #8998ac !important;
    }

    .sensor-status span {
        font-size: 15px;
  			font-weight: 500;
        color: #263035;
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

	span.password {
		width: 185px;
		display: inline-flex;
	}

	.close-button {
		padding-right: 30px !important;
		min-width: 92px !important;
	}

	hr {
		margin: 25px 45px -15px 45px;
	}
</style>
