<template>
  <div class="wrapper">
    <v-card height="600px" width="450px">
      <SetDialog ref="loginModal" />
      <SetDialog :setting="this.setFindPopup" ref="findPopup">
        <Find></Find>
      </SetDialog>
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
            maxlength="20"
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
import Find from "@/views/member/Find.vue";
import _ from "lodash";
import { mapMutations } from "vuex";
import { login } from "api/member/login";
export default {
  props: {},
  data() {
    return {
      setDialog: {
        dialogTitle: "알림",
        dialogText: "",
        maxWidth: 500,
      },
      setFindPopup: {
        dialogText: "",
        closable: true,
        maxWidth: 450,
        height: 600,
      },
      checkbox: false,
      showPwd: false,
      id: "",
      pw: "",
    };
  },
  components: {
    SetDialog,
    Find,
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
  mounted() {
    const id = localStorage.getItem("id");
    if (!_.isEmpty(id)) {
      this.id = id;
    }
  },
  methods: {
    ...mapMutations("member", ["SET_TOKEN"]),
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),
    find(key) {
      this.$refs.findPopup.openModal(key);
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    signin() {
      if (_.isEmpty(this.id)) {
        this.RESET_MODAL();
        this.SET_MODAL({
          title: "알림",
          text: "아이디를 입력해주세요",
          height: 150,
          width: 300,
        });
        this.$refs.loginModal.openModal();
      } else {
        login(this.id, this.pw)
          .then((res) => {
            const resBody = res.data;
            this.SET_TOKEN(resBody.data);
            if (this.checkbox) {
              localStorage.setItem("id", this.id);
            }
            this.routing("main", "로그인 되었습니다.");
          })
          .catch(() => {
            this.routing("login", "로그인 에 실패하였습니다.");
          })
          .finally(() => {});
      }
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    routing(name, message) {
      this.SET_DIALOG_TEXT(message);
      this.$refs.loginModal.openModal(() => {
        this.$router.push({ name: name });
      });
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
