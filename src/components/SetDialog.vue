<template>
  <v-dialog :max-width="setting.maxWidth" v-model="open">
    <v-form ref="form" lazy-validation>
      <v-card :style="'height:' + setting.height + 'px'" class="tableParent">
        <v-card-title v-if="setting.dialogTitle">{{
          setting.dialogTitle
        }}</v-card-title>
        <v-card-text v-if="setting.dialogText">
          {{ setting.dialogText }}
        </v-card-text>
        <slot></slot>
        <div class="tableChild">
          <div class="wrapper">
            <v-card-actions v-if="setting.closable">
              <v-btn @click="closeModal">취소</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn class="approve" @click="opApprove">확인</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    setting: {
      type: Object,
    },
  },
  data() {
    return {
      open: false,
      cb: "",
    };
  },
  computed: {},
  methods: {
    openModal(openCb) {
      this.open = true;
      if (_.isFunction(openCb)) {
        this.cb = openCb;
      }
    },
    closeModal() {
      this.open = false;
    },
    opApprove() {
      this.closeModal();
      this.cb();
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

.tableParent {
  border-collapse: collapse;
  display: table;
}

.tableChild {
  display: table-row;
  vertical-align: bottom;
  height: 1px;
}
</style>
