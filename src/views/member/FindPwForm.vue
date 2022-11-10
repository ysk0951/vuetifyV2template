<template>
  <div>
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
            <v-text-field placeholder="이름을 입력해주요"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-subheader>이메일 주소</v-subheader>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0">
            <v-text-field placeholder="이름을 입력해주요"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-btn depressed color="primary">인증번호 받기</v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-subheader>인증 번호</v-subheader>
          </v-col>
          <v-col cols="12" sm="6" class="pb-0 pt-0">
            <v-text-field placeholder="이름을 입력해주요"></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" class="pb-0 pt-0">
            <v-btn depressed color="primary">인증번호 확인</v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="wrapper" style="margin-top: 96px">
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
export default {
  data() {
    return {
      //id Param
      memberName: "개발자",
      numbers: [1, 2],
      //pw Param
      check: true,
    };
  },
  methods: {
    closeModal() {
      console.log("close");
      // this.$emit("closeModal");
    },
    onApprove() {
      console.log("approve");
      // const param = {};
      // this.$emit("onApprove", param);
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
  margin-bottom: 75px;
  margin-left: 16px;
}
</style>
