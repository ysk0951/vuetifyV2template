<template>
  <div class="wrapper">
    <v-card height="600px" width="450px">
      <SetDialog ref="loginModal" />
      <SetDialog ref="findPopup">
        <Find
          @close="close"
          @loginByFindId="loginByFindId"
          :propsTab="propsTab"
          @changeTab="changeTab"
        ></Find>
      </SetDialog>
      <div class="pa-10">
        <h1 style="text-align: center" class="mb-10">
          <div class="wrapper" style="width: 50%; margin: auto">
            <template v-if="this.locale === 'ko'">
              <v-img src="../../assets/dwel_logo_ko.png" alt="" />
            </template>
            <template v-else>
              <v-img src="../../assets/dwel_logo_en.png" alt="" />
            </template>
          </div>
        </h1>
        <div>
          <v-text-field
            :placeholder="this.getText('MSG001')"
            v-model="id"
          ></v-text-field>
          <v-text-field
            append-icon="mdi-eye"
            v-model="pw"
            :type="pwdType"
            :placeholder="this.getText('MSG002')"
            @click:append="togglePwdShow"
            maxlength="20"
          >
          </v-text-field>
          <v-checkbox v-model="checkbox" :label="this.getText('MSG006')" />
          <v-btn
            type="submit"
            color="primary lighten-1 text-capitalize"
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
              <span @click="find(0)">{{ this.getText("MSG003") }}</span>
              <span> | </span>
              <span @click="find(1)">{{ this.getText("MSG004") }}</span>
            </div>
            <span @click="signup">{{ this.getText("MSG005") }}</span>
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
import { mapMutations, mapState } from "vuex";
import { login } from "api/member/member";
import { emailRegex } from "@/assets/regex";
export default {
  name: "Login",
  data() {
    return {
      checkbox: false,
      showPwd: false,
      id: "",
      pw: "",
      propsTab: 0,
    };
  },
  components: {
    SetDialog,
    Find,
  },
  computed: {
    ...mapState("locale", ["message", "locale"]),
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
    img() {
      return `../../assets/dwel_logo_${this.locale}.png`;
    },
    find(key) {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
        customApprove: true,
      });
      this.propsTab = key;
      this.$refs.findPopup.openModal();
    },
    signup() {
      this.$router.push({ name: "signup" });
    },
    signin() {
      if (this.validation()) {
        return;
      } else {
        login({
          memberid: this.id,
          memberpw: this.pw,
        })
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
      this.SET_MODAL({
        title: "알림",
        text: message,
        height: 150,
        width: 300,
      });
      this.$refs.loginModal.openModal(() => {
        console.log("routing");
        this.$router.push({ name });
      });
      //
    },
    validation() {
      let ret = false;
      //eslint-disable-next-line
      const isEmailType = emailRegex.test(this.id);
      if (_.isEmpty(this.id)) {
        this.SET_MODAL({
          title: "알림",
          text: "아이디를 입력해주세요",
          height: 150,
          width: 300,
        });
        this.$refs.loginModal.openModal();
        ret = true;
      } else if (_.isEmpty(this.pw)) {
        this.SET_MODAL({
          title: "알림",
          text: "비밀번호를 입력해주세요",
          height: 150,
          width: 300,
        });
        this.$refs.loginModal.openModal();
        ret = true;
      } else if (!isEmailType) {
        this.SET_MODAL({
          title: "알림",
          text: "잘못된 아이디 정보입니다",
          height: 150,
          width: 300,
        });
        this.$refs.loginModal.openModal();
        ret = true;
      }
      return ret;
    },
    close() {
      this.$refs.findPopup.closeModal();
    },
    loginByFindId(id) {
      this.$refs.findPopup.closeModal();
      this.id = id;
    },
    changeTab(v) {
      this.propsTab = v;
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

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>
