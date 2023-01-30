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
          <template v-if="item.key === 'userSample'">
            <UserSample @newSample="newSample" ref="userSample" />
          </template>
          <template v-if="item.key === 'newSample'">
            <NewSample @newSample="newSample" ref="newSample" />
          </template>
          <template v-if="item.key === 'adminSample'">
            <AdminSample @newSample="newSample" ref="adminSample" />
          </template>
          <template v-if="item.key === 'confirmSample'">
            <ConfirmSample @confirmDetail="confirmDetail" ref="confirmSample" />
          </template>
          <template v-if="item.key === 'sampleRequestDetail'">
            <SampleRequestDetail
              ref="sampleRequestDetail"
              :data="sampleRequestDetailData"
            />
          </template>
          <template v-if="item.key === 'searchProcess'">
            <SearchProcess ref="searchProcess" />
          </template>
          <template v-if="item.key === 'searchProcessCustom'">
            <SearchProcessCustom ref="searchProcessCustom" />
          </template>
          <template v-if="item.key === 'delivaryReport'">
            <DeliveryReport ref="delivaryReport" />
          </template>
          <template v-if="item.key === 'delivaryReportDetail'">
            <DeliveryReportDetail ref="delivaryReportDetail" />
          </template>
          <template v-if="item.key === 'resultInput'">
            <ResultInput ref="resultInput" />
          </template>
          <template v-if="item.key === 'qulityTestInput'">
            <QulityTestInput ref="qulityTestInput" />
          </template>
          <template v-if="item.key === 'report'">
            <Report ref="report" />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import UserSample from "@/views/sample/sampleTab/UserSample";
import NewSample from "@/views/sample/sampleTab/NewSample";
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
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      tab: 0,
      sampleRequestDetailData: {},
      items: [
        {
          key: "userSample",
          value: "회원 샘플 요청",
        },
        {
          key: "adminSample",
          value: "관리자 샘플 요청",
        },
        {
          key: "confirmSample",
          value: "샘플 요청 검수",
        },
        {
          key: "searchProcessCustom",
          value: "진행사항 조회(사용자)",
        },
        {
          key: "searchProcess",
          value: "진행사항 조회(관리자)",
        },
        {
          key: "delivaryReport",
          value: "납품 일보",
        },
        {
          key: "delivaryReportDetail",
          value: "납품 일보상세",
        },
        {
          key: "resultInput",
          value: "결과 입력",
        },
        {
          key: "qulityTestInput",
          value: "품질검사 결과 입력",
        },
        {
          key: "report",
          value: "제조 기록지",
        },
      ],
    };
  },
  watch: {
    tab: function (v) {
      setTimeout(() => {
        const ref = this.items[v].key;
        const component = this.$refs[ref][0];
        if (_.has(component, "loadData")) {
          component.loadData();
        }
      }, 100);
    },
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
    UserSample,
    NewSample,
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
  },
  created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
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
    newSample(data) {
      this.findTab("newSample", "신규 샘플요청", "newSampleData", true, data);
    },
    confirmDetail(data) {
      this.findTab(
        "sampleRequestDetail",
        "샘플 요청상세",
        "sampleRequestDetailData",
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
