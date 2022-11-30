<template>
  <v-flex xs12>
    <div class="cardWrapper">
      <v-card class="mt-12">
        <SetDialog ref="validModal" />
        <SetDialog ref="aggreModal" />
        <SetDialog ref="postModal">
          <SignupPost
            @closeModal="this.closePost"
            @onApprove="this.approvePost"
          ></SignupPost>
        </SetDialog>
        <div class="pa-10">
          <h3 style="text-align: left" class="mb-3">회원가입</h3>
          <hr class="mb-6" />
          <h4 style="text-align: left" class="mb-3">
            회원가입 약관동의 (필수)
          </h4>
          <div class="wrapperSpace signUpAgree mb-3">
            <div>
              <v-checkbox v-model="agree.service">
                <template v-slot:label>
                  <h5>서비스 이용약관 동의</h5>
                </template>
              </v-checkbox>
            </div>
            <div>
              <v-btn depressed color="primary" @click="open_agree"
                >전문 보기</v-btn
              >
            </div>
          </div>
          <div class="wrapperSpace signUpAgree mb-3">
            <div>
              <v-checkbox v-model="agree.private">
                <template v-slot:label>
                  <h5>개인정보활용 동의</h5>
                </template></v-checkbox
              >
            </div>
            <div>
              <v-btn depressedd color="primary" @click="open_agree"
                >전문 보기</v-btn
              >
            </div>
          </div>
          <hr class="hrUnderLine mb-6" />
          <h4 style="text-align: left" class="mb-3">기본정보 입력 (필수)</h4>
          <div class="wrapperSpace inputRow">
            <SignupInputVue
              placeholder="이름을 입력해주세요"
              label="이름"
              v-model="param.name"
            />
            <div style="display: flex; width: 500px">
              <v-subheader class="my-4" style="width: 130px"
                >휴대폰 번호</v-subheader
              >
              <div class="wrapper">
                <v-text-field
                  placeholder="82"
                  v-model="param.area"
                  outlined
                  dense
                  class="signInput areaInput"
                  type="text"
                  autocomplete="off"
                ></v-text-field>
                <v-text-field
                  placeholder="000-0000-0000"
                  v-model="param.phone"
                  outlined
                  dense
                  class="signInput phoneInput"
                  type="text"
                  autocomplete="off"
                ></v-text-field>
              </div>
            </div>
          </div>
          <div class="wrapperSpace inputRow" style="position: relative">
            <SignupInputVue
              placeholder="ex) email@gmail.com"
              label="이메일
          주소"
              v-model="param.email"
              :sideBtn="true"
              :btnText="this.isSend ? '재발송' : '인증번호 받기'"
              :click="certificate"
            />
            <div class="timer">
              {{ (300 - this.timer) | timer }}
            </div>
            <SignupInputVue
              placeholder="인증번호를 입력해주세요"
              label="이메일 인증번호"
              v-model="param.emailCode"
              :sideBtn="true"
              btnText="인증번호 확인"
              :click="checkCode"
            />
          </div>
          <div class="wrapperSpace inputRow">
            <SignupInputVue
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호"
              type="password"
              append-icon="mdi-eye"
              v-model="param.password"
            />
            <SignupInputVue
              placeholder="비밀번호를 입력해주세요"
              label="비밀번호 재확인"
              type="password"
              append-icon="mdi-eye"
              v-model="param.passwordCode"
            />
          </div>
          <div class="wrapperSpace">
            <SignupInputVue
              placeholder="배송지를 등록해주세요"
              label="배송지"
              type="text"
              v-model="param.postCode"
              :sideBtn="true"
              btnText="배송지 등록"
              class="post"
              :click="openPost"
            />
          </div>
          <hr class="hrUnderLine mb-6" />
          <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
          <div class="wrapperSpace">
            <SignupInputVue
              placeholder="기업명을 입력해주세요"
              label="기업명"
              type="text"
              v-model="param.compaynCode"
            />
          </div>
          <hr class="hrUnderLine mb-6" />
          <div class="wrapper">
            <v-card-actions>
              <v-btn depressed @click="closeModal">취소</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn depressed color="primary" @click="onApprove">확인</v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import _ from "lodash";
