<template>
  <v-flex xs12>
    <div class="cardWrapper">
      <v-card class="mt-12">
        <SetDialog ref="validModal" />
        <SetDialog ref="aggreeModal">
          <template v-if="aggreeKey === 'personal'">
            <AgreePersonal></AgreePersonal
          ></template>
          <template v-if="aggreeKey === 'service'"></template>
        </SetDialog>
        <SetDialog ref="postModal">
          <SignupPost
            @closeModal="this.closePost"
            @onApprove="this.approvePost"
          ></SignupPost>
        </SetDialog>
        <div class="pa-10">
          <h3 style="text-align: left" class="mb-3">회원가입</h3>
          <hr class="mb-6" />
          <v-form ref="signup" lazy-validation>
            <h4 style="text-align: left" class="mb-3">
              회원가입 약관동의 (필수)
            </h4>
            <div class="wrapperSpace signUpAgree mb-3">
              <div>
                <v-checkbox
                  v-model="agree.service"
                  :rules="[this.validSet.check]"
                >
                  <template v-slot:label>
                    <h5>서비스 이용약관 동의</h5>
                  </template>
                </v-checkbox>
              </div>
              <div>
                <v-btn depressed color="primary" @click="open_agree('service')"
                  >전문 보기</v-btn
                >
              </div>
            </div>
            <div class="wrapperSpace signUpAgree mb-3">
              <div>
                <v-checkbox
                  v-model="agree.private"
                  :rules="[this.validSet.check]"
                >
                  <template v-slot:label>
                    <h5>개인정보활용 동의</h5>
                  </template></v-checkbox
                >
              </div>
              <div>
                <v-btn
                  depressedd
                  color="primary"
                  @click="open_agree('personal')"
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
                :rules="[this.validSet.empty, this.validSet.name]"
              />
              <div style="display: flex; width: 500px">
                <v-subheader class="my-4" style="width: 130px"
                  >휴대폰 번호</v-subheader
                >
                <div class="wrapper">
                  <v-text-field
                    placeholder="+82"
                    v-model="param.area"
                    outlined
                    dense
                    class="signInput areaInput"
                    type="text"
                    autocomplete="off"
                    :rules="[this.validSet.empty]"
                    v-mask="'+##'"
                  ></v-text-field>
                  <v-text-field
                    placeholder="000-0000-0000"
                    v-model="param.phone"
                    outlined
                    dense
                    class="signInput phoneInput"
                    type="text"
                    autocomplete="off"
                    :rules="[this.validSet.empty]"
                    v-mask="'###-####-####'"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div class="wrapperSpace inputRow" style="position: relative">
              <SignupInputVue
                placeholder="ex) email@gmail.com"
                label="이메일 주소"
                v-model="param.email"
                :sideBtn="true"
                :btnText="this.isSend ? '재발송' : '인증번호 받기'"
                :click="certificate"
                :rules="[this.validSet.empty, this.validSet.email]"
              />
              <SignupInputVue
                placeholder="인증번호를 입력해주세요"
                label="이메일 인증번호"
                v-model="param.emailCode"
                :sideBtn="true"
                btnText="인증번호 확인"
                :click="checkCode"
                :rules="[this.validSet.empty, this.validSet.number]"
              />
            </div>
            <div class="wrapperSpace inputRow">
              <SignupInputVue
                placeholder="비밀번호를 입력해주세요"
                label="비밀번호"
                type="password"
                append-icon="mdi-eye"
                v-model="param.password"
                :rules="[this.validSet.empty, this.validSet.password]"
              />
              <SignupInputVue
                placeholder="비밀번호를 입력해주세요"
                label="비밀번호 재확인"
                type="password"
                append-icon="mdi-eye"
                v-model="param.passwordCode"
                :rules="[
                  this.validSet.empty,
                  this.validSet.passwordCode(
                    param.password,
                    param.passwordCode
                  ),
                ]"
              />
            </div>
            <div class="wrapperSpace">
              <SignupInputVue
                placeholder="배송지를 등록해주세요"
                label="배송지"
                type="text"
                v-model="param.post.address"
                :sideBtn="true"
                btnText="배송지 등록"
                class="post"
                :click="openPost"
                :rules="[this.validSet.empty]"
                :disabled="true"
              />
            </div>
            <hr class="hrUnderLine mb-6" />
            <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
            <div class="wrapperSpace">
              <SignupInputVue
                placeholder="기업명을 입력해주세요"
                label="기업명"
                type="text"
                v-model="param.company"
                :rules="[this.validSet.company]"
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
          </v-form>
        </div>
      </v-card>
    </div>
  </v-flex>
