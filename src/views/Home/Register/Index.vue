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
          v-if="isAuth"
          md="8"
          align="right">
          <b-btn
            variant="primary"
            @click="createUser">Register User</b-btn>
        </b-col>
      </b-row>

      <b-table
        :fields="tableFields"
        :responsive="true"
        :items="users"
        :filter="search"
        :per-page="perPage"
        :current-page="currentPage"
        head-variant="eb-dark"
        table-class="table-events-list"
      >
        <template v-slot:cell(role_names)="data">
          <b-badge
            v-for="(roleName, id) in data.item.role_names"
            :key="id"
            variant="light"
          >{{ roleName }}</b-badge>
        </template>
        <template v-slot:cell(options)="data">
          <b-dropdown
            v-if="isAuth"
            variant="link"
            toggle-class=" dropdown text-decoration-none"
            no-caret
          >
            <template v-slot:button-content>
              <i class="fa fa-ellipsis-v menu-icon" />
            </template>
            <b-dropdown-item @click="assignRole(data.item.id)">Assign Role</b-dropdown-item>
            <b-dropdown-item @click="unassignRole(data.item.id)">Unassign Role</b-dropdown-item>
            <b-dropdown-item @click="deleteUser(data.item.id)">Delete</b-dropdown-item>
          </b-dropdown>
          <span v-else></span>
        </template>
      </b-table>
      <div class="row">
        <div class="col-md">
          <b-pagination
            :total-rows="users.length"
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
      ref="my-modal-assign"
      hide-footer
      title="Assign Role">
      <div class="d-block">
        <b-form-group
          id="input-group-2"
          label="Select Role:"
          label-for="input-2">
          <v-select
            v-validate="'required'"
            :options="unassignroles"
            v-model="roleName"
            name="role_name"
            placeholder="Enter role name"
          />
        </b-form-group>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="assign">Assign Role</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      ref="my-modal-unassign"
      hide-footer
      title="Unassign Role">
      <div class="d-block">
        <b-form-group
          id="input-group-2"
          label="Select Role:"
          label-for="input-2">
          <v-select
            v-validate="'required'"
            :options="assignrole"
            v-model="roleName"
            name="role_name"
            placeholder="Enter role name"
          />
        </b-form-group>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="unassign">Unassign Role</b-button>
        </b-col>
      </b-row>
    </b-modal>

    <b-modal
      ref="my-modal-user-registration"
      hide-footer
      title="User Registration">
      <div class="d-block">
        <b-form-group
          id="input-group-2"
          label="Name"
          label-for="input-2">
          <b-form-input
            v-validate="'required'"
            v-model="user.name"
            type="text"
            name="name"
            placeholder="Enter user name"
            class="form-control"
          />
          <span class="error-msg">{{ errors.first('name') }}</span>
        </b-form-group>

        <b-form-group id="input-group-2">
          <b-row>
            <b-col class="mb-2">{{ registerType === 'phone' ? 'Phone Number' : 'Email' }}</b-col>
            <b-col align="right">
              <a
                v-if="registerType === 'phone'"
                class="btn-switch width-interit"
                @click="switchTo('email')"
              >Signin with email</a>
              <a
                v-if="registerType === 'email'"
                class="btn-switch width-interit"
                @click="switchTo('phone')"
              >Signin with phone number</a>
            </b-col>
          </b-row>
          <template v-if="registerType === 'phone'">
            <b-form-input
              v-validate="'required|numeric'"
              v-model="user.mobile_number"
              type="number"
              name="phone"
              placeholder="Enter user mobile number"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('phone') }}</span>
          </template>
          <template v-else>
            <b-form-input
              v-validate="'required|email'"
              v-model="user.email"
              type="email"
              name="email"
              placeholder="Enter user email"
              class="form-control"
            />
            <span class="error-msg">{{ errors.first('email') }}</span>
          </template>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Role"
          label-for="input-2">
          <v-select
            v-validate="'required'"
            :options="roles"
            v-model="user.role_name"
            name="role_name"
            placeholder="Enter role name"
            multiple
          />
        </b-form-group>
      </div>
      <b-row>
        <b-col
          md="12"
          align="right">
          <b-button
            variant="primary"
            @click="register">Save !</b-button>
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
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  /**
   * The name of the page.
   */
  name: "RegisterIndex",
  components: {
    VLayout,
    JqxComboBox,
    "v-btn-normal": VBtnNormal,
    "v-select": vSelect
  },
  /**
   * The components that the page can use.
   */
  mixins: [validationMixin],
  data() {
    return {
      users: [],
      registerType: "email",
      selectedUserId: null,
      user: {
        name: null,
        email: null,
        mobile_number: null,
        role_name: "general"
      },
      roles: ["general", "admin", "officer", "supervisor", "superadmin"],
      search: "",
      tableFields: [
        {
          key: "name",
          sortable: true
        },
        {
          key: "email",
          sortable: true
        },
        {
          key: "role_names",
          sortable: true
        },
        {
          key: "options",
          sortable: true
        }
      ],
      perPage: 10,
      currentPage: 1,
      roleName: null,
      selectedRoleIndex: 0,
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
      ],
      unassignroles: [],
      assignrole: []
    };
  },
  validations: {
    user: {
      name: {
        required
      },
      email: {
        required
      }
    }
  },
  computed: {
    isAuth() {
      return this.$store.getters["account/isAuth"];
    }
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      Vue.$http
        .get("users")
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {});
    },

    createUser() {
      (this.user = {
        name: null,
        email: null,
        mobile_number: null,
        role_name: "general"
      }),
      (this.registerType = "email");
      this.$refs["my-modal-user-registration"].show();
    },

    switchTo(method) {
      this.user.email = null;
      this.user.mobile_number = null;
      this.registerType = method;
    },

    deleteUser(id) {
      this.selectedUserId = id;
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
              .delete("users", { params: { user_id: this.selectedUserId } })
              .then((response) => {
                this.fetchUsers();
                this.$notify({
                  group: "alert",
                  type: "success",
                  text: "User has been deleted successfully!",
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

    assignRole(id) {
      this.selectedUserId = id;
      const selectedUser = this.users.find(user => user.id === id);
      this.roleName = null;
      this.selectedRoleIndex = this.roles.indexOf(this.roleName);
      this.unassignroles = this.roles.filter(function (e) {
        return this.indexOf(e) < 0;
      }, selectedUser.role_names);
      this.$refs["my-modal-assign"].show();
    },

    unassignRole(id) {
      this.selectedUserId = id;
      const selectedUser = this.users.find(user => user.id === id);
      this.assignrole = selectedUser.role_names;
      this.selectedRoleIndex = this.roles.indexOf(this.roleName);
      this.$refs["my-modal-unassign"].show();
    },

    assign() {
      Vue.$http
        .post("users/assign", {
          user_id: this.selectedUserId,
          role: this.roleName
        })
        .then((response) => {
          this.$refs["my-modal-assign"].hide();
          this.fetchUsers();
          this.$notify({
            group: "alert",
            type: "success",
            text: "Role has been assigned successfully!",
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
    },

    unassign() {
      Vue.$http
        .post("users/unassign", {
          user_id: this.selectedUserId,
          role: this.roleName
        })
        .then((response) => {
          this.$refs["my-modal-assign"].hide();
          this.fetchUsers();
          this.$notify({
            group: "alert",
            type: "success",
            text: "Role has been assigned successfully!",
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
    },

    async register() {
      try {
        const result = Vue.$http.post("users", { user: this.user });
        this.$refs["my-modal-user-registration"].hide();
        this.fetchUsers();
        this.$notify({
          group: "alert",
          type: "success",
          text: "User has been registered successfully!",
          width: 400
        });
      } catch (error) {
        const res = error.response.data;
        this.$notify({
          group: "alert",
          type: "error",
          text: res.error,
          width: 400
        });
        console.log("error", error);
      }
    }
  }
};
</script>
<style scoped>
.main-content {
  padding: 35px 25px 0 25px;
}

.details-group {
  display: block;
  width: 100%;
}

.sensor {
  display: inline-flex;
  width: 100%;
  height: 60px;
  background-color: #fff;
  margin: 10px 0px;
  padding: 8px 0 12px 0;
  border-radius: 4px;
  line-height: 3 !important;
}

.header {
  font-size: 15px;
  font-weight: 500;
  color: #39475b;
}

.body {
  font-size: 15px;
  color: #39475b;
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

.email {
  width: 25%;
}

.mobile-number {
  width: 17%;
}

.role-name {
  width: 13%;
}

.edit {
  width: 15%;
}

.btn-group {
  width: 410px;
  height: 50px;
  padding: 0 15px;
  position: absolute;
  right: 0px;
}

.circle {
  width: 16px;
  height: 16px;
  background-color: #39475b;
  border-radius: 50%;
  position: absolute;
  margin: 16px;
  margin-left: 30px;
}

.active {
  background-color: #1ed660;
}

.buttons {
  margin-bottom: 34px;
}

.sensor-status {
  /* margin-bottom: 15px; */
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

.custom-modal .input-group p {
  font-size: 15px;
  font-weight: 500;
  color: #263035;
}

span.password {
  width: 160px;
  display: inline-flex;
}

.close-button {
  padding-right: 30px !important;
  min-width: 92px !important;
}

hr {
  margin: 25px 45px -15px 45px;
}

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
.badge {
  font-weight: 400;
  font-size: 0.8rem;
  margin-right: 5px;
}

.dropdown {
  width: 25px;
  height: 10px;
  position: relative;
  bottom: 10px;
}
.dropdown ul {
  top: 8px;
}
.menu-icon {
  font-size: 20px;
}
</style>