import SetDialog from "@/components/SetDialog";
import SignupInputVue from "@/views/member/SignupInput.vue";
import SignupPost from "@/views/member/SignupPost.vue";
import { sendAuthNum, authNumCheck } from "api/member/member";
import { lanRegex, emailRegex, pwRegex, companyRegex } from "@/assets/regex";
import { mapMutations } from "vuex";
export default {
  name: "Signup",
  data() {
    return {
      numbers: [
        {
          name: "한국",
          value: 82,
        },
      ],
      checkbox: false,
      showPwd: false,
      agree: {
        service: false,
        private: false,
      },
      param: {
        area: 82,
        name: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        passwordCode: "",
        postCode: "",
        companyCode: "",
        areaCode: "82",
      },
      //timer
      timer: 0,
      isSend: false,
      interval: undefined,
    };
  },
  components: {
    SetDialog,
    SignupPost,
    SignupInputVue,
  },
  filters: {
    timer: (v) => {
      const secound = (0 + (v % 60).toFixed()).slice(-2);
      const minute = Math.trunc(v / 60);
      return `${minute} : ${secound}`;
    },
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
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),
    closeModal() {
      this.$router.push({ name: "login" });
    },
    closePost() {
      this.$refs.postModal.closeModal();
    },
    approvePost(param) {
      console.log(param);
    },
    onApprove() {
      if (this.valid()) {
        this.$router.push({ name: "signupDone" });
      }
    },
    valid() {
      let ret = false;
      const isLang = lanRegex.test(this.param.name);
      const isPw = pwRegex.test(this.param.password);
      const replacedCompany = this.param.companyCode.replaceAll(/[()]/gi, "");
      const isCompany = companyRegex.test(replacedCompany);
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (_.isEmpty(this.param.name)) {
        this.openPopup("이름을 입력해주세요");
      } else if (!isLang) {
        this.openPopup("이름은 한글과 영문만 가능합니다");
        this.$refs.validModal.openModal();
      } else if (!isPw) {
        this.openPopup(
          "비밀번호는 영문 대/소문자 , 숫자 , 특수문자를 포함한 8자리 이상이 필요합니다."
        );
      } else if (this.param.password !== this.param.passwordCode) {
        this.openPopup("동일한 비밀번호를 입력해주세요");
      } else if (!isCompany) {
        this.openPopup("올바른 기업명을 입력해주세요");
      } else {
        ret = true;
      }
      return ret;
    },
    checkCode() {
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (_.isEmpty(this.certifiCode)) {
        this.openPopup("인증번호를 입력해 주세요");
      } else {
        authNumCheck({
          authNum: this.param.emailCode,
          memberId: this.param.email,
        })
          .then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openPopup(body.errorMessage);
            } else {
              console.log(body.data);
            }
          })
          .catch()
          .finally();
      }
    },
    certificate() {
      const isEmail = emailRegex.test(this.param.email);
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (!isEmail) {
        this.openPopup("이메일 주소를 확인해주세요");
      } else {
        this.isSend = true;
        this.timer = 0;
        if (!_.isNumber(this.interval)) {
          this.interval = setInterval(() => {
            this.timer++;
            if (this.timer === 300) {
              clearInterval(this.interval);
              this.isSend = false;
            }
          }, 1000);
        }
        sendAuthNum({
          memberId: this.memberId,
        })
          .then((res) => {
            const body = res.data;
            console.log(body);
            if (!_.isEmpty(body.errorCode)) {
              this.openPopup(body.errorMessage);
              this.timer = 0;
              clearInterval(this.interval);
            } else {
              this.openPopup(body.data);
            }
          })
          .catch((res) => {
            this.openPopup(res);
            this.timer = 0;
            clearInterval(this.interval);
          })
          .finally(() => {});
      }
    },
    open_agree() {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
      });
      this.$refs.aggreModal.openModal();
    },
    openPost() {
      this.SET_MODAL({
        height: 600,
        width: 650,
        closable: true,
        customApprove: true,
      });
      this.$refs.postModal.openModal();
    },
    openPopup(message) {
      this.SET_DIALOG_TEXT(message);
      this.$refs.validModal.openModal();
    },
  },
};
</script>
<style lang="scss">
.v-text-field {
  margin-top: 0;
  padding-top: 0;
}

.underLogin {
  display: flex;
  justify-content: space-between;
}
.inputRow {
  height: 60px;
}
.underLogin span {
  cursor: pointer;
}

.hrUnderLine {
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.1) !important;
  border-top: none;
  border-left: none;
}

.signUpAgree {
  width: 88%;
  margin: auto;
}

.signInput .v-input__slot {
  position: absolute;
  top: 19px;
  width: 300px;
}

.signInputWithBtn .v-input__slot {
  position: absolute;
  top: 19px;
  width: 180px;
}

.v-select .v-input__slot {
  width: 100px;
}

.phoneInput {
  width: 190px;
  .v-input__slot {
    width: 190px;
  }
}
.areaInput {
  width: 100px;
  margin-right: 10px !important;
  .v-input__slot {
    width: 100px;
  }
}
.signBtn {
  position: absolute;
  height: 39px !important;
  top: 19px;
  right: 69px;
  width: 113px;
}
.cardWrapper {
  display: flex;
  justify-content: center;
}
/*
* post Code Detail
*/
div.cardWrapper > div > div.pa-10 > div:nth-child(11) > div > button {
  right: 74px;
}
.timer {
  position: absolute;
  left: 445px;
  top: 28px;
}
</style>
