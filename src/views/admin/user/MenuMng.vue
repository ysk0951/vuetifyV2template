<template>
  <div>
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
                >{{ item }}</v-btn
              >
            </div>
            <div class="wrapper">
              <v-card-actions>
                <v-btn depressed @click="closePopup">그룹삭제</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn depressed color="primary" @click="onApprove"
                  >그룹추가
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
          <v-col cols="12" sm="9" class="menuCol">
            <div class="pa-9" style="background-color: rgba(0, 0, 0, 0.02)">
              <h4>그룹명</h4>
              <v-text-field
                :width="'300px'"
                outlined
                dense
                placeholder="이름을 입력해주세요"
                class="menuColText"
              ></v-text-field>
              <h4>메인화면</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>현황확인</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.new">
                  <template v-slot:label>
                    <h5>신규 리스트</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>지연 리스트</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>회원가입</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>회원가입</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.new">
                  <template v-slot:label>
                    <h5>아이디 찾기</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>비밀번호 찾기</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>사용자 계정 관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>아이디 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.new">
                  <template v-slot:label>
                    <h5>비밀번호 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>메뉴권한 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>공통코드 관리</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>샘플요청</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>회원 샘플요청</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.new">
                  <template v-slot:label>
                    <h5>관리자 샘플요청</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>진행사항 조회</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>샘플요청 확인/확정</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>결과 입력</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.delay">
                  <template v-slot:label>
                    <h5>이메일 발송</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>서류관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>CDA 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>MSDS 보증서 관리</h5>
                  </template></v-checkbox
                >
              </div>
              <h4>마스터 관리</h4>
              <div class="checkbox ml-8">
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>회원 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>상품 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>용매조성 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>물질명 index 마스터 관리</h5>
                  </template></v-checkbox
                >
                <v-checkbox v-model="main.current">
                  <template v-slot:label>
                    <h5>희석 용매 ㄹ마스터 관리</h5>
                  </template></v-checkbox
                >
              </div>
            </div>
            <div class="wrapperEnd">
              <v-card-actions>
                <v-btn depressed @click="closePopup">취소</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn depressed color="primary" @click="onApprove"
                  >저장
                </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  data() {
    return {
      main: {
        new: false,
        delay: false,
        current: false,
      },
    };
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
