<template>
  <div class="cardWrapper">
    <v-card class="mt-12">
      <SetDialog ref="aggreModal"></SetDialog>
      <SetDialog ref="postModal">
        <SignupPost
          @closeModal="this.closePost"
          @onApprove="this.approvePost"
        ></SignupPost>
      </SetDialog>
      <div class="pa-10">
        <h3 style="text-align: left" class="mb-3">회원가입</h3>
        <hr class="mb-6" />
        <h4 style="text-align: left" class="mb-3">회원가입 약관동의 (필수)</h4>
        <div class="wrapperSpace signUpAgree mb-3">
          <div>
            <v-checkbox v-model="agree.service">
              <template v-slot:label>
                <h5>서비스 이용약관 동의</h5>
              </template>
            </v-checkbox>
          </div>
          <div>
            <v-btn depressed color="primary" @click="open_agree"
              >전문 보기</v-btn
            >
          </div>
        </div>
        <div class="wrapperSpace signUpAgree mb-3">
          <div>
            <v-checkbox v-model="agree.private">
              <template v-slot:label>
                <h5>개인정보활용 동의</h5>
              </template></v-checkbox
            >
          </div>
          <div>
            <v-btn depressedd color="primary" @click="open_agree"
              >전문 보기</v-btn
            >
          </div>
        </div>
        <hr class="hrUnderLine mb-6" />
        <h4 style="text-align: left" class="mb-3">기본정보 입력 (필수)</h4>
        <div class="wrapperSpace inputRow">
          <SignupInputVue
            placeholder="이름을 입력해주세요"
            label="이름"
            v-model="param.name"
          />
          <div style="display: flex; width: 500px">
            <v-subheader class="my-4" style="width: 130px"
              >휴대폰 번호</v-subheader
            >
            <v-select
              :items="numbers"
              outlined
              dense
              class="signInput select"
              style="width: 50px"
              v-model="param.areaCode"
              item-text="name"
              item-value="value"
            ></v-select>
            <v-text-field
              placeholder="000-0000-0000"
              v-model="param.phone"
              outlined
              dense
              class="signInput phoneInput"
              type="text"
              autocomplete="off"
              style="width: 200px"
            ></v-text-field>
          </div>
        </div>
        <div class="wrapperSpace inputRow">
          <SignupInputVue
            placeholder="이메일 주소를 입력해주세요"
            label="이메일 주소"
            v-model="param.email"
            :sideBtn="true"
            btnText="인증번호 받기"
          />
          <SignupInputVue
            placeholder="인증번호를 입력해주세요"
            label="이메일 인증번호"
            v-model="param.emailCode"
            :sideBtn="true"
            btnText="인증번호 확인"
          />
        </div>
        <div class="wrapperSpace inputRow">
          <SignupInputVue
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            type="password"
            append-icon="mdi-eye"
            v-model="param.password"
          />
          <SignupInputVue
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호 재확인"
            type="password"
            append-icon="mdi-eye"
            v-model="param.passwordCode"
          />
        </div>
        <div class="wrapperSpace">
          <SignupInputVue
            placeholder="배송지를 등록해주세요"
            label="배송지"
            type="text"
            v-model="param.postCode"
            :sideBtn="true"
            btnText="배송지 등록"
            class="post"
            :click="openPost"
          />
        </div>
        <hr class="hrUnderLine mb-6" />
        <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
        <div class="wrapperSpace">
          <SignupInputVue
            placeholder="기업명을 입력해주세요"
            label="기업명"
            type="text"
            v-model="param.compaynCode"
          />
        </div>
        <hr class="hrUnderLine mb-6" />
        <div class="wrapper">
          <v-card-actions>
            <v-btn depressed @click="closeModal">취소</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="opApprove">확인</v-btn>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import SignupInputVue from "@/views/member/SignupInput.vue";
import SignupPost from "@/views/member/SignupPost.vue";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      numbers: [
        {
          name: "한국",
          value: 82,
        },
      ],
      checkbox: false,
      showPwd: false,
      agree: {
        service: false,
        private: false,
      },
      param: {
        name: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        passwordCode: "",
        postCode: "",
        companyCode: "",
        areaCode: "82",
      },
    };
  },
  components: {
    SetDialog,
    SignupPost,
    SignupInputVue,
  },
  computed: {
    pwdType() {
      if (this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
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
    closeModal() {
      this.$router.push({ name: "login" });
    },
    closePost() {
      this.$refs.postModal.closeModal();
    },
    approvePost(param) {
      console.log(param);
    },
    opApprove() {
      this.$router.push({ name: "signupDone" });
    },
    open_agree() {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
      });
      this.$refs.aggreModal.openModal();
    },
    openPost() {
      this.SET_MODAL({
        height: 600,
        width: 650,
        closable: true,
        customApprove: true,
      });
      this.$refs.postModal.openModal();
    },
  },
};
</script>
<style>
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}

.underLogin {
  display: flex;
  justify-content: space-between;
}
.inputRow {
  height: 60px;
}
.underLogin span {
  cursor: pointer;
}

.hrUnderLine {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1) !important;
  border-top: none;
  border-left: none;
}

.signUpAgree {
  width: 88%;
  margin: auto;
}

.signInput .v-input__slot {
  position: absolute;
  top: 19px;
  width: 300px;
}

.signInputWithBtn .v-input__slot {
  position: absolute;
  top: 19px;
  width: 180px;
}

.v-select .v-input__slot {
  width: 100px;
}

.phoneInput .v-input__slot {
  width: 191px;
}
.signBtn {
  position: absolute;
  height: 39px !important;
  top: 19px;
  right: 69px;
  width: 113px;
}
.cardWrapper {
  display: flex;
  justify-content: center;
}
/*
* post Code Detail 
*/
div.cardWrapper > div > div.pa-10 > div:nth-child(11) > div > button {
  right: 74px;
}
</style>
