<template>
  <v-layout
    :hide-footer="true"
    :back-white="true">
    <div>
      <span class="circle active" />
      <div class="col-md-12 d-inline-flex pl-5 pr-0">
        <div class="col-md-3 d-flex sensor-status">
          <div class="col-md-12 pr-0 pl-0">
            <img src="../../../../assets/icons/brightness.png" >
            <span>Sensor type : {{ sensor.sensorType }}</span>
          </div>
        </div>
        <div class="col-md-3 d-flex sensor-status">
          <div class="col-md-12 pr-0 pl-0">
            <img src="../../../../assets/icons/driving-license.png" >
            <span>Mac id : {{ sensor.macId }}</span>
          </div>
        </div>
        <div class="col-md-6 p-0 d-inline-flex">
          <div class="col-md-4 d-flex sensor-status">
            <div class="col-md-12 pr-0 pl-0">
              <img src="../../../../assets/icons/status.png" >
              <span>Status : {{ sensor.status }}</span>
            </div>
          </div>
          <div class="col-md-6 d-flex sensor-status">
            <div class="col-md-12 pr-0 pl-0">
              <img src="../../../../assets/icons/lock.png" >
              <span class="password">
                Password :
                <template v-if="sensor.show">{{ sensor.wifiPassword }}</template>
                <template v-else>************</template>
              </span>
              <img
                src="../../../../assets/icons/view.png"
                class="mr-0 ml-2 cursor-pointer"
                @click="sensor.show = !sensor.show"
              >
            </div>
          </div>
          <div class="col-md-2 close-button">
            <v-btn-normal
              :on-click="removeSensor"
              :params="{sectionId: i, sensorId: sensor.id}"
              :width="'100%'"
              :height="'48px'"
            >
              <img src="../../../../assets/icons/close-button.png" >
            </v-btn-normal>
          </div>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
export default {};
</script>
