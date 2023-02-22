<template>
  <v-flex xs12>
    <div class="wrapper login">
      <v-card width="450px">
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
                <img src="../../assets/dwel_logo_ko.png" alt="" />
              </template>
              <template v-else>
                <img src="../../assets/dwel_logo_en.png" alt="" />
              </template>
            </div>
          </h1>
          <v-form ref="loginValid" lazy-validation>
            <div>
              <v-text-field
                :placeholder="this.getText('MSG001')"
                v-model="id"
                :rules="[this.validSet.empty(id, this.getText('MSG001'))]"
                :readonly="!focus"
                @focus="focus = true"
                @blur="focus = false"
              ></v-text-field>
              <v-text-field
                append-icon="mdi-eye"
                v-model="pw"
                :type="pwdType"
                :placeholder="this.getText('MSG002')"
                @click:append="togglePwdShow"
                maxlength="20"
                :readonly="!focus"
                :rules="[this.validSet.empty(pw, this.getText('MSG002'))]"
                @focus="focus = true"
                @blur="focus = false"
              >
              </v-text-field>
              <v-checkbox v-model="checkbox" :label="this.getText('MSG006')" />
              <v-btn
                type="button"
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
            </div>
          </v-form>
          <div class="underLogin">
            <div>
              <span style="font-size: 12px" @click="find(0)">{{
                this.getText("MSG003")
              }}</span>
              <span style="font-size: 12px"> | </span>
              <span style="font-size: 12px" @click="find(1)">{{
                this.getText("MSG004")
              }}</span>
            </div>
            <span @click="signup" style="color: green">{{
              this.getText("MSG005")
            }}</span>
          </div>
          <div>
            <v-btn
              type="button"
              color=" lighten-1 text-capitalize"
              depressed
              large
              block
              outlined
              class="mt-5"
              @click="noneMemberSearch"
            >
              비회원 검색
            </v-btn>
          </div>
        </div>
      </v-card>
    </div>
    <!-- <div class="tmp">
      <v-btn
        type="button"
        color="primary lighten-1 text-capitalize"
        depressed
        large
        block
        dark
        class="mb-3"
        @click="admin"
      >
        임시 관리자 로그인
      </v-btn>
      <v-btn
        type="button"
        color="primary lighten-1 text-capitalize"
        depressed
        large
        block
        dark
        class="mb-3"
        @click="
          () => {
            this.$router.push({ name: 'sample' });
          }
        "
      >
        임시 샘플관리 페이지
      </v-btn>
      <v-btn
        type="button"
        color="primary lighten-1 text-capitalize"
        depressed
        large
        block
        dark
        class="mb-3"
        @click="
          () => {
            this.$router.push({ name: 'master' });
          }
        "
      >
        임시 마스터관리 페이지
      </v-btn>
      <v-btn
        type="button"
        color="primary lighten-1 text-capitalize"
        depressed
        large
        block
        dark
        class="mb-6"
        @click="
          () => {
            this.$router.push({ name: 'document' });
          }
        "
      >
        임시 서류관리 페이지
      </v-btn>
    </div> -->
  </v-flex>
</template>

<script>
import SetDialog from "@/components/SetDialog";
import Find from "@/views/member/Find.vue";
import _ from "lodash";
import { mapMutations, mapState } from "vuex";
import { login } from "api/member/member";
import { emailRegex } from "@/assets/regex";
import validSet from "@/assets/valid";
import { addressbookDefault } from "api/address/address";
export default {
  name: "Login",
  data() {
    return {
      checkbox: false,
      showPwd: false,
      id: this.$route.params.memberId ? this.$route.params.memberId : "",
      pw: "",
      propsTab: 0,
      validSet,
      focus: false,
    };
  },
  components: {
    SetDialog,
    Find,
  },
  computed: {
    ...mapState("locale", ["message", "locale"]),
    ...mapState("member", ["accessToken"]),
    pwdType() {
      if (!this.showPwd) {
        return "Password";
      } else {
        return "text";
      }
    },
  },
  mounted() {
    if (this.accessToken) {
      this.$router.push({ name: "main" });
    }
    const id = sessionStorage.getItem("id");
    if (!_.isEmpty(id)) {
      this.id = id;
    }
    this.showPwd = false;
  },
  methods: {
    ...mapMutations("member", ["SET_TOKEN", "SET_DEFAULT_ADDRESS"]),
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),
    valid() {
      return this.$refs.loginValid.validate();
    },
    admin() {
      this.$router.push({ name: "admin" });
    },
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
    noneMemberSearch() {
      this.$router.push({ name: "noneMember" });
    },
    signin() {
      if (!this.valid()) {
        return;
      } else {
        login({
          memberId: this.id,
          memberpw: this.pw,
        })
          .then(async (res) => {
            const resBody = res.data;
            if (this.checkbox) {
              sessionStorage.setItem("id", this.id);
            }
            this.SET_TOKEN(resBody.data);
            this.openModal("로그인 되었습니다.", () => {
              this.$router.push({ name: "main" });
            });
            const defaultAddress = await addressbookDefault();
            this.SET_DEFAULT_ADDRESS(defaultAddress);
          })
          .catch(() => {
            this.openModal("로그인에 실패하였습니다.");
          })
          .finally(() => {});
      }
    },
    togglePwdShow() {
      this.showPwd = !this.showPwd;
    },
    openModal(message, cb) {
      this.SET_MODAL({
        title: "알림",
        text: message,
        height: 150,
        width: 300,
      });
      this.$refs.loginModal.openModal(() => {
        if (_.isFunction(cb)) {
          cb();
        }
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
    close(route) {
      this.$refs.findPopup.closeModal();
      this.$router.push(route);
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
<style lang="scss">
.tmp {
  position: absolute;
  right: 0;
  width: 200px;
  bottom: 0;
  .v-btn {
    margin: 5px !important;
  }
}
.login .v-text-field__details {
  margin-top: 3px;
}

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