</template>

<script>
import _ from "lodash";
import SetDialog from "@/components/SetDialog";
import SignupInputVue from "@/views/member/SignupInput";
import SignupPost from "@/views/member/SignupPost";
import AgreePersonal from "@/views/member/AgreePersonal.vue";
import { sendAuthNum, authNumCheck, memberJoin } from "api/member/member";
import { mapMutations } from "vuex";
import { insertBook } from "api/address/address";
import validSet from "@/assets/valid";
export default {
  name: "Signup",
  data() {
    return {
      showPwd: false,
      agree: {
        service: false,
        private: false,
      },
      aggreeKey: "personal",
      validSet,
      param: {
        area: "+82",
        name: "",
        phone: "",
        email: "",
        emailCode: "",
        password: "",
        passwordCode: "",
        post: {},
        companyCode: "",
        areaCode: "82",
      },
      //timer
      // timer: 0,
      isSend: false,
      // interval: undefined,
      //emailAuth
      emailAuth: false,
    };
  },
  components: {
    SetDialog,
    SignupPost,
    SignupInputVue,
    AgreePersonal,
  },
  filters: {
    // timer: (v) => {
    //   const secound = (0 + (v % 60).toFixed()).slice(-2);
    //   const minute = Math.trunc(v / 60);
    //   return `${minute} : ${secound}`;
    // },
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
    approvePost(post) {
      this.param.post = post;
    },
    async onApprove() {
      if (!this.emailAuth) {
        this.openPopup("이메일 인증을 완료 주세요");
      } else if (this.valid()) {
        const param = {
          address: this.param.post.addDetail1,
          address2: this.param.post.addDetail2,
          areacode: this.param.areaCode,
          company: this.param.company,
          member_name: this.param.name,
          memberId: this.param.email,
          memberpw: this.param.password,
          name: this.param.post.postName,
          phone: this.param.phone,
          postcode: this.param.post.postcode,
          roles: "회원",
          memo: "",
        };
        const res = await memberJoin(param);
        const resAddress = await insertBook({
          ...this.param.post,
          memberId: this.param.email,
        });
        console.log(res);
        console.log(resAddress);
        this.$router.push({ name: "signupDone" });
      }
    },
    valid() {
      return this.$refs.signup.validate();
    },
    checkCode() {
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (_.isEmpty(this.param.emailCode)) {
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
              this.openPopup(body.message);
              this.emailAuth = true;
            }
          })
          .catch()
          .finally();
      }
    },
    certificate() {
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
      });
      const valid = this.validSet.email(this.param.email);
      if (valid === true) {
        this.isSend = true;
        // this.timer = 0;
        // if (!_.isNumber(this.interval)) {
        //   this.interval = setInterval(() => {
        //     this.timer++;
        //     if (this.timer === 300) {
        //       clearInterval(this.interval);
        //       this.isSend = false;
        //     }
        //   }, 1000);
        // }
        sendAuthNum({
          gubun: 0,
          memberId: this.param.email,
        })
          .then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openPopup(body.errorMessage);
            } else {
              this.openPopup(body.message);
            }
          })
          .catch((res) => {
            this.openPopup(res);
          })
          .finally(() => {});
      } else {
        this.openPopup("인증번호를 위한 이메일 형식이 잘못되었습니다.");
      }
    },
    open_agree(v) {
      this.aggreeKey = v;
      this.SET_MODAL({
        height: 530,
        width: 750,
        closable: true,
      });
      this.$refs.aggreeModal.openModal();
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
    openPopup(text) {
      this.SET_MODAL({
        title: "알림",
        height: 150,
        width: 300,
        text,
      });
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
  height: 65px;
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
  width: 160px;
  .v-input__slot {
    width: 160px;
  }
}
.areaInput {
  width: 135px;
  margin-right: 5px !important;
  .v-input__slot {
    width: 135px;
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
