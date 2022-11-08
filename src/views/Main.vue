<template>
  <div class="wrapper">
    <v-card height="600px" width="1200px">
      <SetDialog :setting="this.setDialog" ref="mainModal" />
      <v-btn @click="reset">초기화</v-btn>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import { getToken, setToken } from "@/store/moduleExec/memberEx";
import _ from "lodash";
export default {
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "",
        maxWidth: 500,
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
  methods: {
    reset() {
      setToken(this, {});
    },
  },
  created() {
    const token = getToken(this);
    if (_.isEmpty(token.accessToken)) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
<style></style>
