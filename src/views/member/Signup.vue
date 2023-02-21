<!-- eslint-disable no-unused-vars -->
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
            :key="signupPostKey"
            ref="signupPost"
          ></SignupPost>
        </SetDialog>
        <div class="pa-10">
          <h3 style="text-align: left" class="mb-3">회원가입</h3>
          <hr class="mb-6" />
          <v-form ref="signup" lazy-validation>
            <h4 style="text-align: left">회원가입 약관동의 (필수)</h4>
            <div class="wrapperSpace signUpAgree">
              <v-col cols="12" sm="4" style="padding-top: 10px">
                <v-checkbox
                  v-model="agree.service"
                  :rules="[this.validSet.check]"
                >
                  <template v-slot:label>
                    <h5>서비스 이용약관 동의</h5>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="12" sm="8" class="wrapperEnd">
                <v-btn depressed color="primary" @click="open_agree('service')"
                  >전문 보기</v-btn
                >
              </v-col>
            </div>
            <div class="wrapperSpace signUpAgree">
              <v-col cols="12" sm="4" style="padding-top: 10px">
                <v-checkbox
                  v-model="agree.private"
                  :rules="[this.validSet.check]"
                  style="padding-left: 1px"
                >
                  <template v-slot:label>
                    <h5>개인정보활용 동의</h5>
                  </template></v-checkbox
                >
              </v-col>
              <v-col cols="12" sm="8" class="wrapperEnd">
                <v-btn
                  depressedd
                  color="primary"
                  @click="open_agree('personal')"
                  >전문 보기</v-btn
                >
              </v-col>
            </div>
            <hr class="hrUnderLine mb-6" />
            <h4 style="text-align: left" class="mb-3">기본정보 입력 (필수)</h4>
            <div class="wrapperSpace inputRow">
              <SignupInputVue
                placeholder="이름을 입력해 주세요."
                label="*이름"
                v-model="param.name"
                :rules="[
                  this.validSet.empty(param.name, '이름을 입력해주세요'),
                  this.validSet.name,
                ]"
              />
              <div style="display: flex; width: 500px">
                <v-subheader class="my-4" style="width: 150px"
                  >*휴대폰 번호</v-subheader
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
                    :rules="[
                      this.validSet.empty(
                        param.area,
                        '국가코드를 입력해주세요'
                      ),
                    ]"
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
                    :rules="[
                      this.validSet.empty(
                        param.phone,
                        '핸드폰 번호를 입력해주세요'
                      ),
                    ]"
                    v-mask="'###-####-####'"
                  ></v-text-field>
                </div>
              </div>
            </div>
            <div
              class="wrapperSpace inputRow errorTop"
              style="position: relative"
            >
              <SignupInputVue
                placeholder="이메일 주소를 입력해 주세요."
                label="*이메일 주소"
                v-model="param.email"
                :sideBtn="true"
                :btnText="this.isSend ? '재발송' : '인증번호 받기'"
                :click="certificate"
                :rules="[
                  this.validSet.empty(
                    param.email,
                    '이메일 주소를 입력해주세요'
                  ),
                  this.validSet.email,
                ]"
              />
              <SignupInputVue
                placeholder="인증번호 6자리 입력"
                label="*이메일 인증번호"
                labelWidth="150"
                v-model="param.emailCode"
                :sideBtn="true"
                btnText="인증번호 확인"
                :click="checkCode"
                :rules="[
                  this.validSet.empty(
                    param.emailCode,
                    '인증번호를 입력해주세요'
                  ),
                  this.validSet.number,
                ]"
              />
            </div>
            <div class="wrapperSpace inputRow">
              <SignupInputVue
                placeholder="비밀번호를 입력해 주세요."
                label="*비밀번호"
                type="password"
                append-icon="mdi-eye"
                v-model="param.password"
                :rules="[
                  this.validSet.empty(
                    param.password,
                    '비밀번호를 입력해주세요'
                  ),
                  this.validSet.password,
                ]"
              />
              <SignupInputVue
                placeholder="비밀번호를 입력해 주세요."
                label="*비밀번호 재확인"
                labelWidth="150"
                type="password"
                append-icon="mdi-eye"
                v-model="param.passwordCode"
                :rules="[
                  this.validSet.empty(
                    param.passwordCode,
                    '비밀번호를 입력해주세요'
                  ),
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
                label="*배송지"
                type="text"
                v-model="param.post.name"
                :sideBtn="true"
                btnText="배송지 등록"
                class="post"
                :click="openPost"
                :rules="[
                  this.validSet.empty(
                    param.post.address,
                    '배송지를 등록해주세요'
                  ),
                ]"
                :disabled="true"
              />
            </div>
            <hr class="hrUnderLine mb-6" />
            <h4 style="text-align: left" class="mb-3">추가정보 입력 (선택)</h4>
            <div class="wrapperSpace">
              <SignupInputVue
                placeholder="기업명을 입력해 주세요."
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
import SignupInputVue from "@/views/member/SignUpInput";
import SignupPost from "@/views/member/SignupPost";
import AgreePersonal from "@/views/member/AgreePersonal.vue";
import { sendAuthNum, authNumCheck, memberJoin } from "api/member/member";
import { mapMutations } from "vuex";
import validSet from "@/assets/valid";
import moment from "moment";
export default {
  name: "Signup",
  data() {
    return {
      signupPostKey: 0,
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
      this.signupPostKey = moment().valueOf();
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
          roles: "회원",
          memo: "",
          ...this.param.post,
        };
        // eslint-disable-next-line no-unused-vars
        const res = await memberJoin(param);
        // eslint-disable-next-line no-unused-vars
        // const resAddress = await insertBook({
        //   ...this.param.post,
        //   memberId: this.param.email,
        // });
        this.$router.push({
          name: "signupDone",
          params: { memberId: this.param.email, memberName: this.param.name },
        });
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
      const validEmpty = this.validSet.empty(this.param.email, false);
      if (valid && validEmpty) {
        this.isSend = true;
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
        this.openPopup("인증번호를 위한 이메일을 확인해주세요");
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
.inputRow {
  height: 65px;
}
.underLogin {
  display: flex;
  justify-content: space-between;
}
.errorTop {
  height: 65px;
  .v-messages.error--text {
    position: absolute;
    top: 3px;
  }
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
  height: 50px;
  margin: auto;
  .v-input--checkbox {
    height: 0px;
  }
}

.signInput .v-input__slot {
  position: absolute;
  top: 19px;
  width: 300px;
}

.signInputWithBtn .v-input__slot {
  top: 19px;
  width: 180px;
}

.v-select .v-input__slot {
  width: 100px;
}

.phoneInput {
  width: 210px;
  .v-input__slot {
    width: 210px;
  }
  .v-text-field__details {
    position: relative;
    top: 65px;
  }
}
.areaInput {
  width: 85px;
  margin-right: 5px !important;
  .v-input__slot {
    width: 85px;
  }
}
.signBtn {
  height: 39px !important;
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
.signUpAgree .v-messages__message {
  margin-top: -18px;
}
</style>
