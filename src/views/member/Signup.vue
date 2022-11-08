<template>
  <div class="cardWrapper">
    <v-card height="600px" width="450px">
      <SetDialog :setting="this.setDialog" ref="signupModal" />
      <div class="pa-10">
        <h1 style="text-align: center" class="mb-10">CI LOGO</h1>
        <div>
          <v-text-field placeholder="아이디를 입력해주세요"></v-text-field>
          <v-text-field
            append-icon="mdi-eye"
            :type="pwdType"
            placeholder="비밀번호를 입력해주세요"
            @click:append="togglePwdShow"
          >
          </v-text-field>
          <v-checkbox
            class="d-flex flex-row mb-6"
            v-model="checkbox"
            :label="'아이디 기억하기'"
          />
          <v-btn
            type="text"
            color="black lighten-1 text-capitalize"
            depressed
            large
            block
            dark
            class="mb-3"
            @click="login"
          >
            Login
          </v-btn>
          <div class="underLogin">
            <div>
              <span>아이디 찾기 </span>
              <span>비밀번호 찾기</span>
            </div>
            <span @click="signup">회원가입</span>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";

export default {
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "변경된 비밀번호로 로그인해주세요",
        maxWidth: 500,
      },
      checkbox: false,
      showPwd: false,
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
</style>
