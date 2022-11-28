<template>
  <v-dialog :max-width="this.maxWidth" v-model="open" persistent>
    <v-form ref="form" lazy-validation>
      <v-card
        :style="'height:' + this.height + 'px; width:100%'"
        class="tableParent"
      >
        <v-card-title v-if="this.dialogTitle">{{
          this.dialogTitle
        }}</v-card-title>
        <v-card-text v-if="this.dialogText">
          {{ this.dialogText }}
        </v-card-text>
        <slot ref="slot"></slot>
        <div class="tableChild" v-if="!this.customApprove">
          <div class="wrapper">
            <v-card-actions v-if="this.closable">
              <v-btn depressed @click="closePopup">취소</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn depressed color="primary" @click="onApprove">확인</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script>
import _ from "lodash";
import { mapState } from "vuex";
export default {
  props: {
    slotProps: {
      type: Object,
    },
  },
  data() {
    return {
      paramProps: {},
      open: false,
      cb: "",
    };
  },
  computed: {
    ...mapState("popup", [
      "param",
      "height",
      "dialogTitle",
      "dialogText",
      "maxWidth",
      "closable",
      "callback",
      "customApprove",
    ]),
  },
  methods: {
    openPopup() {
      this.open = true;
    },
    closePopup() {
      this.open = false;
    },
    onApprove() {
      this.closePopup();
      if (_.isFunction(this.callback)) {
        this.callback();
      }
    },
  },
};
</script>
<style>
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
