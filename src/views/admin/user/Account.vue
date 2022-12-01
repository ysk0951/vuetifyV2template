<template>
  <div>
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
      <div class="filter">
        <v-row class="row">
          <v-col cols="12" sm="1">
            <h4>계정 구분</h4>
            <v-select
              :items="accountType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="input.type"
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
              v-model="input.name"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>이메일</h4>
            <v-text-field
              outlined
              dense
              v-model="input.email"
              placeholder="이메일 주소를 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>기업명</h4>
            <v-text-field
              outlined
              dense
              v-model="input.coName"
              placeholder="기업명을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>사번</h4>
            <v-text-field
              outlined
              dense
              v-model="input.coNumber"
              placeholder="사번을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="1">
            <h4>재직</h4>
            <v-select
              :items="workType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="input.work"
              outlined
              id="work"
            ></v-select>
          </v-col>
        </v-row>
      </div>
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
      <RealGrid :domName="grid" ref="grid" :settings="settings" />
    </div>
  </div>
</template>
<script>
import { columns, fields, rows } from "@/assets/account";
import SetDialog from "@/components/SetDialog.vue";
import SetPopup from "@/components/SetPopup.vue";
import AddAcount from "@/views/admin/user/AddAcount.vue";
import RealGrid from "@/components/RealGrid.vue";
import { memberList } from "api/member/member";
import { mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      input: {
        work: "all",
        type: "all",
        name: "",
        email: "",
        coName: "",
        coNumber: "",
      },
      accountType: [
        {
          key: "all",
          text: "전체",
        },
        {
          key: "admin",
          text: "관리자",
        },
        {
          key: "user",
          text: "회원",
        },
      ],
      workType: [
        {
          key: "all",
          text: "전체",
        },
        {
          key: "work",
          text: "재직중",
        },
        {
          key: "resign",
          text: "퇴사",
        },
      ],
      check: false,
      settings: {
        columns,
        fields,
        rows,
      },
      param: {},
      grid: "acouunt",
    };
  },
  mounted() {
    this.SET_POPUP({
      title: "알림",
      height: 150,
      width: 300,
      customApprove: true,
    });
    this.reset();
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
        work: "all",
        type: "all",
        name: "",
        email: "",
        coName: "",
        coNumber: "",
      };
    },
    onApprove() {
      const param = {
        company: "",
        currentPage: "1",
        employeeCode: "",
        employeeStatus: 0,
        gubun: "",
        memberId: "",
        memberName: "",
        pageSize: "10",
        roles: "",
      };
      memberList(param)
        .then((res) => {
          const response = res.data;
          const items = response.data.items;
          _.each(items, function (v) {
            v.work = v.employee_status === 1 ? "재직중" : "퇴사자";
          });
          this.$refs.grid.loadData(items);
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
      this.openPopup("입력된 정보로 아이디를 생성하시겠습니까?");
      this.param = param;
      this.close();
    },
    close() {
      this.check = false;
      this.$refs.add.closeModal();
    },
    openPopup(message) {
      this.SET_POPUP_TEXT(message);
      this.$refs.addPopup.openPopup();
    },
    cancel() {
      this.param = {};
      this.$refs.addPopup.closePopup();
    },
    addExec() {
      this.cancel();
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
<style>
.filter {
  /* background-color: wheat; */
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02) !important;
  background-color: rgba(0, 0, 0, 0.02);
  padding-bottom: 13px;
  padding-right: 15px;
}
.add .row {
  margin: auto;
  height: 80px;
}
.filter .row {
  margin: auto;
  height: 80px;
}
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
