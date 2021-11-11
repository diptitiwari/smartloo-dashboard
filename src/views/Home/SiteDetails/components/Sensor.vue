<template>
  <div class="col-md-12 sensor">
    <span class="circle active"/>
    <div class="col-md-12 d-inline-flex pl-5 pr-0">
      <div class="col-md-3 d-flex sensor-status">
        <div class="col-md-12 pr-0 pl-0">
          <img
            v-b-popover.hover.top="'Sensor Type'"
            src="../../../../assets/icons/brightness.png">
          <span>{{ sensor_type }}</span>
        </div>

      </div>
      <div class="col-md-3 d-flex sensor-status">
        <div class="col-md-12 pr-0 pl-0">
          <img
            v-b-popover.hover.top="'Mac id'"
            src="../../../../assets/icons/driving-license.png">
          <span>{{ mac_id }}</span>
        </div>
      </div>
      <div class="col-md-6 p-0 d-inline-flex">
        <div class="col-md-4 d-flex sensor-status">
          <div class="col-md-12 pr-0 pl-0">
            <img
              v-b-popover.hover.top="'Status'"
              src="../../../../assets/icons/status.png">
            <span>{{ status }}</span>
          </div>
        </div>
        <div class="col-md-6 d-flex sensor-status">
          <div class="col-md-12 pr-0 pl-0">
            <img
              v-b-popover.hover.top="'Password'"
              src="../../../../assets/icons/lock.png">
            <span class="password"> {{ wifi_pwd }} </span>
          </div>
        </div>
        <div class="col-md-2 close-button">
          <v-btn-normal
            :on-click="removeSensor"
            :params="{sectionId: i, sensorId: id}"
            :width="'80%'"
            :height="'35px'">
            <img src="../../../../assets/icons/close-button.png">
          </v-btn-normal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VBtnNormal from "@/components/buttons/BtnNormal.vue";

export default {
  components: {
    VBtnNormal
  },
  props: {
    id: Number,
    mac_id: String,
    sensor_type: String,
    status: String,
    wifi_pwd: String
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    removeSensor() {
      this.$emit("remove-sensor", {
        id: this.id,
        mac_id: this.mac_id
      });
    }
  }
};
</script>

<style scoped>
  .sensor {
    display: inline-flex;
    width: 100%;
    height: 72px;
    background-color: #fff;
    padding: 5px 0 5px 0;
    border-radius: 4px;
  }
  .circle {
    width: 16px;
    height: 16px;
    background-color: #39475b;
    border-radius: 50%;
    position: absolute;
    margin: 16px 10px 16px 0;
  }

  .active {
    background-color: #1ed660;
  }

  .buttons {
    margin-bottom: 34px;
  }

  .sensor-status {
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
</style>
