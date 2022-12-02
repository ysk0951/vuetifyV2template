<template>
  <div>
    <SetPopup ref="pwPopup">
      <div class="wrapper">
        <template v-if="!check">
          <v-card-actions>
            <v-btn depressed @click="cancel">취소</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="resetExec">초기화</v-btn>
          </v-card-actions>
        </template>
      </div>
    </SetPopup>
    <SetPopup ref="pwConfirm" />
    <h3 class="mt-4 mb-2">비밀번호 관리</h3>
    <hr class="mb-4" />
    <div class="service">
      <div class="filter">
        <v-row class="row">
          <v-col cols="12" sm="1">
            <h4>계정 구분</h4>
            <v-select
              :items="this.roleType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="input.employeeStatus"
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
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>이메일</h4>
            <v-text-field
              outlined
              dense
              v-model="input.memberId"
              placeholder="이메일 주소를 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <h4>기업명</h4>
            <v-text-field
              outlined
              dense
              v-model="input.company"
              placeholder="기업명을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>사번</h4>
            <v-text-field
              outlined
              dense
              v-model="input.employeeCode"
              placeholder="사번을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="1">
            <h4>재직</h4>
            <v-select
              :items="this.workType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="input.employeeStatus"
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
          <v-btn depressed color="primary" @click="resetPw" :width="'237px'"
            >비밀번호초기화</v-btn
          >
        </div>
      </h3>
      <hr class="mb-4" />
      <RealGrid :domName="grid" ref="grid" :settings="settings" />
    </div>
  </div>
</template>
<script>
import { columns, fields, rows } from "@/assets/account";
import SetPopup from "@/components/SetPopup.vue";
import RealGrid from "@/components/RealGrid.vue";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      input: {
        employeeStatus: 0,
        roles: 0,
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
      },
      param: {},
      grid: "password",
    };
  },
  mounted() {
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
        employeeStatus: 0,
        roles: 0,
        memberName: "",
        memberId: "",
        company: "",
        employeeCode: "",
      };
    },
    onApprove() {
      this.$refs.grid.search();
    },
    resetPw() {
      this.openPopup("선택한 아이디의 비밀번호를 초기화 하시겠습니까?");
      this.close();
    },
    close() {
      this.check = false;
      this.$refs.add.closeModal();
    },
    openPopup(message) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        customApprove: true,
      });
      this.SET_POPUP_TEXT(message);
      this.$refs.pwPopup.openPopup();
    },
    cancel() {
      this.param = {};
      this.$refs.pwPopup.closePopup();
    },
    resetExec() {
      this.cancel();
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        customApprove: false,
      });
      this.SET_POPUP_TEXT("비밀번호가 초기화 되었습니다");
      this.$refs.pwConfirm.openPopup();
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
.filter {
  /* background-color: wheat; */
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02) !important;
  background-color: rgba(0, 0, 0, 0.02);
  padding-bottom: 13px;
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
