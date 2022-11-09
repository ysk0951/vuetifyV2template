<template>
  <div>
    <template v-if="setting.isSuccessFindId">
      <span class="infoHeader"
        >회원님의 정보와 일치하는 아이디를 확인해주세요</span
      >
      <v-card class="infoCard between">
        <div class="wrapper">
          <v-radio-group v-model="radioGroup">
            <v-radio :key="1" :value="setting.memberId"></v-radio>
          </v-radio-group>
          {{ setting.memberId }}
        </div>
        <div>가입일자</div>
      </v-card>
      <div class="wrapper">
        <v-card-actions>
          <v-btn @click="findPw">비밀번호 찾기</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="approve" @click="login">로그인</v-btn>
        </v-card-actions>
      </div>
    </template>
    <template v-else>
      <v-card class="infoCard">
        {{ setting.errorMessage }}
      </v-card>
      <div class="wrapper">
        <v-card-actions>
          <v-btn @click="back">이전</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn class="approve" @click="login">로그인</v-btn>
        </v-card-actions>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    setting: {
      type: Object,
    },
  },
  data() {
    return {
      radioGroup: "",
    };
  },
  methods: {
    goPw() {},
    login() {
      this.$emit("loginByFindId", this.radioGroup);
    },
    back() {
      this.$emit("back");
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

.between {
  justify-content: space-between;
}

.infoHeader {
  display: inline-block;
  margin-top: 30px;
}

.v-input--selection-controls {
  margin-top: 0px;
  padding-top: 0px;
}

.v-btn {
  width: 110px;
}
</style>
