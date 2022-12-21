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
          <template v-if="item.key === 'userSample'">
            <UserSample @newSample="newSample" ref="user" />
          </template>
          <template v-if="item.key === 'newSample'">
            <NewSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'adminSample'">
            <AdminSample @newSample="newSample" />
          </template>
          <template v-if="item.key === 'confirmSample'">
            <ConfirmSample
              @confirmDetail="confirmDetail"
              :confirmDetailData="confirmDetailData"
            />
          </template>
          <template v-if="item.key === 'sampleRequestDetail'">
            <SampleRequestDetail @newSample="newSample" />
          </template>
          <template v-if="item.key === 'searchProcess'">
            <SearchProcess />
          </template>
          <template v-if="item.key === 'searchProcessCustom'">
            <SearchProcessCustom />
          </template>
          <template v-if="item.key === 'delivaryReport'">
            <DeliveryReport />
          </template>
          <template v-if="item.key === 'delivaryReportDetail'">
            <DeliveryReportDetail />
          </template>
          <template v-if="item.key === 'resultInput'">
            <ResultInput />
          </template>
          <template v-if="item.key === 'qulityTestInput'">
            <QulityTestInput />
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
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      tab: 0,
      confirmDetailData: {},
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
          key: "sampleRequestDetail",
          value: "샘플 요청 상세",
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
      ],
    };
  },
  watch: {
    tab: function (v) {
      if (v === 0) {
        this.$refs.user[0].loadData();
      }
      this.confirmDetailData = {};
      console.log(v);
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
  },
  async created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    newSample() {
      let newSampleIdx = _.findIndex(this.items, function (v) {
        return v.key === "newSample";
      });
      if (newSampleIdx === -1) {
        this.items.push({
          key: "newSample",
          value: "신규 샘플 요청",
        });
        newSampleIdx = _.findIndex(this.items, function (v) {
          return v.key === "newSample";
        });
      }
      this.tab = newSampleIdx;
    },
    confirmDetail(data) {
      let newSampleIdx = _.findIndex(this.items, function (v) {
        return v.key === "newSample";
      });
      if (newSampleIdx === -1) {
        this.items.push({
          key: "sampleRequestDetail",
          value: "샘플 요청 상세",
        });
        newSampleIdx = _.findIndex(this.items, function (v) {
          return v.key === "sampleRequestDetail";
        });
      }
      this.confirmDetailData = data;
      this.tab = newSampleIdx;
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
