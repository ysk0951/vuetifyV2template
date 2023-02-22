<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs :value="tab">
        <v-tab
          v-for="item in this.selectMenu"
          :key="item.key"
          @click="tabChange(item)"
        >
          <template v-if="locale === 'ko'">
            {{ item.menu }}
          </template>
          <template v-else-if="locale === 'en'">
            {{ item.menu_eng }}
          </template>
          <v-btn icon @click="removeTab(item.code)" class="ml-2"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </v-tab>
      </v-tabs>
      <v-tabs-items
        :value="tab"
        :style="'min-width:' + 100 + 'px;padding-top: 16px;'"
      >
        <v-tab-item v-for="item in this.selectMenu" :key="item.code">
          <template v-if="item.code === 'IDMGMT'">
            <Accont ref="IDMGMT" />
          </template>
          <template v-if="item.code === 'PWMGMT'">
            <AccontPw ref="PWMGMT" />
          </template>
          <template v-if="item.code === 'LGMGMT'">
            <LoginMgn ref="LGMGMT" />
          </template>
          <template v-if="item.code === 'MUMGMT'">
            <MenuMgn ref="MUMGMT" />
          </template>
          <template v-if="item.code === 'CDMGMT'">
            <CodeMgn @dbClick="codeDetail" ref="CDMGMT" />
          </template>
          <template v-if="item.code === 'CDMGMTDT'">
            <CodeDetail :data="codeDetailData" ref="CDMGMTDT" />
          </template>
          <template v-if="item.code === 'LMMGMT'">
            <LangCode ref="LMMGMT" />
          </template>
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
          <template v-if="item.code === 'COMGMT'">
            <COA @dbClick="coaDetail" ref="COMGMT" />
          </template>
          <template v-if="item.code === 'coaDetail'">
            <COADetail :data="coaDetailData" />
          </template>
          <template v-if="item.code === 'MSMGMT'">
            <UserSample
              @newSample="newSample"
              ref="MSMGMT"
              @dbClick="openSearchProcessCustom"
            />
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
import NewSample from "@/views/sample/sampleTab/NewSample.vue";
import Accont from "@/views/admin/user/Account.vue";
import AccontPw from "@/views/admin/user/AccountPw.vue";
import MenuMgn from "@/views/admin/user/MenuMng.vue";
import LoginMgn from "@/views/admin/user/LoginMgn.vue";
import CodeMgn from "@/views/admin/user/CodeMgn.vue";
import CodeDetail from "@/views/admin/user/CodeDetail.vue";
import LangCode from "@/views/admin/user/LangCode";
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
import COA from "@/views/document/documentTap/COA";
import COADetail from "@/views/document/documentTap/COADetail";
export default {
  watch: {
    selectMenu: {
      deep: true,
      handler: function (v) {
        if (v.length < 1) {
          this.$router.push({ name: "main" });
        } else {
          setTimeout(() => {
            if (v[this.tab] && v[this.tab].code) {
              const ref = v[this.tab].code;
              const tmp = this.$refs[ref];
              if (tmp) {
                const component = this.$refs[ref][0];
                if (_.has(component, "loadData")) {
                  component.loadData();
                }
              }
            }
          }, 100);
        }
      },
    },
    tab(v) {
      setTimeout(() => {
        if (this.selectMenu[v]) {
          const ref = this.selectMenu[v].code;
          const tmp = this.$refs[ref];
          if (tmp) {
            const component = this.$refs[ref][0];
            if (_.has(component, "loadData")) {
              component.loadData();
            }
          }
        }
      }, 100);
    },
  },
  data() {
    return {
      sampleRequestDetailData: {},
      reportDetailData: {},
      newSampleData: {},
      codeDetailData: {},
      userDetailData: {},
      sampleDetailData: {},
      sampleAddData: {},
      menstruumDetailData: {},
      menstruumAddData: {},
      materialIndexDetailData: {},
      materialIndexAddData: {},
      coaDetailData: {},
      items: [],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu", "selectMenu", "tab"]),
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
    Accont,
    AccontPw,
    MenuMgn,
    LoginMgn,
    CodeMgn,
    CodeDetail,
    LangCode,
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
    COA,
    COADetail,
  },
  created() {
    this.SET_MENU();
    if (this.selectMenu.length < 1) {
      this.$router.push({ name: "main" });
    }
  },
  methods: {
    ...mapMutations("menu", [
      "SET_MENU",
      "ADD_MENU_TAB",
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
    tabChange(item) {
      this.SET_SELECT_MENU_TAB_BY_CODE(item.code);
    },
    findTab(code, menu, menu_eng, target, closeable, data) {
      let idx = _.findIndex(this.selectMenu, function (v) {
        return v.code === code;
      });
      if (idx === -1) {
        this.ADD_MENU_TAB({
          code,
          menu,
          menu_eng,
          closeable,
          url: "/",
        });
        idx = _.findIndex(this.selectMenu, function (v) {
          return v.code === code;
        });
      }
      this.SET_SELECT_MENU_TAB(idx);
      this[target] = data;
    },
    reset() {
      this.userDetailData = {};
      this.sampleDetailData = {};
      this.sampleAddData = {};
      this.menstruumDetailData = {};
      this.menstruumAddData = {};
    },
    removeTab(code) {
      this.REMOVE_SELECT_MENU(code);
    },
    userDetail(data) {
      this.findTab(
        "userDetail",
        "회원 상세",
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
    codeDetail(data) {
      this.findTab(
        "CDMGMTDT",
        "코드 상세",
        "Code Detail",
        "codeDetailData",
        true,
        data
      );
    },
    coaDetail(data) {
      this.findTab(
        "coaDetail",
        "COA 상세",
        "COA Detail",
        "coaDetailData",
        true,
        data
      );
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
    openSearchProcessCustom() {
      console.log(1);
      this.findTab("MMGMT", "진행 사항 조회 (사용자)", null, true, null);
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
