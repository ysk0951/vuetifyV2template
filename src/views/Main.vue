<template>
  <div class="wrapper">
    <v-card height="600px" width="1200px">
      <SetDialog :setDialog="this.setDialog" ref="mainModal" />
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
// import _ from "lodash";
export default {
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "",
      },
      checkbox: false,
      showPwd: false,
      id: "",
      pw: "",
    };
  },
  components: {
    SetDialog,
  },
  computed: {},
  methods: {},
};
</script>
<style></style>
