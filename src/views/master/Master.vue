<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="item.key">
          <template v-if="locale === 'ko'">
            {{ item.menu }}
          </template>
          <template v-else-if="locale === 'en'">
            {{ item.menu_eng }}
          </template>
          <v-btn
            icon
            @click="removeTab(index)"
            class="ml-2"
            v-if="item.closeable"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        :style="'min-width:' + 100 + 'px;padding-top: 16px;'"
      >
        <v-tab-item v-for="item in items" :key="item.code">
          <template v-if="item.code === 'MBMGMT'">
            <UserMaster @dbClick="userDetail" ref="MBMGMT" />
          </template>
          <template v-if="item.code === 'userDetail'">
            <UserMasterDetail :data="userDetailData" ref="userDetail" />
          </template>
          <template v-if="item.code === 'SPMGMT'">
            <SampleMaster
              @sampleMasterDetail="sampleMasterDetail"
              @sampleAdd="sampleAdd"
              ref="SPMGMT"
            />
          </template>
          <template v-if="item.code === 'sampleDetail'">
            <SampleMasterDetail :data="sampleDetailData" ref="sampleDetail" />
          </template>
          <template v-if="item.code === 'sampleAdd'">
            <SampleAdd ref="sampleAdd" />
          </template>
          <template v-if="item.code === 'SAMGMT'">
            <MenstruumMaster
              @dbClick="menstruumMasterDetail"
              @menstruumAdd="menstruumAdd"
              ref="SAMGMT"
            />
          </template>
          <template v-if="item.code === 'menstruumDetail'">
            <MenstruumDetail
              :data="menstruumDetailData"
              ref="menstruumDetail"
            />
          </template>
          <template v-if="item.code === 'menstruumAdd'">
            <MenstruumAdd ref="menstruumAdd" />
          </template>
          <template v-if="item.code === 'STMGMT'">
            <MaterialIndex
              @dbClick="materialIndexDetail"
              @materialIndexAdd="materialIndexAdd"
              ref="STMGMT"
            />
          </template>
          <template v-if="item.code === 'materialIndexDetail'">
            <MaterialIndexDetail
              :data="materialIndexDetailData"
              ref="materialIndexDetail"
            />
          </template>
          <template v-if="item.code === 'materialIndexAdd'">
            <MaterialIndexAdd ref="materialIndexAdd" />
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
import SampleMaster from "@/views/master/masterTap/SampleMaster";
import SampleMasterDetail from "@/views/master/masterTap/SampleMasterDetail";
import MaterialIndex from "@/views/master/masterTap/MaterialIndex";
import MaterialIndexDetail from "@/views/master/masterTap/MaterialIndexDetail";
import MaterialIndexAdd from "@/views/master/masterTap/MaterialIndexAdd";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.setTab();
      }
    },
  },
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
      items: [],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
    ...mapState("locale", ["locale"]),
  },
  components: {
    SetDialog,
    UserMaster,
    UserMasterDetail,
    MenstruumMaster,
    SampleMaster,
    SampleMasterDetail,
    SampleAdd,
    MenstruumDetail,
    MenstruumAdd,
    MaterialIndex,
    MaterialIndexDetail,
    MaterialIndexAdd,
  },
  created() {
    this.SET_MENU();
    this.setTab();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    setTab() {
      const menu = this.$route.query.menu;
      this.items = this.getTab(menu);
      const ref = _.reduce(
        this.items,
        (a, c) => {
          if ((c.menu_eng = menu)) {
            a = c.code;
          }
          return a;
        },
        ""
      );
      setTimeout(() => {
        const tmp = this.$refs[ref];
        if (tmp) {
          const component = this.$refs[ref][0];
          if (_.has(component, "loadData")) {
            component.loadData();
          }
        } else {
          this.$router.push({ name: "main" });
        }
      }, 100);
    },
    findTab(code, menu, menu_eng, target, closeable, data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.code === code;
      });
      if (idx === -1) {
        this.items.push({
          code,
          menu,
          menu_eng,
          closeable,
          url: "/",
        });
        idx = _.findIndex(this.items, function (v) {
          return v.code === code;
        });
      }
      this.tab = idx;
      this[target] = data;
    },
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
    userDetail(data) {
      this.findTab(
        "userDetail",
        "회원 마스터 상세",
        "User Detail",
        "userDetailData",
        true,
        data
      );
    },
    sampleMasterDetail(data) {
      this.findTab(
        "sampleDetail",
        "샘플 마스터 상세",
        "Sample Code Detail",
        "sampleDetailData",
        true,
        data
      );
    },
    menstruumMasterDetail(data) {
      this.findTab(
        "menstruumDetail",
        "용매조성 마스터 상세",
        "Solvent Composition Detail",
        "menstruumDetailData",
        true,
        data
      );
    },
    sampleAdd() {
      this.findTab(
        "sampleAdd",
        "샘플 마스터 등록",
        "Sample Code Reg",
        "sampleAddData",
        true
      );
    },
    menstruumAdd() {
      this.findTab(
        "menstruumAdd",
        "용매조성 마스터등록",
        "Solevent Composition Reg",
        "menstruumAddData",
        true
      );
    },
    materialIndexDetail(data) {
      this.findTab(
        "materialIndexDetail",
        "물질명 INDEX 상세",
        "Substance Index Detail",
        "materialIndexDetailData",
        true,
        data
      );
    },
    materialIndexAdd() {
      this.findTab(
        "materialIndexAdd",
        "물질명 INDEX 등록",
        "Substance Index Add",
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
