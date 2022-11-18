<template>
  <div>
    <SetPopup ref="sertificatePopup" />
    <span class="infoHeader pwHeader">
      비밀번호를 찾고자 하는 이메일 주소를 입력해주세요</span
    >
    <div class="wrapper">
      <div style="position: relative; width: 80%">
        <div class="wrapperFlex" style="margin-bottom: 20px">
          <v-radio-group v-model="check">
            <v-radio :key="1" :value="check"></v-radio>
          </v-radio-group>
          <div>본인확인 이메일 인증</div>
        </div>
        <span class="guide">
          본인확인 이메일 주소와 입력한 이메일 주소가 일치해야 인증번호를 받을
          수 있습니다.
        </span>
        <v-row>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-subheader>이름</v-subheader>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0">
            <v-text-field
              placeholder="이름을 입력해주요"
              v-model="memberName"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row style="position: relative">
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-subheader>이메일 주소</v-subheader>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0">
            <v-text-field
              placeholder="이메일 주소를 입력해주요"
              v-model="memberId"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" class="pb-0 pt-0">
            <v-btn depressed color="primary" @click="certificate">{{
              this.isSend ? "재발송" : "인증번호 받기"
            }}</v-btn>
          </v-col>
          <div class="timer">
            {{ (300 - this.timer) | timer }}
          </div>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-subheader>인증 번호</v-subheader>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0">
            <v-text-field
              placeholder="인증번호를 입력해주요"
              v-model="certifiCode"
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
    <div class="wrapper" style="margin-top: 116px">
      <v-card-actions>
        <v-btn depressed @click="closeModal">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="onApprove">확인</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import { mapMutations } from "vuex";
import SetPopup from "@/components/SetPopup";
import { sendAuthNum, authNumCheck } from "api/member/member";
export default {
  name: "FindPwForm",
  data() {
    return {
      //id Param
      memberName: "개발자",
      numbers: [1, 2],
      //pw Param
      check: true,
      memberId: "test@test.com",
      isSend: false,
      timer: 0,
      certifiCode: "",
      //timer
      interval: undefined,
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
    closeModal() {
      this.$emit("closeModal");
      this.timer = 0;
      clearInterval(this.interval);
      this.isSend = false;
    },
    onApprove() {
      console.log("approve");
    },
    checkCode() {
      if (_.isEmpty(this.certifiCode)) {
        this.openPopup("인증번호를 입력해 주세요");
      } else {
        authNumCheck({
          authNum: this.certifiCode,
          memberId: this.memberId,
          memberName: this.memberName,
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
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
      });
      if (_.isEmpty(this.memberName)) {
        this.openPopup("이름을 입력해 주세요");
      } else if (_.isEmpty(this.memberId)) {
        this.openPopup("이메일 주소를 확인해주세요");
      } else {
        this.isSend = true;
        this.timer = 0;
        if (!_.isNumber(this.interval)) {
          this.interval = setInterval(() => {
            this.timer++;
            if (this.timer === 300) {
              clearInterval(this.interval);
              this.send = false;
            }
          }, 1000);
        }
        sendAuthNum({
          memberName: this.memberName,
          memberId: this.memberId,
        })
          .then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openPopup(body.errorMessage);
            } else {
              this.openPopup(body.data);
            }
          })
          .catch((res) => {
            this.openPopup(res);
          })
          .finally(() => {});
      }
    },
    openPopup(text) {
      this.SET_POPUP_TEXT(text);
      this.$refs.sertificatePopup.openPopup();
    },
  },
};
</script>
<style scoped>
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

.timer {
  position: absolute;
  right: -45px;
  top: 7px;
}
</style>
