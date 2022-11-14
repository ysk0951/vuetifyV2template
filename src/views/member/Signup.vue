<template>
  <div class="cardWrapper">
    <v-card height="800px" width="1800px">
      <SetDialog ref="signupModal" />
      <div class="pa-10">
        <h3 style="text-align: left" class="mb-3">회원가입</h3>
        <hr class="mb-6" />
        <h4 style="text-align: left" class="mb-3">회원가입 약관동의 (필수)</h4>
        <hr />
        <h4 style="text-align: left" class="mb-3">기본정보 입력 (필수)</h4>
        <hr />
        <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
        <hr />
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
