<template>
  <div class="emperor">
    <b-modal
      id="myModalSensorRegister"
      ref="my-modal-sensor-register"
      hide-footer
      title="Sensor Registration"
    >
      <div class="d-block">
        <b-form-group
          id="input-group-2"
          label="Select Sensor Type:"
          label-for="input-2">
          <v-select
            v-validate="'required'"
            :options="types"
            v-model="formData.sensorType"
            name="role_name"
            placeholder="Enter Sensor Type"
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="MAC ID"
          label-for="input-2">
          <b-form-input
            v-validate="'required'"
            v-model="formData.macId"
            type="text"
            name="mac-id"
            placeholder="Enter MAC ID"
            class="form-control"
          />
          <span class="error-msg">{{ errors.first('mac-id') }}</span>
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Wifi Password"
          label-for="input-2">
          <b-row>
            <b-col md="9">
              <b-form-input
                v-validate="'required'"
                v-model="formData.wifiPassword"
                type="text"
                name="wifi-password"
                placeholder="Enter Wifi Password"
                class="form-control"
              />
              <span class="error-msg">{{ errors.first('wifi-password') }}</span>
            </b-col>
            <b-col
              md="3"
              align="right">
              <b-btn
                variant="success"
                @click="generate">Generate</b-btn>
            </b-col>
          </b-row>
        </b-form-group>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="handleSubmit">Submit</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
import Vue from "vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import vSelect from "vue-select";
import { sensorType } from "@/services/sensor";

export default {
  components: {
    VBtnNormal,
    JqxComboBox,
    vSelect
  },
  props: {
    formData: Object,
    section: Object,
    generate: Function
  },
  data() {
    return {
      data: {
        wifiPassword: "",
        macId: "",
        sensorType: ""
      },
      types: []
    };
  },
  mounted() {
    this.getSensorType();
  },
  methods: {
    handleSubmit() {
      this.$refs["my-modal-sensor-register"].hide();
      this.$emit("register", this.section.id);
    },
    async getSensorType() {
      const result = await sensorType();
      this.types = result;
    }
  }
};
</script>

<style>
.v--modal-overlay {
  z-index: 999999999 !important;
}
</style>
