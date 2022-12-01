<template>
  <div class="wrapper tmpPass" style="width: 100%">
    <v-card style="width: 530px">
      <SetDialog :setDialog="this.setDialog" ref="modifyModal" />
      <div class="pa-10">
        <v-form ref="modifyPw" lazy-validation>
          <h3 style="text-align: left">로그인</h3>
          <hr class="mb-16" />
          <div class="wrapper">
            <div style="text-align: center">
              <h3>고객님 께서는 임시비밀번호로 로그인 하셨습니다.</h3>
              <span> 비밀번호를 변경해주세요 </span>
              <div class="wrapperSpace mt-8">
                <label>신규 비밀번호</label>
                <v-text-field
                  append-icon="mdi-eye"
                  :type="pwdType"
                  placeholder="비밀번호를 입력해주세요"
                  @click:append="togglePwdShow"
                  :rules="[this.validSet.empty, this.validSet.password]"
                  v-model="param.password"
                >
                </v-text-field>
              </div>
              <div class="wrapperSpace">
                <label>비밀번호 확인</label>
                <v-text-field
                  append-icon="mdi-eye"
                  :type="pwdType"
                  placeholder="비밀번호를 입력해주세요"
                  @click:append="togglePwdShow"
                  v-model="param.passwordCheck"
                  :rules="[
                    this.validSet.empty,
                    this.validSet.passwordCode(
                      param.password,
                      param.passwordCode
                    ),
                  ]"
                >
                </v-text-field>
              </div>
              <v-btn @click="login" depressed color="primary" class="mt-6"
                >확인</v-btn
              >
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import validSet from "@/assets/valid";
export default {
  name: "ModifyPwd",
  data() {
    return {
      validSet,
      setDialog: {
        dialogTitle: "알림",
        dialogText: "변경된 비밀번호로 로그인해주세요",
        maxWidth: 500,
      },
      param: {
        password: "",
        passwordCheck: "",
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
    valid() {
      return this.$refs.modifyPw.validate();
    },
    login() {
      if (this.valid()) {
        this.$refs.modifyModal.openModal(() => {
          this.$router.push({ name: "login" });
        });
      }
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
<style lang="scss">
.tmpPass {
  .v-messages__message {
    margin-top: 3px !important;
  }
  label {
    margin-right: 40px;
  }
  .v-input__slot {
    width: 313px;
  }
}
</style>
