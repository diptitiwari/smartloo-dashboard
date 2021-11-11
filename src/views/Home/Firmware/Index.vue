<template>
  <div>
    <div class="col-md-12 main-content">
      <b-row>
        <b-col
          md="4"
          class="mb-3">
          <input
            v-model="search"
            type="text"
            class="form-control"
            placeholder="Search" >
        </b-col>
        <b-col
          md="8"
          align="right">
          <b-btn
            variant="primary"
            @click="createVersion">Create Version</b-btn>
        </b-col>
      </b-row>
      <b-table
        :fields="tableFields"
        :responsive="true"
        :items="firmwareVersions"
        :filter="search"
        :per-page="perPage"
        :current-page="currentPage"
        head-variant="eb-dark"
        table-class="table-events-list"
      >
        <template v-slot:cell(active)="data">
          <b-form-checkbox
            v-model="data.item['active']"
            name="check-button"
            switch
            @change="(checked)=> activateVersion(checked, data.item.id)"
          />
        </template>
        <template v-slot:cell(options)="data">
          <span v-if="!data.item.has_file">
            <img
              height="15%"
              width="15%"
              src="@/assets/icons/upload.svg"
              @click="upload(data.item)"
            >
          </span>
          <img
            src="@/assets/icons/delete.svg"
            @click="deleteVersion(data.item.id)" >
        </template>
      </b-table>
      <div class="row">
        <div class="col-md">
          <b-pagination
            :total-rows="firmwareVersions.length"
            :per-page="perPage"
            v-model="currentPage"
            class="paginate-events"
            prev-text="<"
            next-text=">"
            align="center"
            hide-goto-end-buttons
          />
        </div>
      </div>
    </div>

    <b-modal
      ref="my-modal-create"
      hide-footer
      title="Create Version">
      <div class="d-block">
        <b-form
          novalidate
          @submit.prevent="create">
          <b-form-group
            id="sensor_type_group"
            label="Sensor Type"
            label-for="sensor_type"
            class="mb-0"
          >
            <v-select
              v-validate="'required'"
              v-model="firmwareVersion.sensor_type"
              :options="sensorTypes"
              name="sensor_type"
              placeholder="Select Sensor Type"
            />
            <span class="error-msg">{{ errors.first('sensor_type') }}</span>
          </b-form-group>
          <b-form-group
            id="name_group"
            label="Name"
            label-for="name"
            class="mb-0">
            <b-form-input
              v-validate="'required'"
              v-model="firmwareVersion.name"
              name="name"
              placeholder="Enter Name"
            />
            <span class="error-msg">{{ errors.first('name') }}</span>
          </b-form-group>
          <b-form-group
            id="comment_group"
            label="Comment"
            label-for="comment"
            class="mb-0">
            <b-form-input
              v-validate="'required'"
              v-model="firmwareVersion.comment"
              placeholder="Enter Comment"
              name="comment"
            />
            <span class="error-msg">{{ errors.first('comment') }}</span>
          </b-form-group>
        </b-form>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="create">Create</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      ref="my-modal-upload-file"
      hide-footer
      title="Upload Bin File">
      <div class="d-block">
        <b-form-group
          id="binFile_group"
          label="BinFile"
          label-for="binFile"
          class="mb-0">
          <input
            v-validate="'required'"
            ref="binFileUpload"
            type="file"
            name="binFile"
            placeholder="Select File"
            class="form-control"
            @change="previewFiles"
          >
          <span class="error-msg">{{ errors.first('binFile') }}</span>
        </b-form-group>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="uploadBinFile">Upload</b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
/* ============
 * User Register Page
 * ============
 *
 * The User Register index page.
 */

