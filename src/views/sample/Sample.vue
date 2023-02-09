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
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.code === 'MSMGMT'">
            <UserSample @newSample="newSample" ref="MSMGMT" />
          </template>
          <template v-if="item.code === 'NUSMGMT'">
            <NewSample @newSample="newSample" ref="NUSMGMT" />
          </template>
          <template v-if="item.code === 'MAMGMT'">
            <AdminSample @newSample="newSample" ref="MAMGMT" />
          </template>
          <template v-if="item.code === 'SRMGMT'">
            <ConfirmSample @confirmDetail="confirmDetail" ref="SRMGMT" />
          </template>
          <template v-if="item.code === 'sampleRequestDetail'">
            <SampleRequestDetail
              ref="sampleRequestDetail"
              :data="sampleRequestDetailData"
            />
          </template>
          <template v-if="item.code === 'MMGMTM'">
            <SearchProcess ref="MMGMTM" />
          </template>
          <template v-if="item.code === 'MMGMT'">
            <SearchProcessCustom ref="MMGMT" />
          </template>
          <template v-if="item.code === 'OLMGMT'">
            <DeliveryReport ref="OLMGMT" @dbClick="delveryReportDetail" />
          </template>
          <template v-if="item.code === 'delivaryReportDetail'">
            <DeliveryReportDetail
              ref="delivaryReportDetail"
              :data="delivaryReportDetailData"
            />
          </template>
          <template v-if="item.code === 'RIMGMT'">
            <ResultInput ref="RIMGMT" />
          </template>
          <template v-if="item.code === 'qulityTestInput'">
            <QulityTestInput ref="qulityTestInput" />
          </template>
          <template v-if="item.code === 'report'">
            <Report ref="report" @reportDetail="reportDetail" />
          </template>
          <template v-if="item.code === 'reportDetail'">
            <ReportDetail ref="reportDetail" :data="reportDetailData" />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import UserSample from "@/views/sample/sampleTab/UserSample";
import AdminSample from "@/views/sample/sampleTab/AdminSample";
import ConfirmSample from "@/views/sample/sampleTab/ConfirmSample";
import SampleRequestDetail from "@/views/sample/sampleTab/SampleRequestDetail";
import SearchProcess from "@/views/sample/sampleTab/SearchProcess";
import SearchProcessCustom from "@/views/sample/sampleTab/SearchProcessCustom";
import DeliveryReport from "@/views/sample/sampleTab/DeliveryReport";
import DeliveryReportDetail from "@/views/sample/sampleTab/DeliveryReportDetail";
import ResultInput from "@/views/sample/sampleTab/ResultInput";
import QulityTestInput from "@/views/sample/sampleTab/QulityTestInput";
import Report from "@/views/sample/sampleTab/Report.vue";
import ReportDetail from "@/views/sample/sampleTab/ReportDetail.vue";
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import NewSample from "./sampleTab/NewSample.vue";
export default {
  data() {
    return {
      tab: 0,
      sampleRequestDetailData: {},
      reportDetailData: {},
      newSampleData: {},
      items: [],
    };
  },
  watch: {
    $route(to, from) {
      if (to.fullPath != from.fullPath) {
        this.setTab();
      }
    },
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
    ...mapState("locale", ["locale"]),
  },
  components: {
    SetDialog,
    UserSample,
    AdminSample,
    ConfirmSample,
    SampleRequestDetail,
    SearchProcess,
    SearchProcessCustom,
    DeliveryReport,
    DeliveryReportDetail,
    ResultInput,
    QulityTestInput,
    Report,
    ReportDetail,
    NewSample,
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
    removeTab(index) {
      this.items.splice(index, 1);
      this.tab = 0;
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
    delveryReportDetail(data) {
      this.findTab(
        "delivaryReportDetail",
        "납품일보 상세",
        "deliveray Report Detail",
        "delivaryReportDetailData",
        true,
        data
      );
    },
    confirmDetail(data) {
      this.findTab(
        "sampleRequestDetail",
        "샘플 요청상세",
        "Sample Request Detail",
        "sampleRequestDetailData",
        true,
        data
      );
    },
    newSample(data) {
      this.findTab(
        "NUSMGMT",
        "신규 샘플요청",
        "Users Sample MGMT",
        "newSampleData",
        true,
        data
      );
    },
    reportDetail(data) {
      this.findTab(
        "reportDetail",
        "제조 기록지 상세",
        "reportDetailData",
        true,
        data
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
