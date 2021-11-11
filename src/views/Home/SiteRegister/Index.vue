<template>
  <div class="col-md-12 mt-4">
    <eb-card title="Site Register">
      <b-row>
        <b-col md="6">
          <b-form-group
            id="input-group-2"
            label="Site Name"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="formData.siteName"
              type="text"
              name="site-name"
              placeholder="Enter Site Name"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('site-name') }}</span>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Site Type"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="formData.siteType"
              type="text"
              name="site-type"
              placeholder="Enter Site Type"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('site-type') }}</span>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="City"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="formData.city"
              type="text"
              name="city"
              placeholder="Enter City"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('city') }}</span>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Latitude"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="formData.latitude"
              type="text"
              name="site-latitude"
              placeholder="Enter Latitude"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('site-latitude') }}</span>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label="Longitude"
            label-for="input-2">
            <b-form-input
              v-validate="'required'"
              v-model="formData.longitude"
              type="text"
              name="site-longitude"
              placeholder="Enter Longitude"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('site-longitude') }}</span>
          </b-form-group>
          <b-row>
            <b-col md="4">
              <b-form-group
                id="input-group-2"
                label="Wifi SSID"
                label-for="input-2">
                <b-form-input
                  v-validate="'required'"
                  v-model="formData.wifiSSID"
                  type="text"
                  name="site-wifiSSID"
                  placeholder="Enter Wifi SSID"
                  class="form-control"
                />
                <span class="error-msg">{{ errors.first('site-wifiSSID') }}</span>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                id="input-group-2"
                label="Wifi Password"
                label-for="input-2">
                <b-form-input
                  v-validate="'required'"
                  v-model="formData.wifiPassword"
                  type="text"
                  name="wifiPassword"
                  placeholder="Enter Wifi Password"
                  class="form-control"
                />
                <span class="error-msg">{{ errors.first('wifiPassword') }}</span>
              </b-form-group>
            </b-col>
            <b-col md="4">
              <b-form-group
                id="input-group-2"
                label="Generate Password"
                label-for="input-2">
                <b-btn
                  variant="primary"
                  @click="generate">Generate</b-btn>
              </b-form-group>
            </b-col>
          </b-row>
          <!------Custom Attributes---->
          <b-row>
            <b-col
              v-for="(attr, idx) in customAttrItems"
              :key="idx"
              md="6"
            >
              <b-row>
                <b-col md="10">
                  <b-form-group
                    :id="input-group-2"
                    :label="attr.label "
                    label-for="input-2">
                    <b-form-input
                      v-validate="'required'"
                      v-if="attr.type_name === 'input'"
                      :name="attr.name"
                      :placeholder="attr.placeholder_text.toString()"
                      type="text"
                      class="form-control"
                    />
                    <v-select
                      v-if="attr.type_name === 'dropdown'"
                      :options="attr.options"
                      v-model="formData.info[attr.name]"
                      :name="attr.name"
                      :placeholder="attr.placeholder_text"
                    />
                  </b-form-group>
                </b-col>

                <b-col
                  md="2"
                  class=" d-flex justify-content-end align-items-center mt-2">
                  <b-btn
                    class="btn-danger fa fa-close"
                    @click="removeInfo(attr)"/>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <!------Custom Attributes---->
          <b-row
            v-if="customAttributes"
            class="mb-2"
          >
            <b-col md="12">
              <b-form-group
                id="input-group-3"
                label="Extra Information"
                label-for="input-3">
                <v-select
                  :options="customAttributes"
                  v-model="selectedCustomAttr"
                  name="customAttr"
                  placeholder="Select Info to Add"
                  @input="handleAddInfoChange"
                />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group
            id="input-group-2"
            label="Section"
            label-for="input-2">
            <template v-for="(section, index) in formData.sections">
              <JqxComboBox
                :key="index"
                v-model="formData.sections[index]"
                :width="'100%'"
                :height="35"
                :source="source"
                class="mt-2"
              />
            </template>
          </b-form-group>
          <b-form-group
            id="input-group-2"
            label-for="input-2">
            <b-btn
              block
              variant
              @click="addSection">+</b-btn>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label-for="input-2">
            <b-btn
              block
              variant="primary"
              @click="submit">Submit</b-btn>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-row>
            <b-col
              md="12"
              class="mt-3 py-1">
              <b-input-group>
                <b-form-input
                  v-validate="'required'"
                  v-model="searchText"
                  type="text"
                  placeholder="Search Location"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-button
                    variant="primary"
                    @click="search">Search</b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
          <div class="map-box">
            <HereMap
              :markers="markers"
              :lat="latitude"
              :lng="longitude"
              width="100%"
              height="100%"
              @onClick="onClickMap"
            />
          </div>
        </b-col>
      </b-row>
    </eb-card>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
