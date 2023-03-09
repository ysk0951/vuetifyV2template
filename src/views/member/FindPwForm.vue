<!-- eslint-disable prettier/prettier -->
<template>
  <div class="findPwForm">
    <SetPopup ref="sertificatePopup" />
    <span class="infoHeader pwHeader">
      비밀번호를 찾고자 하는 이메일 주소(아이디)를 입력해주세요</span
    >
    <div class="wrapperSpace flexCol" style="height: 330px">
      <v-form ref="pwFind" lazy-validation>
        <div class="wrapper findPw">
          <div style="position: relative; width: 80%">
            <div class="wrapperFlex" style="margin-bottom: 20px">
              <v-radio-group v-model="check">
                <v-radio :key="1" :value="check"></v-radio>
              </v-radio-group>
              <div>본인확인 이메일 인증</div>
            </div>
            <span class="guide">
              본인확인 이메일 주소와 입력한 이메일 주소가 일치해야 인증번호를
              받을 수 있습니다.
            </span>
            <v-row>
              <v-col cols="12" sm="3" class="pb-0 pt-0">
                <v-subheader>*이름</v-subheader>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0 pt-0">
                <v-text-field
                  placeholder="이름을 입력해 주세요."
                  v-model="param.memberName"
                  :rules="[
                    this.validSet.empty(param.memberName, '이름을 입력해주요'),
                  ]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row style="position: relative">
              <v-col cols="12" sm="3" class="pb-0 pt-0">
                <v-subheader>*이메일 주소</v-subheader>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0 pt-0">
                <v-text-field
                  placeholder="이메일 주소를 입력해 주세요."
                  v-model="param.memberId"
                  :rules="[
                    this.validSet.empty(
                      param.memberId,
                      '이메일 주소를 입력해주세요'
                    ),
                    this.validSet.email,
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" class="pb-0 pt-0">
                <v-btn
                  depressed
                  color="primary"
                  @click="certificate"
                  >{{ this.isSend ? "재발송" : "인증번호 받기" }}</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="3" class="pb-0 pt-0">
                <v-subheader>*인증 번호</v-subheader>
              </v-col>
              <v-col cols="12" sm="6" class="pb-0 pt-0">
                <v-text-field
                  placeholder="인증번호 6자리 입력"
                  v-model="param.certifiCode"
                  :rules="[
                    this.validSet.empty(
                      param.certifiCode,
                      '인증번호를 입력해주세요'
                    ),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" class="pb-0 pt-0">
                <v-btn depressed color="primary" @click="checkCode"
                  >인증번호 확인</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </div>
      </v-form>
      <div class="wrapper">
        <v-card-actions>
          <v-btn depressed @click="cancle">취소</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="onApprove">확인</v-btn>
        </v-card-actions>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { mapMutations } from "vuex";
import SetPopup from "@/components/SetPopup";
import { sendAuthNum, authNumCheck } from "api/member/member";
import validSet from "@/assets/valid";
export default {
  name: "FindPwForm",
  props: ["memberId"],
  data() {
    return {
      validSet,
      //id Param
      check: true,
      emailAuth: false,
      isSend: false,
      param: {
        memberName: "",
        memberId: this.memberId ? this.memberId : "",
        certifiCode: "",
        gubun: 1,
      },
    };
  },
  computed: {},
  components: {
    SetPopup,
  },
  filters: {
    timer: (v) => {
      const secound = (0 + (v % 60).toFixed()).slice(-2);
      const minute = Math.trunc(v / 60);
      return `${minute} : ${secound}`;
    },
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
        memberName: "",
        memberId: "",
        certifiCode: "",
        gubun: 1,
      };
    },
    closeModal() {
      this.$emit("closeModal");
    },
    valid() {
      return this.$refs.pwFind.validate();
    },
    onApprove() {
      if (!this.emailAuth) {
        this.openPopup("인증번호 인증이 완료되어야 합니다");
      } else if (this.valid()) {
        this.$emit("onApprove", this.param.memberId, "pw");
        this.reset();
      }
    },
    checkCode() {
      if (_.isEmpty(this.param.certifiCode)) {
        this.openPopup("인증번호를 입력해 주세요");
      } else {
        authNumCheck({
          authNum: this.param.certifiCode,
          memberId: this.param.memberId,
          memberName: this.param.memberName,
        }).then((res) => {
          const body = res.data;
          if (!_.isEmpty(body.errorCode)) {
            this.openPopup(body.errorMessage);
          } else {
            this.openPopup(body.message);
            this.emailAuth = true;
          }
        });
      }
    },
    certificate() {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (
        this.validSet.email(this.param.memberId) !== true ||
        this.validSet.empty(this.param.memberId, false) !== true
      ) {
        this.openPopup("인증을 위한 이메일 주소를 다시 확인해주세요");
      } else {
        this.isSend = true;
        sendAuthNum(this.param).then((res) => {
          const body = res.data;
          if (!_.isEmpty(body.errorCode)) {
            this.openPopup(body.errorMessage);
          } else {
            this.openPopup(body.message);
          }
        });
      }
    },
    openPopup(text, cb) {
      this.SET_POPUP({
        title: "알림",
        width: 300,
        text,
      });
      this.$refs.sertificatePopup.openPopup(cb);
    },
    cancle() {
      this.$router.push({ name: "main" });
    },
  },
};
</script>
<style lang="scss">
.infoCard {
  text-align: center;
  padding: 50px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1) !important;
  width: 80%;
  margin: auto;
  margin-top: 50px;
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.findPwForm .v-input--radio-group--column {
  margin-top: 5px;
}

.guide {
  font-size: 12px;
  position: absolute;
  top: 20px;
  left: 33px;
  margin-bottom: 10px;
}

.infoHeader {
  display: inline-block;
  margin-top: 30px;
}

.pwHeader {
  margin-bottom: 55px;
  margin-left: 16px;
}
.findPw {
  .v-messages__message {
    margin-top: 3px !important;
  }
  .v-subheader {
    width: 135px;
  }
}
</style>
