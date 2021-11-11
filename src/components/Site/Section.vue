<template>
  <eb-card title="Sections">
    <b-tabs
      v-model="tabIndex"
      content-class="mt-0 no-border">
      <template v-slot:tabs-end>
        <div class="ml-auto"
             v-if="isAuth"
        >
          <b-btn
            v-b-modal.sectionRegister
            variant="primary"
            class="mr-1 mb-1">Add Section</b-btn>
          <section-register @register="sectionRegister" />
        </div>
      </template>
      <template v-slot:empty>
        <div class="text-center text-muted">
          There are no open tabs
          <br >Open a new tab using the
          <b>Add Section</b>button above.
        </div>
      </template>
      <b-tab
        v-for="(ele, idx) in sections"
        :title="ele.site_subtype"
        :key="idx"
        class="py-0">
        <b-row>
          <b-table
            v-if="ele.sensors.length > 0"
            :items="ele.sensors"
            :fields="tableFields"
            :responsive="true"
            class="no-border ctm-tbl-brdr"
            head-variant="dark"
          >
            <template v-slot:cell(options)="data">
              <img
                v-if="isAuth"
                src="@/assets/icons/delete.svg"
                @click="deleteSensor(data.item)" >
            </template>
          </b-table>
          <b-col
            v-else
            class="py-4">
            <div class="text-center text-muted">
              There are no sensor
              <br >Create new Sensor using the
              <b>Add Sensor</b>button bellow.
            </div>
          </b-col>
        </b-row>
      </b-tab>
    </b-tabs>
    <b-card-footer align="right">
      <b-btn
        v-b-modal.myModalSensorRegister
        v-if="isAuth"
        variant="primary"
        class="mr-1 mb-1">Add Sensor</b-btn>
      <b-btn
        v-if="sections.length > 0 && isAuth"
        variant="danger"
        class="mr-1 mb-1"
        @click="removeSection"
      >Remove Section</b-btn>
    </b-card-footer>
    <sensor-register
      :form-data="sensorForm"
      :section="sections[tabIndex]"
      :generate="generate"
      @register="registerSensor"
    />
  </eb-card>
</template>

<script>
import Vue from "vue";
import EbCard from "@/components/common/Card.vue";
import SectionRegister from "./SectionRegisterModal.vue";
import DeleteSection from "./DeleteSectionModal.vue";
import SensorRegister from "./SensorRegisterModal.vue";

export default {
  name: "SectionInfo",
  components: {
    EbCard,
    SectionRegister,
    DeleteSection,
    SensorRegister
  },
  data() {
    return {
      tabIndex: 0,
      sensorForm: {
        sensorType: null,
        macId: null,
        wifiPassword: null
      },
      tableFields: [
        {
          key: "id"
        },
        {
          key: "sensor_type"
        },
        {
          key: "mac_id"
        },
        {
          key: "status"
        },
        {
          key: "wifi_pwd"
        },
        {
          key: "current_firmware"
        },
        {
          key: "options"
        }
      ]
    };
  },
  computed: {
    sections() {
      return this.$store.getters["site/getSection"];
    },
    isAuth() {
      return this.$store.getters["account/isAuth"];
    }
  },
  methods: {
    addSectionModel() {
      this.$modal.show("section-modal");
    },

    createSensorModel() {
      this.$modal.show("my-modal-sensor-register");
    },

    sectionRegister(payload) {
      this.$modal.hide("sectionRegister");
      this.$emit("createSection", payload);
    },

    removeSection() {
      this.$emit("removeSection", this.tabIndex);
    },

    deleteSensor(payload) {
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
              .post("sensors/unregister", {
                mac_id: payload.mac_id
              })
              .then((response) => {
                const res = response.data;
                this.$notify({
                  group: "alert",
                  type: "success",
                  text: "Sensor has been successfully unregister",
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

    registerSensor(payload) {
      this.$modal.hide("myModalSensorRegister");
      this.$emit("createSensor", {
        id: payload,
        data: this.sensorForm
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
    }
  }
};
</script>

<style>
.nav-tabs .nav-link {
  /* color: #191919 !important; */
  font-size: 18px;
  transition: 0.5s ease-in-out;
  font-weight: 500 !important;
  border: 0 !important;
  border-bottom: 3px solid transparent !important;
}

/* .nav-tabs .nav-link:hover{
    color: #191919 !important;
    border-bottom: 3px solid #388cd0 !important;
}

.nav-tabs .nav-link.active, .nav-tabs .nav-link:focus{
    border: 0 !important;
    color: #388cd0 !important;
    border-bottom: 3px solid #388cd0 !important;
    font-weight: 600 !important;
} */

.no-border {
  border: 0 !important;
}
</style>
