<template>
  <SetDialog></SetDialog>
</template>
<script>
import _ from "lodash";
import { mapMutations, mapState } from "vuex";
import SetDialog from "./SetDialog.vue";
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
    ...mapMutations("modal", ["RESET_MODAL"]),
    openModal(cb) {
      this.open = true;
      this.callback = cb;
    },
    closeModal() {
      this.open = false;
      this.RESET_MODAL();
    },
    onApprove() {
      this.closeModal();
      if (_.isFunction(this.callback)) {
        this.callback();
      }
    },
  },
  components: { SetDialog },
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
