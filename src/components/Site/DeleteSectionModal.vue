<template>
  <div>
    <modal
      name="delete-section-modal"
      width="400"
      height="180">
      <div class="modal-inside alert-modal">
        <div class="col-md-12 text-center msg">Are you sure you want to delete?</div>
        <div class="col-md-12 d-flex">
          <div class="col-md-6">
            <v-btn-normal
              :on-click="cancelRemove"
              :width="'100%'"
              :height="'45px'">Cancel</v-btn-normal>
          </div>
          <div class="col-md-6">
            <v-btn-normal
              :on-click="deleteSection"
              :type="'btn-red'"
              :width="'100%'"
              :height="'45px'"
            >Delete</v-btn-normal>
          </div>
        </div>
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
  methods: {
    cancelRemove() {
      this.$emit("cancelRemove");
    },
    deleteSection() {
      this.$emit("deleteSection");
    }
  }
};
</script>
