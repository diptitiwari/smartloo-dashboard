<template>
  <div>
    <modal
      name="section-modal"
      width="570"
      height="300">
      <div class="modal-inside custom-modal">
        <div class="col-md-12 text-center text-uppercase mb-4">
          <h5>Section Registration</h5>
        </div>
        <form>
          <div class="form-group">
            <div class="input-group">
              <p>Section Type</p>
              <JqxComboBox
                v-model="section"
                :width="'100%'"
                :height="50"
                :source="sectionTypes"
                :selected-index="0"
              />
            </div>
          </div>
          <div class="form-group row justify-content-center">
            <div class="col-md-6">
              <v-btn-normal
                :on-click="handleSubmit"
                :width="'100%'"
                :height="'55px'"
              >Submit</v-btn-normal>
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
