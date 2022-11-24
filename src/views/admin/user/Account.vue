<template>
  <div>
    <h3 class="mt-4 mb-2">아이디 관리</h3>
    <hr class="mb-4" />
    <div class="filter">
      <v-row class="row">
        <v-col cols="12" sm="3">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="3">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4" style="padding-left: 0px">
          <h4>이메일</h4>
          <v-text-field
            outlined
            dense
            placeholder="이메일 주소를 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row mb-3">
        <v-col cols="12" sm="3">
          <h4>기업명</h4>
          <v-text-field
            outlined
            dense
            placeholder="기업명을 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="3">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1"></v-col>
        <v-col cols="12" sm="4" style="padding-left: 0px">
          <h4>이메일</h4>
          <v-text-field
            outlined
            dense
            placeholder="이메일 주소를 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountType: [
        {
          key: "all",
          text: "전체",
        },
        {
          key: "admin",
          text: "관리자",
        },
        {
          key: "user",
          text: "회원",
        },
      ],
      type: "all",
    };
  },
};
</script>
<style scoped>
.filter {
  /* background-color: wheat; */
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02) !important;
  width: 50%;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.02);
}
.row {
  margin: auto;
  height: 80px;
}
</style>
