<template>
  <div>
    <b-modal
      id="sectionRegister"
      hide-footer
      title="Section Registration">
      <div class="d-block">
        <b-form-group
          id="input-group-2"
          label="Section Type:"
          label-for="input-2">
          <JqxComboBox
            v-model="section"
            :width="'100%'"
            :height="35"
            :source="sectionTypes"
            :selected-index="0"
          />
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
import VLayout from "@/layouts/Default.vue";
import JqxComboBox from "jqwidgets-scripts/jqwidgets-vue/vue_jqxcombobox.vue";
import VBtnNormal from "@/components/buttons/BtnNormal.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  components: {
    VLayout,
    JqxComboBox,
    "v-btn-normal": VBtnNormal,
    "v-select": vSelect
  },
  mixins: [validationMixin],
  data() {
    return {
      section: "male",
      sectionTypes: ["male", "female", "common", "outside"]
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("register", this.section);
    }
  }
};
</script>
