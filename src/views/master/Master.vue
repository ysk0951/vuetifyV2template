<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.key">
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'user'">
            <UserMaster />
          </template>
          <template v-if="item.key === 'userDetail'">
            <UserMasterDetail />
          </template>
          <template v-if="item.key === 'sample'">
            <SmapleMaster />
          </template>
          <template v-if="item.key === 'sampleDetail'">
            <SmapleMasterDetail />
          </template>
          <template v-if="item.key === 'menstruum'">
            <MenstruumMaster />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import UserMaster from "@/views/master/masterTap/UserMaster";
import UserMasterDetail from "@/views/master/masterTap/UserMasterDetail";
import MenstruumMaster from "@/views/master/masterTap/MenstruumMaster";
import SmapleMaster from "@/views/master/masterTap/SmapleMaster";
import SmapleMasterDetail from "@/views/master/masterTap/SmapleMasterDetail";

import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tab: 0,
      items: [
        {
          key: "user",
          value: "회원 마스터 관리",
        },
        {
          key: "userDetail",
          value: "회원 상세",
        },
        {
          key: "sample",
          value: "샘플 마스터 관리",
        },
        {
          key: "sampleDetail",
          value: "샘플 마스터 상세",
        },
        {
          key: "menstruum",
          value: "용매조성 마스터관리",
        },
      ],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
    UserMaster,
    UserMasterDetail,
    MenstruumMaster,
    SmapleMaster,
    SmapleMasterDetail,
  },
  async created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
  },
};
</script>
<style scoped>
.full {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>
