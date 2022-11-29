<template>
  <div>
    <h3 class="mt-4 mb-2">메뉴 관리</h3>
    <hr class="mb-4" />
    <div class="service">
      <div>
        <v-row class="row menuMngCol wrapper">
          <v-col cols="12" sm="2" class="menuCol">
            <v-btn depressed class="type mb-3">회원</v-btn>
            <v-btn depressed class="type mb-3">임직원</v-btn>
            <v-btn depressed class="type mb-3">관리자</v-btn>
          </v-col>
          <v-col
            cols="12"
            sm="9"
            class="menuCol"
            style="background-color: rgba(0, 0, 0, 0.02)"
          >
            <div>
              <h4>그룹명</h4>
              <v-text-field
                :width="'300px'"
                outlined
                dense
                placeholder="이름을 입력해주세요"
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.type {
  width: 100%;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  border: solid;
}
.menuMngCol {
  height: 650px !important;
}
.menuCol {
  display: flex;
  flex-direction: column;
  margin: 5px;
  .v-input__slot {
    width: 300px !important;
  }
}
</style>
