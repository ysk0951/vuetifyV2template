<template>
  <div>
    <SetDialog ref="add">
      <AddAcount @close="close" @save="save" />
    </SetDialog>
    <h3 class="mt-4 mb-2">로그인 관리</h3>
    <hr class="mb-4" />
    <div class="service login">
      <v-form ref="form" lazy-validation>
        <div class="filter">
          <v-row class="row">
            <v-col cols="12" sm="3">
              <h4>계정 구분</h4>
              <v-select
                :items="this.roleType"
                v-model="input.roles"
                outlined
                :id="'account'"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>로그인 방식</h4>
              <v-select
                :items="code.L"
                v-model="input.logintype"
                outlined
                :id="'account'"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>이름</h4>
              <v-text-field
                outlined
                dense
                placeholder="이름을 입력해주세요"
                v-model="input.memberName"
                :rules="[this.validSet.name]"
              ></v-text-field>
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
          <v-btn depressed color="primary" @click="add">신규생성</v-btn>
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
import { columns, fields, rows, height } from "@/assets/grid/loginMgn";
import SetDialog from "@/components/SetDialog.vue";
import AddAcount from "@/views/admin/user/AddAcount.vue";
import RealGrid from "@/components/RealGrid.vue";
import { loginLog } from "api/member/member";
import { mapMutations, mapState } from "vuex";
import _ from "lodash";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      input: {
        roles: "전체",
        logintype: "전체",
        memberName: "",
        pageSize: 10,
      },
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
      },
      grid: "loginMgn",
      validSet,
    };
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
    ...mapState("common", ["code"]),
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
        roles: "전체",
        memberName: "",
        logintype: "전체",
        pageSize: 10,
      };
    },
    valid() {
      return this.$refs.form.validate();
    },
    loadData(v) {
      this.onApprove(v);
    },
    onApprove(v) {
      if (this.valid()) {
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
        switch (param.logintype) {
          case "AD":
            param.logintype = 1;
            break;
          case "SSO":
            param.logintype = 2;
            break;
          case "전체":
            param.logintype = "";
            break;
        }
        loginLog({
          ...param,
          currentPage: _.isNumber(v) ? v : 1,
          pageSize: this.pageSize,
        })
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            const page = response.data.params;
            _.each(items, (v) => {
              switch (v.logintype) {
                case 1:
                  v.logintype = "AD";
                  break;
                case 2:
                  v.logintype = "SSO";
                  break;
              }
              switch (v.employee_status) {
                case 1:
                  v.employee_status = "재직중";
                  break;
                case 2:
                  v.employee_status = "퇴사";
                  break;
              }
            });
            this.$refs.grid.loadData(items);
            this.$refs.grid.setPage(page);
          })
          .catch((res) => {
            console.error(res);
          })
          .finally();
      }
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
