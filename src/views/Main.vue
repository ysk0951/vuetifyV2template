<template>
  <div class="wrapper">
    <v-card height="600px">
      <SetDialog ref="mainModal" />
      <v-btn @click="reset">초기화</v-btn>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import _ from "lodash";
import { mapMutations, mapState } from "vuex";
export default {
  name: "Main",
  data() {
    return {
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
    ...mapMutations("menu", ["SET_MENU"]),
    reset() {
      this.SET_TOKEN({});
    },
  },
  async created() {
    if (_.isEmpty(this.accessToken)) {
      this.$router.push({ name: "login" });
    } else {
      this.SET_MENU();
    }
  },
};
</script>
<style></style>
