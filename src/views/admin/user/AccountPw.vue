<template>
  <div>
    <SetPopup ref="pwPopup" />
    <SetPopup ref="pwConfirm" />
    <div class="service">
      <h3 class="mb-2">비밀번호 관리</h3>
      <v-form ref="form" lazy-validation>
        <div class="filter mb-3">
          <v-row class="row">
            <v-col cols="12" sm="1">
              <h4>계정 구분</h4>
              <v-select
                :items="this.roleType"
                v-model="input.roles"
                outlined
                :id="'account'"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="2">
              <h4>이름</h4>
              <v-text-field
                outlined
                dense
                placeholder="이름을 입력해 주세요."
                v-model="input.memberName"
                :rules="[this.validSet.name]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>이메일 주소</h4>
              <v-text-field
                outlined
                dense
                v-model="input.memberId"
                placeholder="이메일 주소를 입력해 주세요."
                :rules="[this.validSet.email]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>기업명</h4>
              <v-text-field
                outlined
                dense
                v-model="input.company"
                placeholder="기업명을 입력해 주세요."
                :rules="[this.validSet.company]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <h4>사번</h4>
              <v-text-field
                outlined
                dense
                v-model="input.employeeCode"
                placeholder="사번을 입력해 주세요."
                :rules="[this.validSet.employNumber]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1">
              <h4>재직</h4>
              <v-select
                :items="this.workType"
                v-model="input.employeeStatus"
                outlined
                id="work"
              ></v-select>
            </v-col>
          </v-row>
        </div>
      </v-form>
      <div class="wrapperSpace">
        <div></div>
        <div class="wrapper">
          <v-card-actions>
            <v-btn depressed @click="reset">초기화</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="onApprove">검색</v-btn>
          </v-card-actions>
        </div>
      </div>
      <h3 class="mt-16 mb-2 pl-1 pr-1">
        <div class="wrapperSpace">
          목록
          <v-btn depressed color="primary" @click="resetPw" :width="'147px'"
            >비밀번호 초기화</v-btn
          >
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
import { columns, fields, rows, height } from "@/assets/grid/accountPw";
import SetPopup from "@/components/SetPopup.vue";
import RealGrid from "@/components/RealGrid.vue";
import { mapMutations, mapState } from "vuex";
import { memberList, resetPass } from "api/member/member";
import _ from "lodash";
import validSet from "@/assets/valid";
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
      check: false,
      settings: {
        columns,
        fields,
        rows,
        height,
        radio: true,
        errorMessage: "조회된 내용이 없습니다",
      },
      param: {},
      grid: "password",
      validSet,
    };
  },
  mounted() {
    this.reset();
    this.input.roles = this.roleType[0];
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),

    reset() {
      this.input = {
        employeeStatus: "전체",
        roles: "전체",
        memberName: "",
        memberId: "",
        company: "",
        employeeCode: "",
      };
    },
    loadData(v) {
      this.onApprove(v);
    },
    onApprove(v) {
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
        currentPage: _.isNumber(v) ? v : 1,
        pageSize: 10,
      })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          _.each(items, (v) => {
            switch (v.employee_status) {
              case 1:
                v.work = "재직";
                break;
              case 2:
                v.work = "퇴사";
                break;
            }
          });
          this.$refs.grid.setPage(page);
          this.$refs.grid.loadData(items);
        })
        .catch((res) => {
          console.error(res);
        })
        .finally();
    },
    resetPw() {
      const check = this.$refs.grid.getCheckedRow();
      if (check.length > 0) {
        this.openPopup(
          "선택한 아이디의 비밀번호를 초기화 하시겠습니까?",
          true,
          this.resetExecRun
        );
      } else {
        this.openPopup("초기화할 아이디를 선택해주세요");
      }
    },
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        approveName: closable ? "초기화" : "확인",
        text,
        closable,
      });
      this.$refs.pwPopup.openPopup(cb);
    },
    cancel() {
      this.param = {};
      this.$refs.pwPopup.closePopup();
    },
    resetExecRun() {
      const row = this.$refs.grid.getCheckedRow()[0];
      const resetEmail = row.email;
      resetPass(resetEmail)
        .then((res) => {
          const body = res.data;
          if (!_.isEmpty(body.errorCode)) {
            this.openPopup(`Error(${body.errorCode}) : 관리자에게 문의하세요`);
          } else {
            this.openPopup(body.message);
          }
        })
        .catch((err) => {
          this.openPopup(`Error(${err}) : 관리자에게 문의하세요`);
        });
    },
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  components: {
    SetPopup,
    RealGrid,
  },
};
</script>
<style>
.service {
  margin: auto;
  width: 100%;
}

.filter .v-select__slot > div.v-select__selections {
  position: absolute;
  top: 0;
}
div.v-input__slot > fieldset {
  height: 46px !important;
}

div.v-select__slot > div.v-input__append-inner > div {
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
