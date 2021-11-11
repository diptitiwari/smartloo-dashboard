<template>
  <div>
    <modal
      name="sensor-modal"
      width="570"
      height="555">
      <div class="modal-inside custom-modal">
        <div class="col-md-12 text-center text-uppercase mb-4">
          <h5>Sensor Registration</h5>
        </div>
        <form>
          <div class="form-group mb-5">
            <div class="input-group">
              <p>Sensor Type</p>
              <JqxComboBox
                v-model="formData.sensorType"
                :width="'100%'"
                :height="50"
                :source="types"
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
                :on-click="handleSubmit"
                :width="'100%'"
                :height="'55px'">
                Submit
              </v-btn-normal>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import Vue from "vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";

export default {
  components: {
    VBtnNormal,
    JqxComboBox
  },
  props: {
    formData: Object,
    section: Number,
    generate: Function
  },
  data() {
    return {
      types: [
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
    handleSubmit() {
      this.$emit("register", this.section);
    }
  }
};
</script>
