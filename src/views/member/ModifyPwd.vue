<template>
  <div class="wrapper">
    <v-card height="600px" width="1200px">
      <SetDialog :setDialog="this.setDialog" ref="modifyModal" />
      <div class="pa-10">
        <h3 style="text-align: left">로그인</h3>
        <hr class="mb-16" />
        <div class="wrapper">
          <div style="text-align: center">
            <h3>고객님 께서는 임시비밀번호로 로그인 하셨습니다.</h3>
            <span> 비밀번호를 변경해주세요 </span>
            <div class="wrapperSpace">
              <label>신규 비밀번호</label>
              <v-text-field
                append-icon="mdi-eye"
                :type="pwdType"
                placeholder="비밀번호를 입력해주세요"
                @click:append="togglePwdShow"
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
              >
              </v-text-field>
            </div>
            <v-btn
              type="text"
              color="black lighten-1 text-capitalize"
              depressed
              large
              block
              dark
              class="mt-10"
              @click="login"
            >
              확인
            </v-btn>
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
      this.$refs.modifyModal.openModal(() => {
        this.$router.push({ name: "login" });
      });
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
<style lang="scss" scoped>
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
.wrapper {
  div {
    margin-bottom: 8px;
  }

  h3 {
    margin-bottom: 15px;
  }

  span {
    display: inline-block;
    margin-bottom: 55px;
  }

  label {
    margin-right: 40px;
  }
}
</style>
