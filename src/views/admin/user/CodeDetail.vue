<template>
  <div>
    <SetDialog ref="add">
      <AddAcount @close="close" @save="save" />
    </SetDialog>
    <h3 class="mt-4 mb-2">공통코드 상세</h3>
    <hr class="mb-4" />
    <h4 class="mt-10 mb-2">기본 정보</h4>
    <hr class="mb-4" />
    <h4 class="mt-10 mb-2">상세 정보</h4>
    <hr class="mb-4" />
    <div class="service login">
      <div class="filter">
        <v-row class="row">
          <v-col cols="12" sm="3">
            <h4>공통코드명</h4>
            <v-text-field
              outlined
              dense
              placeholder="공통코드명을 입력해주세요"
              v-model="input.memberName"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>코드</h4>
            <v-text-field
              outlined
              dense
              filled
              disabled
              v-model="input.memberName"
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div class="wrapperSpace">
        <div></div>
      </div>
      <h3 class="mt-16 mb-2 pl-1 pr-1">
        <div class="wrapperSpace">
          목록
          <div>
            <v-btn depressed @click="add">삭제</v-btn>
            <v-btn depressed color="primary" @click="add">항목추가</v-btn>
          </div>
        </div>
      </h3>
      <hr class="mb-4" />
      <RealGrid
        :domName="grid"
        ref="grid"
        :settings="settings"
        @changePage="loadData"
      />
    </div>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/codeMgn";
import SetDialog from "@/components/SetDialog.vue";
import AddAcount from "@/views/admin/user/AddAcount.vue";
import RealGrid from "@/components/RealGrid.vue";
import { memberList, memberJoin } from "api/member/member";
import { mapMutations, mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      input: {
        employeeStatus: "전체",
        roles: "",
        memberName: "",
        memberId: "",
        company: "",
        employeeCode: "",
      },
      accountType: [],
      check: false,
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      grid: "loginMgn",
      currentPage: 1,
      pageSize: 10,
      saveParam: {},
    };
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  mounted() {
    this.SET_POPUP({
      title: "알림",
      height: 150,
      width: 300,
      customApprove: true,
    });
    this.input.roles = this.roleType[0];
  },
  methods: {
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    reset() {
      this.input = {
        employeeStatus: "전체",
        roles: "",
        memberName: "",
        memberId: "",
        company: this.company,
        employeeCode: "",
      };
    },
    loadData(v) {
      this.currentPage = v;
      this.onApprove();
    },
    onApprove() {
      const param = _.cloneDeep(this.input);
      switch (param.employeeStatus) {
        case "재직중":
          param.employeeStatus = 1;
          break;
        case "퇴사":
          param.employeeStatus = 2;
          break;
        case "전체":
          param.employeeStatus = "";
          break;
      }

      memberList({
        ...param,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          _.each(items, function (v) {
            v.work = v.employee_status;
          });
          this.$refs.grid.loadData(items);
          this.$refs.grid.setPage(page);
        })
        .catch((res) => {
          console.error(res);
        })
        .finally();
    },
    add() {
      this.SET_MODAL({
        height: 500,
        width: 750,
        closable: true,
        approveName: "저장",
        customApprove: true,
      });
      this.$refs.add.openModal();
    },
    save(param) {
      this.close();
      this.openPopup("입력된 정보로 아이디를 생성하시겠습니까?");
      this.saveParam = param;
    },
    close() {
      this.check = false;
      this.$refs.add.closeModal();
    },
    openPopup(message, cb) {
      this.SET_POPUP_TEXT(message);
      this.$refs.addPopup.openPopup(cb);
    },
    cancel() {
      this.saveParam = {};
      this.$refs.addPopup.closePopup();
    },
    addExec() {
      const param = _.cloneDeep(this.saveParam);
      switch (param.employeeStatus) {
        case "재직중":
          param.employeeStatus = 1;
          break;
        case "퇴사":
          param.employeeStatus = 2;
          break;
        case "전체":
          param.employeeStatus = "";
          break;
      }
      console.log("exec");
      memberJoin(param)
        .then((res) => {
          const response = res.data;

          console.log(response);
        })
        .catch(() => {
          this.cancel();
        });
    },
  },

  components: {
    SetDialog,
    AddAcount,
    RealGrid,
  },
};
</script>
<style>
.login .v-input__slot {
  width: 100% !important;
}
</style>
