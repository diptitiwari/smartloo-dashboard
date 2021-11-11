<template>
  <div class="mt-4 mr-3 ml-3">
    <b-row>
      <b-col>
        <eb-card title="Site Info">
          <b-row>
            <b-col>
              <span class="h2 text-black mb-0">
                <div class="status">
                  <div
                    :style="{ background: getIOT }"
                    class="circle" />
                  <label class="m-0">{{ siteInfo.name }}</label>
                </div>
              </span>

              <span class="h6">
                <span
                  :style="{ color: getIOT }"
                  class="ml-2"
                >Site is {{ getIOT === "green" ? 'Online' : 'Offline' }}</span>
              </span>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <img src="@/assets/icons/maps-and-flags.svg" >
              <span class="ml-1">{{ siteInfo.address }}</span>
            </b-col>
          </b-row>
          <b-row class="mt-2 pt-2">
            <b-col md="3">SSID</b-col>
            <b-col md="3">{{ siteInfo.wifi_ssid }}</b-col>
          </b-row>
          <b-row>
            <b-col md="3">Password</b-col>
            <b-col md="3">{{ siteInfo.wifi_pwd }}</b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col
              md="3"
              class="mt-2">
              <b-btn variant="primary">Log a Grievance</b-btn>
              <span class="ml-2">Powerd By</span>
            </b-col>
            <b-col
              md="2"
              class="mt-1">
              <img
                src="@/assets/digit_logo.jpeg"
                width="100%"
                class="mob-img-logo" >
            </b-col>
            <b-col
              md="7"
              class="mt-2 text-right"
            >
              <b-btn
                variant="primary"
                @click.prevent="fetchData"
              >
                <i class="fa fa-refresh mr-2"/>
                Refresh Data
              </b-btn>
            </b-col>
          </b-row>
        </eb-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3">
        <eb-water-level />
      </b-col>
      <b-col md="3">
        <eb-electricity />
      </b-col>
      <b-col md="3">
        <eb-rating />
      </b-col>
      <b-col md="3">
        <eb-total-sensor />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="3">
        <eb-today-usage title="Foot Fall" />
      </b-col>

      <b-col md="3">
        <eb-user-week-usage
          :feed-back-data="siteInfoSummary.user_feedback.this_week"
          chart-type="Weekly foot fall"
        />
      </b-col>

      <b-col md="3">
        <eb-user-feedback
          :feed-back-data="getFeedBack.feedBack.feedbackToday"
          chart-type="User Feedback Today"
        />
      </b-col>

      <b-col md="3">
        <eb-user-feedback
          :feed-back-data="getFeedBack.feedBack.feedbackWeekly"
          chart-type="User Feedback Weekly"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <eb-section
          @createSection="sectionRegister"
          @removeSection="sectionRemove"
          @createSensor="sensorRegister"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Vue from "vue";
import _ from "lodash";
import EbTotalSensor from "@/components/Site/TotalSensor.vue";
import EbElectricity from "@/components/Site/Electricity.vue";
import EbRating from "@/components/Site/Rating.vue";
import EbWaterLevel from "@/components/Site/WaterLevel.vue";
import EbTodayUsage from "@/components/Site/TodayUsage.vue";
import EbSiteInfo from "@/components/Site/SiteInfo.vue";
import EbUserFeedback from "@/components/Site/UserFeedback.vue";
import EbUserWeekUsage from "@/components/Site/UserWeekUsage.vue";
import EbSection from "@/components/Site/Section.vue";
import EbCard from "@/components/common/Card.vue";

import {
  registerSensor as registerSensorService,
  registerSection as registerSectionService
} from "@/services/register";

import { sensorByMacId } from "@/services/sensor";

import {
  getToken,
  SiteMetadata,
  WaterLevel,
  Sensors,
  Usage,
  Feedback
} from "@/services/site";

import moment from "moment";

moment.locale();

