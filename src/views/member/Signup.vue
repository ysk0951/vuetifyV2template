<template>
  <div class="cardWrapper">
    <v-card height="800px" width="1800px">
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
        <hr class="hrUnderLine mb-6" />
        <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
        <hr class="hrUnderLine mb-6" />
      </div>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";

export default {
  data() {
    return {
      checkbox: false,
      showPwd: false,
      agree: {
        service: false,
        private: false,
      },
    };
  },
  components: {
    SetDialog,
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
  width: 60%;
  margin: auto;
}
</style>
