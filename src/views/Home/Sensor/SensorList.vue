<template>
  <div class="mt-4">
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
      </b-row>
      <b-table
        :fields="tableFields"
        :responsive="true"
        :items="sensors"
        :filter="search"
        :per-page="perPage"
        :current-page="currentPage"
        table-class="table-events-list"
        head-variant="eb-dark"
      >
        <template v-slot:cell(site)="data">
          <router-link :to="`site-details/${data.item.site.parent_id}`">Go Site Details</router-link>
        </template>
        <template v-slot:cell(section)="data">
          <span>{{ data.item.site.site_subtype }}</span>
        </template>
        <template v-slot:cell(site_name)="data">
          <span>{{ data.item.site.name }}</span>
        </template>
      </b-table>
      <div class="row">
        <div class="col-md">
          <b-pagination
            :total-rows="sensors.length"
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
  </div>
</template>

<script>
import { sensorList } from "../../../services/sensor.js";

export default {
  name: "Sensor",
  data() {
    return {
      sensors: [],
      search: "",
      tableFields: [
        {
          key: "id"
        },
        {
          key: "mac_id",
          sortable: true
        },
        {
          key: "section",
          sortable: true
        },
        {
          key: "site_name",
          sortable: true
        },
        {
          key: "sensor_type",
          sortable: true
        },
        {
          key: "current_firmware"
        },
        {
          key: "site"
        }
      ],
      perPage: 10,
      currentPage: 1,
      showUsersPerPageList: [
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
      ]
    };
  },
  created() {
    this.getSensorList();
  },
  methods: {
    async getSensorList() {
      const result = await sensorList();
      this.sensors = result.sensors;
    }
  }
};
</script>

<style scoped>
.table-events-list {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
  margin-bottom: 0;
  border-radius: 15px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 40px;
  overflow: hidden;
}

.table-responsive {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
