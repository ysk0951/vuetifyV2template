<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="item.key">
          {{ item.value }}
          <v-btn
            icon
            @click="removeTab(index)"
            class="ml-2"
            v-if="item.closeable"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
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
            <SmapleMaster
              @sampleMasterDetail="sampleMasterDetail"
              @sampleAdd="sampleAdd"
            />
          </template>
          <template v-if="item.key === 'sampleDetail'">
            <SmapleMasterDetail :data="sampleDetailData" />
          </template>
          <template v-if="item.key === 'sampleAdd'">
            <SampleAdd />
          </template>
          <template v-if="item.key === 'menstruum'">
            <MenstruumMaster
              @dbClick="menstruumMasterDetail"
              @menstruumAdd="menstruumAdd"
            />
          </template>
          <template v-if="item.key === 'menstruumDetail'">
            <MenstruumDetail :data="menstruumDetailData" />
          </template>
          <template v-if="item.key === 'menstruumAdd'">
            <MenstruumAdd />
          </template>
          <template v-if="item.key === 'materialIndex'">
            <MaterialIndex
              @dbClick="materialIndexDetail"
              @materialIndexAdd="materialIndexAdd"
            />
          </template>
          <template v-if="item.key === 'materialIndexDetail'">
            <MaterialIndexDetail :data="materialIndexDetailData" />
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
      sampleAddData: {},
      menstruumDetailData: {},
      menstruumAddData: {},
      materialIndexDetailData: {},
      materialIndexAddData: {},
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
          key: "menstruum",
          value: "용매조성 마스터관리",
        },

        {
          key: "materialIndex",
          value: "물질명 INDEX",
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
  watch: {
    tab: function (v) {
      if (v === 0) {
        this.reset();
      }
    },
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    reset() {
      this.userDetailData = {};
      this.sampleDetailData = {};
      this.sampleAddData = {};
      this.menstruumDetailData = {};
      this.menstruumAddData = {};
    },
    removeTab(index) {
      this.items.splice(index, 1);
      this.tab = 0;
    },
    findTab(key, value, target, closeable, data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.key === key;
      });
      if (idx === -1) {
        this.items.push({
          key,
          value,
          closeable,
        });
        idx = _.findIndex(this.items, function (v) {
          return v.key === key;
        });
      }
      this.tab = idx;
      this[target] = data;
    },
    userDetail(data) {
      this.findTab(
        "userDetail",
        "회원 마스터 상세",
        "userDetailData",
        true,
        data
      );
    },
    sampleMasterDetail(data) {
      this.findTab(
        "sampleDetail",
        "샘플 마스터 상세",
        "sampleDetailData",
        true,
        data
      );
    },
    menstruumMasterDetail(data) {
      this.findTab(
        "menstruumDetail",
        "용매조성 마스터 상세",
        "menstruumDetailData",
        true,
        data
      );
    },
    sampleAdd() {
      this.findTab("sampleAdd", "샘플 마스터 등록", "sampleAddData", true);
    },
    menstruumAdd() {
      this.findTab(
        "menstruumAdd",
        "용매조성 마스터등록",
        "menstruumAddData",
        true
      );
    },
    materialIndexDetail(data) {
      this.findTab(
        "materialIndexDetail",
        "물질명 INDEX 상세",
        "materialIndexDetailData",
        true,
        data
      );
    },
    materialIndexAdd() {
      this.findTab(
        "materialIndexAdd",
        "물질명 INDEX 등록",
        "materialIndexAddData",
        true
      );
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
