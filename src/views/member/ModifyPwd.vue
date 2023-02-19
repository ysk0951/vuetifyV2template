<template>
  <div class="wrapper tmpPass" style="width: 100%">
    <v-card style="width: 530px">
      <SetPopup :setPopup="this.setPopup" ref="modifyModal" />
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
                  placeholder="비밀번호를 입력해 주세요."
                  @click:append="togglePwdShow"
                  :rules="[
                    this.validSet.empty(
                      param.password,
                      '비밀번호를 입력해주세요'
                    ),
                    this.validSet.password,
                  ]"
                  v-model="param.password"
                  :readonly="!focus"
                  @focus="focus = true"
                  @blur="focus = false"
                >
                </v-text-field>
              </div>
              <div class="wrapperSpace">
                <label>비밀번호 확인</label>
                <v-text-field
                  append-icon="mdi-eye"
                  :type="pwdType"
                  placeholder="비밀번호를 입력해 주세요."
                  @click:append="togglePwdShow"
                  v-model="param.passwordCheck"
                  :rules="[
                    this.validSet.empty(
                      param.passwordCheck,
                      '비밀번호를 입력해주세요'
                    ),
                    this.validSet.passwordCode(
                      param.password,
                      param.passwordCheck
                    ),
                  ]"
                  :readonly="!focus"
                  @focus="focus = true"
                  @blur="focus = false"
                >
                </v-text-field>
              </div>
              <v-btn @click="changePwd" depressed color="primary" class="mt-6"
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
import SetPopup from "@/components/SetPopup";
import validSet from "@/assets/valid";
import { newPass } from "api/member/member";
import { mapMutations } from "vuex";
import _ from "lodash";
export default {
  name: "ModifyPwd",
  data() {
    return {
      validSet,
      setPopup: {
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
      focus: false,
    };
  },
  components: {
    SetPopup,
  },
  computed: {
    pwdType() {
      if (!this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
  },
  mounted() {
    this.reset();
    if (!this.$route.params.params) {
      this.$router.push({ name: "login" });
    }
  },
  methods: {
    ...mapMutations("popup", [
      "SET_POPUP_TITLE",
      "SET_POPUP_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_POPUP",
      "RESET_POPUP",
    ]),
    reset() {
      this.param = {
        password: "",
        passwordCheck: "",
      };
      this.checkbox = false;
      this.showPwd = false;
    },
    signup() {
      this.$router.push("./member/signup");
    },
    valid() {
      return this.$refs.modifyPw.validate();
    },
    openPopup(text, cb) {
      this.SET_POPUP_TITLE("알림");
      this.SET_POPUP_TEXT(text);
      this.$refs.modifyModal.openPopup(cb);
    },
    changePwd() {
      if (this.valid()) {
        newPass({
          memberId: this.$route.params.params,
          memberpw: this.param.password,
        })
          .then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openPopup(body.errorMessage);
            } else {
              this.openPopup(body.message, () => {
                this.$router.push({ name: "login" });
              });
            }
          })
          .catch(() => {});
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
