<template>
  <div>
    <SetPopup ref="confirm" />
    <SetPopup ref="addPopup">
      <div class="wrapper">
        <template v-if="!check">
          <v-card-actions>
            <v-btn depressed @click="cancel">취소</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="addExec">생성</v-btn>
          </v-card-actions>
        </template>
      </div>
    </SetPopup>
    <SetDialog ref="add">
      <AddAcount @close="close" @save="save" />
    </SetDialog>
    <h3 class="mt-4 mb-2">아이디 관리</h3>
    <hr class="mb-4" />
    <div class="service">
      <v-form ref="form" lazy-validation>
        <div class="filter mb-3">
          <v-row class="row">
            <v-col cols="12" sm="1" class="pl-0">
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
                placeholder="이름을 입력해주세요"
                v-model="input.memberName"
                :rules="[this.validSet.name]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>이메일</h4>
              <v-text-field
                outlined
                dense
                v-model="input.memberId"
                placeholder="이메일 주소를 입력해주세요"
                :rules="[this.validSet.email]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <h4>기업명</h4>
              <v-text-field
                outlined
                dense
                v-model="input.company"
                placeholder="기업명을 입력해주세요"
                :rules="[this.validSet.company]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2">
              <h4>사번</h4>
              <v-text-field
                outlined
                dense
                v-model="input.employeeCode"
                placeholder="사번을 입력해주세요"
                :rules="[this.validSet.employNumber]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="1" class="pr-0">
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
          <v-card-actions class="mr-0">
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
        @btnClick="update"
      />
    </div>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/account";
import SetDialog from "@/components/SetDialog.vue";
import SetPopup from "@/components/SetPopup.vue";
import AddAcount from "@/views/admin/user/AddAcount.vue";
import RealGrid from "@/components/RealGrid.vue";
import { memberList, memberJoin, userInfoUpdate } from "api/member/member";
import { mapMutations, mapState } from "vuex";
import validSet from "@/assets/valid";
import _ from "lodash";
export default {
  data() {
    return {
      input: {
        employeeStatus: "전체",
        roles: "전체",
        memberName: "",
        memberId: "",
        company: "",
        employeeCode: "",
        pageSize: 10,
      },
      accountType: [],
      check: false,
      settings: {
        columns,
        fields,
        rows,
        height,
        errorMessage: "데이터가 없습니다",
        hideCheckBar: true,
      },
      validSet,
      grid: "acount",
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
    this.loadData();
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
        roles: "전체",
        memberName: "",
        memberId: "",
        company: this.company,
        employeeCode: "",
      };
    },
    loadData(v) {
      this.onApprove(v);
    },
    valid() {
      return this.$refs.form.validate();
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
      })
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          _.each(items, (v) => {
            v.save = "저장";
            switch (v.employee_status) {
              case 1:
                v.work = "재직";
                break;
              case 2:
                v.work = "퇴사";
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
      this.saveParam = param;
      this.openPopup("입력된 정보로 아이디를 생성하시겠습니까?");
    },
    close() {
      this.check = false;
      this.$refs.add.closeModal();
    },
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
        customApprove: true,
      });
      this.$refs.addPopup.openPopup(cb);
    },
    openConfirm(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    cancel() {
      this.saveParam = {};
      this.$refs.addPopup.closePopup();
    },
    addExec() {
      this.$refs.addPopup.closePopup();
      const param = _.cloneDeep(this.saveParam);
      switch (param.employeeStatus) {
        case "재직중":
          param.employee_status = 1;
          break;
        case "퇴사":
          param.employee_status = 2;
          break;
        case "전체":
          param.employee_status = "";
          break;
      }
      memberJoin(param)
        .then(() => {
          this.openConfirm("신규 생성되었습니다", false, () => {
            this.$refs.addPopup.closePopup();
          });
        })
        .catch((err) => {
          this.openConfirm(err, false, () => {
            this.$refs.addPopup.closePopup();
          });
        });
    },
    update(row) {
      const test = confirm("저장하시겠습니까?");
      if (test) {
        let employee_status = "";
        // let roles = "";
        switch (row.work) {
          case "재직중":
            employee_status = 1;
            break;
          case "퇴사":
            employee_status = 2;
            break;
        }

        userInfoUpdate({ ...row, memberId: row.email, employee_status })
          .then((res) => {
            const response = res.data;
            console.log(response);
          })
          .catch(() => {
            this.cancel();
          });
      }
    },
  },

  components: {
    SetDialog,
    SetPopup,
    AddAcount,
    RealGrid,
  },
};
</script>
<style lang="scss">
.filter {
  padding-right: 7px;
}
.filter .row {
  margin: auto;
  height: 67px;
}
.service {
  margin: auto;
  width: 100%;
  .v-input__slot {
    width: 100% !important;
  }
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