import _ from "lodash";
import VLayout from "@/layouts/Default.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import VModal from "@/components/modals/Modal.vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import HereMap from "@/layouts/MyHereMap.vue";
import EbCard from "@/components/common/Card.vue";
import { CustomAttrs } from "@/services/site";
import "vue-select/dist/vue-select.css";

export default {
  name: "SiteRegisterIndex",
  components: {
    EbCard,
    "v-layout": VLayout,
    "v-btn-normal": VBtnNormal,
    "v-modal": VModal,
    JqxComboBox,
    HereMap,
    vSelect
  },
  data() {
    return {
      latitude: "18.5204",
      longitude: "73.8567",
      errorMessage: "",
      item: "",
      formData: {
        siteName: null,
        siteType: null,
        latitude: null,
        longitude: null,
        city: null,
        wifiSSID: null,
        wifiPassword: null,
        seatCount: null,
        waterTankSize: null,
        sections: [""],
        info: {}
      },
      source: ["male", "female", "common", "outside"],
      dropdowns: [],
      searchText: null,
      markers: [],
      selectedCustomAttr: "",
      customAttrItems: [],
      customAttributes: []
    };
  },
  created() {
    this.getLocation();
    this.customAtt();
  },
  methods: {
    async customAtt() {
      this.customAttributes = await CustomAttrs();
    },
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.showPosition,
          this.showError,
        );
      } else {
        this.errorMessage = "Geolocation is not supported by this browser.";
      }
    },
    showPosition(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    showError(error) {
      this.latitude = "18.5073289";
      this.longitude = "73.8526493";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          this.errorMessage = "User denied the request for Geolocation.";
          break;
        case error.POSITION_UNAVAILABLE:
          this.errorMessage = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          this.errorMessage = "The request to get user location timed out.";
          break;
        case error.UNKNOWN_ERROR:
          this.errorMessage = "An unknown error occurred.";
          break;
      }
    },
    submit() {
      const section = [];
      this.formData.sections.forEach((sec) => {
        section.push({
          site_type: "section",
          site_subtype: sec
        });
      });
      Vue.$http
        .post("sites", {
          site_type: this.formData.siteType,
          site_subtype: "parent",
          is_parent: true,
          latitude: this.formData.latitude,
          longitude: this.formData.longitude,
          city: "Pune",
          name: this.formData.siteName,
          wifi_ssid: this.formData.wifiSSID,
          wifi_pwd: this.formData.wifiPassword,
          info: {
            seat_count: this.formData.seatCount,
            water_tank_size: this.formData.waterTankSize
          },
          sections_attributes: section
        })
        .then((response) => {
          const res = response.data;
          this.$notify({
            group: "alert",
            type: "success",
            text: "Site has been successfully created",
            width: 400
          });
          Vue.router.push({
            name: "map"
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
    addSection() {
      this.formData.sections.push("");
    },
    handleAddInfoChange(item) {
      const selectedItem = _.cloneDeep(item);
      if (selectedItem.type_name === "dropdown" && selectedItem.api) {
        selectedItem.options = ["Some Item", "Some Item"];
      }
      this.customAttrItems.push(selectedItem);
      this.customAttributes.splice(
        _.findIndex(this.customAttributes, { name: selectedItem.name }),
        1
      );
      this.selectedCustomAttr = "";
    },
    removeInfo(info) {
      this.customAttrItems.splice(_.findIndex(this.customAttrItems, { name: info.name }), 1);
      this.customAttributes.push(info);
      delete this.formData.info[info.name];
    },
    generate() {
      Vue.$http
        .get(`sites/wifi/generate?name=${this.formData.siteName}`)
        .then((response) => {
          const res = response.data;
          if (res.error) {
            this.$notify({
              group: "alert",
              type: "error",
              text: res.error,
              width: 400
            });
          } else {
            this.formData.wifiSSID = response.data.wifi_ssid;
            this.formData.wifiPassword = response.data.wifi_pwd;
          }
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

    search() {
      console.log("search");
    },

    onClickMap(pos) {
      this.markers = [];
      this.formData.latitude = pos.lat;
      this.formData.longitude = pos.long;
      this.markers.push(pos);
    }
  }
};
</script>

<style scoped>
.map-box {
  height: calc(100% - 133px);
  margin-top: 30px;
  display: grid;
}
@media (max-width: 767px) {
  .map-box {
    height: 500px;
  }
}
</style>
