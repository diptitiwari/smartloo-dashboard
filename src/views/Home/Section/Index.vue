<template>
  <v-layout :hide-footer="true">
    <div class="col-md-12 mt-4">
      <v-modal
        :padding="'60px 0 30px 0'"
        :hide-box-shadow="true"
        :width="'100%'">
        <div class="col-md-12 d-flex p-0">
          <div class="col-md-6">
            <form @submit.prevent="submit()">
              <div class="form-group">
                <div class="input-group">
                  <p>Sensor Type</p>
                  <JqxComboBox
                    v-model="formData.sensor_type"
                    :width="'100%'"
                    :height="50"
                    :source="sensor_types"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="input-group">
                  <p>MAC ID</p>
                  <input
                    v-model="formData.mac_id"
                    type="text"
                    class="form-control" >
                </div>
              </div>
              <hr >
            </form>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <div class="input-group">
                <p>Site ID</p>
                <JqxComboBox
                  v-model="formData.sensor_type"
                  :width="'100%'"
                  :height="50"
                  :source="sensor_types"
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <p>WiFi Password</p>
                <input
                  v-model="formData.wifi_pwd"
                  type="text"
                  class="form-control" >
              </div>
            </div>
            <hr >
            <div class="form-group row justify-content-center">
              <div class="col-md-12">
                <v-btn-normal
                  :on-click="submit"
                  :type="'btn-blue'"
                  :width="'100%'">Submit</v-btn-normal>
              </div>
            </div>
          </div>
        </div>
      </v-modal>
    </div>
  </v-layout>
</template>

<script>
import Vue from "vue";
import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import VModal from "@/components/modals/Modal.vue";
import { registerSensor } from "@/services/register";

export default {
  name: "Sensor",
  components: {
    VModal,
    VLayout,
    "v-btn-normal": VBtnNormal,
    JqxComboBox
  },
  data() {
    return {
      modal: false,
      formData: {
        sensor_type: null,
        mac_id: "",
        wifi_pwd: "",
        site_id: null
      },
      sensor_types: [
        "water_level",
        "smell",
        "foot_counter",
        "loudness",
        "test",
        "light",
        "feedback"
      ]
    };
  },
  methods: {
    async submit() {
      console.log("submit this ", this.formData);
      try {
        const result = await registerSensor({
          sensor: this.formData
        });
        console.log("got result : ", result);
      } catch (err) {
        console.log(err);
      }
    },
    openModal() {
      this.$modal.show("sensor-modal");
      this.modal = true;
    },
    closeModal() {
      this.$modal.hide("sensor-modal");
      this.modal = false;
    }
  }
};
</script>


<style scoped>
.title {
  margin-bottom: 22px;
}

.form-group .input-group.col-md-12 {
  display: flex !important;
  padding: unset !important;
}

.form-group .input-group.col-md-12 .col {
  padding: unset !important;
  padding-right: 25px !important;
}

.form-group .input-group.col-md-12 .col.btn-generate {
  padding-right: 0px !important;
}

.btn-generate p,
.btn-search p {
  opacity: 0;
}

.wifi {
  width: calc(50% - 55px);
  padding: 0 15px;
}

.btn-search,
.btn-generate {
  width: 110px;
  display: inline-block;
  padding: 0 15px;
}

.search-box {
  width: calc(100% - 110px);
  padding: 0 15px;
}

.sections > div {
  margin-bottom: 20px;
}

.custom-modal .form-group {
  margin-bottom: 17px !important;
}

.justify-content-center {
  padding-top: 15px;
}

.d-inline-grid {
  display: inline-grid !important;
}

.map-box {
  height: calc(100% - 133px);
  margin-top: 30px;
  display: grid;
}
</style>
