<template>
  <div>
    <SetDialog ref="add">
      <AddAcount />
    </SetDialog>
    <h3 class="mt-4 mb-2">아이디 관리</h3>
    <hr class="mb-4" />
    <div class="service">
      <div class="filter">
        <v-row class="row">
          <v-col cols="11" sm="3">
            <h4>계정 구분</h4>
            <v-select
              :items="accountType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="type"
              outlined
              :id="'account'"
            ></v-select>
          </v-col>
          <v-col cols="11" sm="1"></v-col>
          <v-col cols="11" sm="3">
            <h4>이름</h4>
            <v-text-field
              outlined
              dense
              placeholder="이름을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="11" sm="1"></v-col>
          <v-col cols="11" sm="3" style="padding-left: 0px">
            <h4>이메일</h4>
            <v-text-field
              outlined
              dense
              placeholder="이메일 주소를 입력해주세요"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row class="row mb-3">
          <v-col cols="11" sm="3">
            <h4>기업명</h4>
            <v-text-field
              outlined
              dense
              placeholder="기업명을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="11" sm="1"></v-col>
          <v-col cols="11" sm="3">
            <h4>사번</h4>
            <v-text-field
              outlined
              dense
              placeholder="이름을 입력해주세요"
            ></v-text-field>
          </v-col>
          <v-col cols="11" sm="1"></v-col>
          <v-col cols="11" sm="3" style="padding-left: 0px">
            <h4>재직</h4>
            <v-select
              :items="accountType"
              :item-text="'text'"
              :item-value="'key'"
              v-model="type"
              outlined
              id="work"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="wrapperSpace">
        <div></div>
        <div class="wrapper">
          <v-card-actions>
            <v-btn depressed @click="reset">초기화</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-btn depressed color="primary" @click="onApprove">검색</v-btn>
          </v-card-actions>
        </div>
      </div>
      <h3 class="mt-16 mb-2 pl-1 pr-1">
        <div class="wrapperSpace">
          목록
          <v-btn depressed color="primary" @click="add">신규생성</v-btn>
        </div>
      </h3>
      <hr class="mb-4" />
      <Grid :setting="setting" />
    </div>
  </div>
</template>
<script>
import Grid from "@/components/Grid.vue";
import SetDialog from "@/components/SetDialog.vue";
import AddAcount from "@/views/admin/user/AddAcount.vue";
import { mapMutations } from "vuex";
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
      setting: {
        gridName: "account",
        columns: [],
        fields: [],
        existFavorite: false,
        layout: undefined,
        existCalendar: false,
        existAddr: false,
      },
    };
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
    reset() {},
    onApprove() {},
    add() {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
      });
      this.$refs.add.openModal();
    },
  },
  components: {
    Grid,
    SetDialog,
    AddAcount,
  },
};
</script>
<style>
.filter {
  /* background-color: wheat; */
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.02) !important;
  background-color: rgba(0, 0, 0, 0.02);
}
.row {
  margin: auto;
  height: 80px;
}
.service {
  margin: auto;
  width: 70%;
}

.v-input__slot {
  width: 266px !important;
  height: 30px !important;
}
.v-select__slot > div.v-select__selections {
  position: absolute;
  top: 0;
}
div.v-input__slot > fieldset {
  height: 46px !important;
}

div.v-select__slot > div.v-input__append-inner > div {
  position: absolute;
  top: 10px;
  right: 0;
}
</style>