export default {
  name: "SiteDetials",
  components: {
    EbTotalSensor,
    EbElectricity,
    EbRating,
    EbWaterLevel,
    EbTodayUsage,
    EbSiteInfo,
    EbUserFeedback,
    EbSection,
    EbCard,
    EbUserWeekUsage
  },
  data() {
    return {
      id: null,
      selectedSectionId: null,
      baseURL: ""
    };
  },
  computed: {
    siteInfo() {
      return this.$store.getters["site/getInfo"];
    },
    sections() {
      return this.$store.getters["site/getSection"];
    },
    siteInfoSummary() {
      return this.$store.getters["site/getSummary"];
    },
    getIOT() {
      const data = this.$store.getters["site/getIOT"];
      if (data.sensor.totalSensor === data.sensor.deactivate) return "red";
      return "green";
    },
    getFeedBack() {
      return this.$store.getters["site/getIOT"];
    }
  },
  mounted() {
    this.baseURL = process.env.VUE_APP_API_LOCATION;
    this.fetchData();
  },
  created() {
    this.fetchData();
  },
  methods: {
    async sensorRegister(payload) {
      try {
        this.selectedSectionId = payload.id;
        const mac_id_data = await sensorByMacId({
          mac_id: payload.data.macId
        });
        const { sensor } = mac_id_data;
        if (sensor) {
          this.$swal
            .fire({
              title:
                "You need to unregister this sensor from its current location to register it again.<br>",
              html:
                `Site Name : <b>${sensor.parent.name}</b> <br>` +
                `Section Name : <b>${sensor.site.site_subtype}</b> <br>` +
                `<a target="_blank" href="#/dashboard/site-details/${sensor.parent.id}"> Go to Site </a>`,
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Unregister Sensor!"
            })
            .then((result) => {
              if (result.value) {
                Vue.$http
                  .post("sensors/unregister", {
                    mac_id: payload.data.macId
                  })
                  .then((response) => {
                    const res = response.data;
                    this.$notify({
                      group: "alert",
                      type: "success",
                      text: "Sensor has been successfully removed",
                      width: 400
                    });
                    this.fetchSection();
                    this.registerSensorAPI(payload);
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
        } else {
          await this.registerSensorAPI(payload);
        }
      } catch (err) {
        const res = err.message.error;
        this.$notify({
          group: "alert",
          type: "error",
          text: res,
          width: 400
        });
      }
    },
    async registerSensorAPI(payload) {
      try {
        const { data, id } = payload;

        const { sensorType } = data;
        if (!sensorType) {
          data.sensorType = "water_level";
        }

        const result = await registerSensorService({
          sensor: {
            sensor_type: data.sensorType,
            mac_id: data.macId,
            wifi_pwd: data.wifiPassword,
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
    async sectionRemove(payload) {
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
        .then(async (result) => {
          if (result.value) {
            try {
              const sectionID = this.sections[payload];
              const response = await Vue.$http.delete(`sites?site_id=${sectionID.id}`);
              this.$notify({
                group: "alert",
                type: "success",
                text: "Section has been successfully removed",
                width: 400
              });
              this.fetchSection();
            } catch (error) {
              const res = error.response.data;
              this.$notify({
                group: "alert",
                type: "error",
                text: res.error,
                width: 400
              });
            }
          }
        });
    },
    async sectionRegister(payload) {
      const obj = {
        site_id: this.siteInfo.id,
        section: {
          site_type: "section",
          site_subtype: payload
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
    async fetchData() {
      this.id = this.$route.params.id;
      await this.fetchSection();
      await this.getsummary();
      await this.getSiteMetaData();
      this.$store.dispatch("site/isSiteInfo", true);
    },
    async getSiteMetaData() {
      try {
        const iotData = {
          waterLevel: {
            status: true,
            message: "",
            label: [],
            dataSets: [],
            current: {
              level: 0
            }
          },
          electricity: false,
          sensor: {
            totalSensor: 0,
            active: 0,
            deactivate: 0,
            status: true,
            message: ""
          },
          todayUsage: {
            status: false,
            message: "",
            currentDay: 0,
            weekUsage: 0,
            label: [],
            dataset: []
          },
          feedBack: {}
        };

        const siteData = await SiteMetadata();

        // water level
        try {
          const wl = await WaterLevel();
          const { data, message } = await wl;
          if (data.length) {
            const label = [];
            const dataValues = [];

            const backgroundColor = [];
            _.forEach(_.uniqBy(data, "time"), (level) => {
              label.push(moment(level.time.slice(0, -1)).format("LT"));
              dataValues.push(level.value);
            });

            const lastItem = _.last(data);
            const minutes = _.round(moment.duration(moment().diff(lastItem.time.slice(0, -1))).asMinutes());
            let time = `${minutes} minutes ago`;
            if (minutes >= 60) {
              time = `${_.round(moment.duration(moment().diff(lastItem.time.slice(0, -1))).asHours())} hours ago`;
            }
            iotData.waterLevel.current = {
              time,
              level: lastItem.value
            };
            iotData.waterLevel.label = label;
            iotData.waterLevel.dataSets = [{
              data: dataValues,
              backgroundColor
            }];
          } else {
            iotData.waterLevel.status = false;
            iotData.waterLevel.message = message || "No water sensor found on site";
          }
        } catch (error) {
          iotData.waterLevel.status = false;
          iotData.waterLevel.message = "No water sensor found on site";
        }

        // sensor
        try {
          const sen = await Sensors();
          const { sensors } = await sen;
          if (sensors) {
            const activeSensors = sen.sensors.filter(e => e.connected === true);
            const deactiveSensors = sen.sensors.filter(e => e.connected === false);
            iotData.sensor.active = activeSensors.length;
            iotData.sensor.deactivate = deactiveSensors.length;
            iotData.sensor.totalSensor = sen.total_count;
            iotData.sensor.status = true;
          } else {
            iotData.sensor.status = false;
            iotData.sensor.message = "No sensor found on site";
          }
        } catch (error) {
          iotData.sensor.status = false;
          iotData.sensor.message = "No sensor found on site";
        }

        // usage
        try {
          const us = await Usage();
          const { message, data } = us;
          if (data) {
            const groupedData = _.mapValues(
              _.groupBy(data, "section"),
              clist => clist.map(value => _.omit(value, "section"))
            );
            const dataSet = [];
            let color = 0;
            _.forEach(groupedData, (value, key) => {
              dataSet.push({
                label: key,
                data: _.map(value, "value"),
                backgroundColor: this.getRandomColor(color++)
              });
            });
            const label = _.uniq(_.map(_.map(data, "day"), value => moment(value).format("DD")));
            let weekUsage = 0;
            let todayUsage = 0;
            _.forEach(data, (usage) => {
              if (moment().format("DD-MM-YYYY") === moment(usage.day).format("DD-MM-YYYY")) {
                todayUsage += usage.value;
              }
              weekUsage += usage.value;
            });

            iotData.todayUsage.weekUsage = weekUsage;
            iotData.todayUsage.currentDay = todayUsage;
            iotData.todayUsage.label = label;
            iotData.todayUsage.dataset = dataSet;
            iotData.todayUsage.status = true;
          } else {
            iotData.todayUsage.status = false;
            iotData.todayUsage.message = message || "No foot counter found on site";
          }
        } catch (error) {
          iotData.todayUsage.status = false;
          iotData.todayUsage.message = "No foot counter found on site";
        }

        // feedback
        try {
          const feedBack = await Feedback();
          const { data, message } = await feedBack;
          if (data) {
            const feedbackWeekly = {
              dirty: 0,
              clean: 0
            };

            const feedbackToday = {
              dirty: data[data.length - 1].dirty,
              clean: data[data.length - 1].clean
            };

            data.forEach((fd) => {
              feedbackWeekly.dirty += fd.dirty;
              feedbackWeekly.clean += fd.clean;
            });
            iotData.feedBack = {
              status: true,
              data,
              feedbackToday,
              feedbackWeekly
            };
          } else {
            iotData.feedBack.status = false;
            iotData.feedBack.message = message || "No feedback data found on site";
          }
        } catch (error) {
          iotData.feedBack.status = false;
          iotData.feedBack.message = "No feedback data found on site";
        }

        this.$store.dispatch("site/setIOT", iotData);
      } catch (error) {
        console.log("this is error", error);
        this.$notify({
          group: "alert",
          type: "error",
          text: error.message,
          width: 400
        });
      }
    },
    async fetchSection() {
      try {
        const newToken = await getToken(this.id);
        const { access_token } = newToken;
        localStorage.setItem("access_token_site", access_token);

        const result = await Vue.$http.get(`sites?site_id=${this.id}`);
        const res = result.data;
        this.$store.dispatch("site/info", res.site);
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
    async getsummary() {
      try {
        const result = await Vue.$http.get(`sites/data/summary?site_id=${this.id}`);
        const res = result.data;
        this.$store.dispatch("site/summary", res);
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
    getRandomColor(index) {
      const colors = [
        "#41B883",
        "#F8CA9D",
        "#E46651",
        "#F2CFF9",
        "#8EC9BB",
        "#FB8E7E",
        "#DD1B16"
      ];
      return colors[index];
    }
  }
};
</script>

<style scoped>
  .card-min-hg {
    min-height: 264px !important;
  }
</style>

