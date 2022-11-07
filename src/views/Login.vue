<template>
  <div class="wrapper">
    <v-card height="600px" width="450px">
      <SetDialog :setDialog="this.setDialog" ref="loginModal" />
      <div class="pa-10">
        <h1 style="text-align: center" class="mb-10">CI LOGO</h1>
        <div>
          <v-text-field
            placeholder="아이디를 입력해주세요"
            v-model="id"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-eye"
            v-model="pw"
            :type="pwdType"
            placeholder="비밀번호를 입력해주세요"
            @click:append="togglePwdShow"
          >
          </v-text-field>
          <v-checkbox v-model="checkbox" :label="'아이디 기억하기'" />
          <v-btn
            type="submit"
            color="black lighten-1 text-capitalize"
            depressed
            large
            block
            dark
            class="mb-3"
            @click="signin"
          >
            Login
          </v-btn>
          <div class="underLogin">
            <div>
              <span @click="find('id')">아이디 찾기 </span>
              <span @click="find('pw')">비밀번호 찾기</span>
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
import _ from "lodash";
import { login } from "api/member/login";
import { setToken } from "store/memberEx";
export default {
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "",
      },
      checkbox: false,
      showPwd: false,
      id: "",
      pw: "",
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
    find(key) {
      this.$router.push({ name: "find", params: { key } });
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    signin() {
      if (_.isEmpty(this.id)) {
        this.setDialogText("아이디를 입력해주세요");
        this.$refs.loginModal.openModal();
      } else {
        login(this.id, this.pw)
          .then((res) => {
            const resBody = res.data;
            setToken(this, resBody.data);
          })
          .catch((e) => {
            console.errro(e);
          })
          .finally(() => {
            this.$router.push({ name: "main" });
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
.v-input__slot {
  margin-bottom: 0px;
}
</style>
