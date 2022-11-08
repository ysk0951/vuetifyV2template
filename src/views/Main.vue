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
import _ from "lodash";
import { mapMutations, mapState } from "vuex";
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
  computed: {
    ...mapState("member", ["accessToken"]),
  },
  methods: {
    ...mapMutations("member", ["SET_TOKEN"]),
    reset() {
      this.SET_TOKEN({});
    },
  },
  created() {
    if (_.isEmpty(this.accessToken)) {
      this.$router.push({ name: "login" });
    }
  },
};
</script>
<style></style>
