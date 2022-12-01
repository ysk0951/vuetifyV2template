<template>
  <v-dialog :max-width="this.maxWidth" v-model="open" persistent>
    <v-form ref="form" lazy-validation>
      <v-card
        :style="'height:' + this.height + 'px; width:100%'"
        class="tableParent"
      >
        <v-card-title v-if="this.dialogTitle"></v-card-title>
        <v-card-text v-if="this.dialogText">
          <p v-html="this.dialogText"></p>
        </v-card-text>
        <slot ref="slot"></slot>
        <div class="tableChild" v-if="!this.customApprove">
          <div class="wrapper">
            <v-card-actions v-if="this.closable">
              <v-btn depressed @click="closeModal">취소</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn depressed color="primary" @click="onApprove">{{
                approveName
              }}</v-btn>
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
  data() {
    return {
      paramProps: {},
      open: false,
      callback: "",
    };
  },
  computed: {
    ...mapState("modal", [
      "param",
      "height",
      "dialogTitle",
      "dialogText",
      "maxWidth",
      "closable",
      "customApprove",
      "approveName",
    ]),
  },
  methods: {
    openModal(cb) {
      this.open = true;
      this.callback = cb;
    },
    closeModal() {
      this.open = false;
    },
    onApprove() {
      this.closeModal();
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
