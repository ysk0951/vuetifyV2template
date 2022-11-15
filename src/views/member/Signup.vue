<template>
  <div class="cardWrapper">
    <v-card height="800px" width="1800px" class="mt-12">
      <SetDialog ref="signupModal" />
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
            <v-btn depressed color="primary">전문 보기</v-btn>
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
            <v-btn depressedd color="primary">전문 보기</v-btn>
          </div>
        </div>
        <hr class="hrUnderLine mb-6" />
        <h4 style="text-align: left" class="mb-3">기본정보 입력 (필수)</h4>
        <div class="wrapperSpace inputRow">
          <SignUpInputVue
            placeholder="이름을 입력해주세요"
            label="이름"
            v-model="param.name"
          />
          <SignUpInputVue
            placeholder="이름을 입력해주세요"
            label="핸드폰 번호"
          />
        </div>
        <div class="wrapperSpace inputRow">
          <SignUpInputVue
            placeholder="이름을 입력해주세요"
            label="이메일 주소"
          />
          <SignUpInputVue
            placeholder="이름을 입력해주세요"
            label="이메일 인증번호"
          />
        </div>
        <div class="wrapperSpace inputRow">
          <SignUpInputVue
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호"
            type="password"
            append-icon="mdi-eye"
          />
          <SignUpInputVue
            placeholder="비밀번호를 입력해주세요"
            label="비밀번호 재확인"
            type="password"
            append-icon="mdi-eye"
          />
        </div>
        <div class="wrapperSpace">
          <SignUpInputVue
            placeholder="배송지를 등록해주세요"
            label="배송지"
            type="text"
          />
        </div>
        <hr class="hrUnderLine mb-6" />
        <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
        <div class="wrapperSpace">
          <SignUpInputVue
            placeholder="기업명을 입력해주세요"
            label="기업명"
            type="text"
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
import SignUpInputVue from "@/views/member/SignUpInput.vue";
export default {
  data() {
    return {
      checkbox: false,
      showPwd: false,
      agree: {
        service: false,
        private: false,
      },
      param: {
        name: "",
      },
    };
  },
  components: {
    SetDialog,
    SignUpInputVue,
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
    find() {},
    signup() {
      this.$router.push("./member/signup");
    },
    login() {
      this.$refs.signupModal.openModal();
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    setDialogText(text) {
      this.setDialog.dialogText = text;
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
  width: 81.5%;
  margin: auto;
}

.signInput .v-input__slot {
  position: absolute;
  top: 19px;
  width: 300px;
}

.inputRow {
  height: 55px;
}
</style>
