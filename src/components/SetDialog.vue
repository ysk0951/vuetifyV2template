<template>
  <v-dialog max-width="500" v-model="open">
    <v-form ref="form" lazy-validation>
      <v-card>
        <v-card-title>{{ setDialog.dialogTitle }}</v-card-title>
        <v-card-text>
          {{ setDialog.dialogText }}
        </v-card-text>
        <v-card-actions style="justify-content: center">
          <v-btn class="approve" @click="closeModal">확인</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    setDialog: {
      type: Object,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  computed: {},
  methods: {
    openModal(openCb) {
      this.open = true;
      if (_.isFunction(openCb)) {
        openCb();
      }
    },
    closeModal() {
      this.open = false;
    },
  },
};
</script>
<style>
.approve {
  background-color: black !important;
}
.approve span {
  color: white;
}
</style>
