<template>
  <div>
    <SetDialogVue ref="add">
      <AddGroup />
    </SetDialogVue>
    <h3 class="mt-4 mb-2">메뉴 관리</h3>
    <hr class="mb-4" />
    <div class="service">
      <div>
        <v-row class="row menuMngCol wrapper">
          <v-col cols="12" sm="2" class="menuCol">
            <div>
              <v-btn
                v-for="(item, index) in this.roleType"
                depressed
                class="type mb-3"
                :key="index"
                @click="curBtn(item)"
                >{{ item }}</v-btn
              >
            </div>
            <div class="wrapper">
              <v-card-actions>
                <v-btn depressed @click="delGroup">그룹삭제</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn depressed color="primary" @click="addGroup"
                  >그룹추가
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
          <v-col cols="12" sm="9" class="menuCol">
            <div class="pa-9 background">
              <h4>그룹명</h4>
              <v-text-field
                :width="'300px'"
                outlined
                dense
                placeholder="이름을 입력해주세요"
                class="menuColText"
                v-model="curBtnValue"
              ></v-text-field>
              <h4>메인화면</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.CURRENT">
                  <template v-slot:label>
                    <h5>현황확인</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.NEW">
                  <template v-slot:label>
                    <h5>신규 리스트</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.DELAY">
                  <template v-slot:label>
                    <h5>지연 리스트</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>회원가입</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.SINGUP">
                  <template v-slot:label>
                    <h5>회원가입</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.FINDID">
                  <template v-slot:label>
                    <h5>아이디 찾기</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.FINDPW">
                  <template v-slot:label>
                    <h5>비밀번호 찾기</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>사용자 계정 관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.MGNID">
                  <template v-slot:label>
                    <h5>아이디 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MGNPW">
                  <template v-slot:label>
                    <h5>비밀번호 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MGNMENU">
                  <template v-slot:label>
                    <h5>메뉴권한 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MGNCODE">
                  <template v-slot:label>
                    <h5>공통코드 관리</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>샘플요청</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.USERSAMPLE">
                  <template v-slot:label>
                    <h5>회원 샘플요청</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MGNSAMPLE">
                  <template v-slot:label>
                    <h5>관리자 샘플요청</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.SEARCHPROCESS">
                  <template v-slot:label>
                    <h5>진행사항 조회</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.SAMPLECOMFIRM">
                  <template v-slot:label>
                    <h5>샘플요청 확인/확정</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.INPUTRESULT">
                  <template v-slot:label>
                    <h5>결과 입력</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.SENDEMAIL">
                  <template v-slot:label>
                    <h5>이메일 발송</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>서류관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.CDAMGN">
                  <template v-slot:label>
                    <h5>CDA 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MSDMGN">
                  <template v-slot:label>
                    <h5>MSDS 보증서 관리</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>마스터 관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.MASTERUSER">
                  <template v-slot:label>
                    <h5>회원 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MASTERPRODUCT">
                  <template v-slot:label>
                    <h5>상품 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MASTERMENSTRUUM">
                  <template v-slot:label>
                    <h5>용매조성 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.MASTERINDEX">
                  <template v-slot:label>
                    <h5>물질명 index 마스터 관리</h5>
                  </template></v-checkbox
                >
              </div>
            </div>
            <div class="wrapperEnd">
              <v-card-actions>
                <v-btn depressed @click="cancle">취소</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn depressed color="primary" @click="save">저장 </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <h3 class="mt-4 mb-2">그룹 목록</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import SetDialogVue from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid";
import RolesEnum from "@/assets/rolesEnum";
import { columns, fields, rows } from "@/assets/account";
import AddGroup from "@/views/admin/user/AddGroup";
export default {
  computed: {
    ...mapState("select", ["workType", "roleType", "roleSet"]),
  },
  components: {
    RealGrid,
    SetDialogVue,
    AddGroup,
  },
  data() {
    return {
      main: {
        CURRENT: false,
        NEW: false,
        DELAY: false,
        SINGUP: false,
        FINDID: false,
        FINDPW: false,
        MGNID: false,
        MGNPW: false,
        MGNMENU: false,
        MGNCODE: false,
        USERSAMPLE: false,
        MGNSAMPLE: false,
        SEARCHPROCESS: false,
        SAMPLECOMFIRM: false,
        INPUTRESULT: false,
        SENDEMAIL: false,
        CDAMGN: false,
        MSDMGN: false,
        MASTERUSER: false,
        MASTERPRODUCT: false,
        MASTERINDEX: false,
        MASTERMENSTRUUM: false,
      },
      curBtnValue: "",
      grid: "menuMgn",
      settings: { columns, fields, rows },
    };
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
    curBtn(v) {
      this.curBtnValue = v;
      const idx = _.findIndex(this.roleSet, function (o) {
        return o.roleName === v;
      });
      const roles = this.roleSet[idx].roles;
      console.log(roles);
      console.log(RolesEnum.CURRENT);
    },
    addGroup() {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
      });
      this.$refs.add.openModal();
    },
    delGroup() {},
    cancle() {},
    save() {},
  },
};
</script>
<style lang="scss">
.type {
  width: 100%;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  border: solid;
}
.menuMngCol {
  height: 650px !important;
}
.menuCol {
  display: flex;
  flex-direction: column;
  margin: 5px;
  justify-content: space-between;
  .menuColText {
    .v-input__slot {
      width: 300px !important;
    }
  }
}
.checkbox {
  display: flex;
  .v-input__slot {
    margin-right: 15px;
  }
}
</style>