import Vue from "vue";
import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  /**
   * The name of the page.
   */
  name: "FirmwareIndex",
  components: {
    VLayout,
    "v-btn-normal": VBtnNormal,
    "v-select": vSelect
  },
  /**
   * The components that the page can use.
   */
  mixins: [validationMixin],
  data() {
    return {
      firmwareVersions: [],
      selectedVersionId: null,
      selectedVersion: null,
      firmwareVersion: {
        sensor_type: null,
        name: null,
        comment: null
      },
      search: "",
      tableFields: [
        {
          key: "id",
          sortable: true
        },
        {
          key: "sensor_type",
          sortable: true
        },
        {
          key: "name",
          sortable: true
        },
        {
          key: "comment",
          sortable: true
        },
        {
          key: "active"
        },
        {
          key: "options"
        }
      ],
      perPage: 10,
      currentPage: 1,
      showVersionsPerPageList: [
        {
          text: "10",
          value: "10"
        },
        {
          text: "50",
          value: "50"
        },
        {
          text: "100",
          value: "100"
        },
        {
          text: "150",
          value: "150"
        },
        {
          text: "200",
          value: "200"
        }
      ],
      binFile: null,
      myBinFile: null,
      sensorTypes: []
    };
  },
  mounted() {
    this.fetchFirmwares();
  },
  methods: {
    previewFiles() {
      this.binFile = this.$refs.binFileUpload.files[0];
    },

    fetchFirmwares() {
      Vue.$http
        .get("firmware")
        .then((response) => {
          this.firmwareVersions = response.data.firmware;
        })
        .catch((error) => {});
    },

    fetchSensorTypes() {
      Vue.$http
        .get("sensors/types")
        .then((response) => {
          this.sensorTypes = response.data;
        })
        .catch((error) => {});
    },

    createVersion() {
      this.fetchSensorTypes();
      this.firmwareVersion = {
        sensor_type: null,
        email: null,
        comment: null
      };
      this.$refs["my-modal-create"].show();
    },

    upload(version) {
      if (version.has_file) {
        this.$notify({
          group: "alert",
          type: "success",
          text: "Firmware already has Bin File",
          width: 400
        });
      } else {
        this.binFile = null;
        this.selectedVersionId = version.id;
        this.$refs["my-modal-upload-file"].show();
      }
    },

    deleteVersion(id) {
      this.selectedVersionId = id;
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
              .delete("firmware?", {
                params: { firmware_id: this.selectedVersionId }
              })
              .then((response) => {
                this.fetchFirmwares();
                this.$notify({
                  group: "alert",
                  type: "success",
                  text: "Version has been deleted successfully!",
                  width: 400
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
          }
        });
    },

    async create() {
      try {
        const isValid = !this.$v.$invalid;
      } catch (err) {
        console.log(err);
      }
      this.$validator.validateAll().then((result) => {
        console.log("validation : ", result);
        console.log(" vuelidate : ", this.$v);
        const { comment, name, sensor_type } = this.firmwareVersion;

        if (result) {
          Vue.$http
            .post("firmware", {
              firmware: {
                name,
                sensor_type,
                comment
              }
            })
            .then((response) => {
              this.$refs["my-modal-create"].hide();
              this.fetchFirmwares();
              this.$notify({
                group: "alert",
                type: "success",
                text: "Firmware Version has been created successfully!",
                width: 400
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
        }
      });
    },

    async uploadBinFile() {
      if (this.binFile && this.selectedVersionId) {
        const formData = new FormData();
        formData.append("binfile", this.binFile);
        formData.append("firmware_id", this.selectedVersionId);
        try {
          const response = await Vue.$http.post("firmware/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
          if (response && response.status === 200) {
            this.$refs["my-modal-upload-file"].hide();
            this.fetchFirmwares();
            this.$notify({
              group: "alert",
              type: "success",
              text: "File uploaded successfully!",
              width: 400
            });
          }
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
    },

    async activateVersion(checked, id) {
      const activate = Vue.$http
        .post("firmware/activate", {
          firmware_id: id,
          activate: checked
        })
        .then((response) => {
          const updatedState = checked ? "Activated" : "Deactivated";
          this.fetchFirmwares();
          this.$notify({
            group: "alert",
            type: "success",
            text: `Firmware ${updatedState} Successfully!`,
            width: 400
          });
        })
        .catch((error) => {
          this.fetchFirmwares();
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
.v--modal-overlay {
  z-index: 999999999 !important;
}
</style>

<style scoped>
.main-content {
  padding: 35px 25px 0 25px;
}

.header > div,
.body > div {
  display: block;
  padding: 0px 5px;
}

.id {
  width: 8%;
}

.name {
  width: 22%;
}

.sensor-status > div {
  padding-top: 11px;
}

.sensor-status img {
  margin-top: -2px;
  margin-right: 17px;
}

.sensor-status span {
  font-size: 15px;
  font-weight: 500;
  color: #263035;
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

hr {
  margin: 25px 45px -15px 45px;
}
</style>
