<template>
  <div>
    <template v-if="setting.isSuccessFindId">
      <span class="infoHeader"
        >회원님의 정보와 일치하는 아이디를 확인해주세요</span
      >
      <v-card class="infoCard between">
        <div class="wrapper">
          {{ setting.memberId }}
        </div>
        <div>가입일자</div>
      </v-card>
    </template>
    <template v-else>
      <v-card class="infoCard">
        입력된 정보와 일치하는 아이디를 찾을 수 없습니다
      </v-card>
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
    return {};
  },
  methods: {},
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
}

.between {
  justify-content: space-between;
}

.infoHeader {
  display: inline-block;
  margin-top: 30px;
}
</style>
