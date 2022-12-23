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
            <UserMaster @dbClick="userDetail" />
          </template>
          <template v-if="item.key === 'userDetail'">
            <UserMasterDetail :data="userDetailData" />
          </template>
          <template v-if="item.key === 'sample'">
            <SmapleMaster @sampleMasterDetail="sampleMasterDetail" />
          </template>
          <template v-if="item.key === 'sampleDetail'">
            <SmapleMasterDetail :data="sampleDetailData" />
          </template>
          <template v-if="item.key === 'sampleAdd'">
            <SampleAdd />
          </template>
          <template v-if="item.key === 'menstruum'">
            <MenstruumMaster />
          </template>
          <template v-if="item.key === 'menstruumDetail'">
            <MenstruumDetail />
          </template>
          <template v-if="item.key === 'menstruumAdd'">
            <MenstruumAdd />
          </template>
          <template v-if="item.key === 'materialIndex'">
            <MaterialIndex />
          </template>
          <template v-if="item.key === 'materialIndexDetail'">
            <MaterialIndexDetail />
          </template>
          <template v-if="item.key === 'materialIndexAdd'">
            <MaterialIndexAdd />
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
import MenstruumDetail from "@/views/master/masterTap/MenstruumDetail";
import MenstruumAdd from "@/views/master/masterTap/MenstruumAdd";
import SampleAdd from "@/views/master/masterTap/SampleAdd";
import SmapleMaster from "@/views/master/masterTap/SmapleMaster";
import SmapleMasterDetail from "@/views/master/masterTap/SmapleMasterDetail";
import MaterialIndex from "@/views/master/masterTap/MaterialIndex";
import MaterialIndexDetail from "@/views/master/masterTap/MaterialIndexDetail";
import MaterialIndexAdd from "@/views/master/masterTap/MaterialIndexAdd";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      tab: 0,
      userDetailData: {},
      sampleDetailData: {},
      items: [
        {
          key: "user",
          value: "회원 마스터 관리",
        },
        {
          key: "sample",
          value: "샘플 마스터 관리",
        },
        {
          key: "sampleAdd",
          value: "샘플 마스터 등록",
        },
        {
          key: "menstruum",
          value: "용매조성 마스터관리",
        },
        {
          key: "menstruumDetail",
          value: "용매조성 마스터 상세",
        },
        {
          key: "menstruumAdd",
          value: "용매조성 마스터등록",
        },
        {
          key: "materialIndex",
          value: "물질명 INDEX",
        },
        {
          key: "materialIndexDetail",
          value: "물질명 INDEX 상세",
        },
        {
          key: "materialIndexAdd",
          value: "물질명 INDEX 등록",
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
    SampleAdd,
    MenstruumDetail,
    MenstruumAdd,
    MaterialIndex,
    MaterialIndexDetail,
    MaterialIndexAdd,
  },
  async created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    userDetail(data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.key === "userDetail";
      });
      if (idx === -1) {
        this.items.push({
          key: "userDetail",
          value: "회원 마스터 상세",
        });
        idx = _.findIndex(this.items, function (v) {
          return v.key === "userDetail";
        });
      }
      this.tab = idx;
      this.userDetailData = data;
    },
    sampleMasterDetail(data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.key === "sampleDetail";
      });
      if (idx === -1) {
        this.items.push({
          key: "sampleDetail",
          value: "샘플 마스터 상세",
        });
        idx = _.findIndex(this.items, function (v) {
          return v.key === "sampleDetail";
        });
      }
      this.tab = idx;
      this.sampleDetailData = data;
    },
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
