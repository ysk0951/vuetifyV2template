<template>
  <div class="wrapper">
    <div class="add">
      <h3 style="text-align: left" class="mt-4">정보 입력</h3>
      <hr class="mb-3" />
      <v-row>
        <v-col cols="12" sm="6" class="select">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="param.type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
            v-model="param.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>이메일 주소</h4>
          <v-text-field
            outlined
            dense
            placeholder="이메일 주소를 입력해주세요"
            v-model="param.email"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>비밀 번호</h4>
          <v-text-field
            outlined
            dense
            type="password"
            placeholder="비밀번호를 입력해주세요"
            v-model="param.password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>이메일 주소</h4>
          <v-text-field
            outlined
            dense
            placeholder="이메일 주소를 입력해주세요"
            v-model="param.phone"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>가업명</h4>
          <v-text-field
            outlined
            dense
            placeholder="기업을 입력해주세요"
            v-model="param.coName"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>사번</h4>
          <v-text-field
            outlined
            dense
            placeholder="사번을 입력해주세요"
            v-model="param.coNumber"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" class="select">
          <h4>재직</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="param.work"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="12">
          <h4>비고</h4>
          <v-text-field
            outlined
            dense
            placeholder="내용을 입력해주세요"
            v-model="param.etc"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="wrapper">
        <v-card-actions>
          <v-btn depressed @click="closeModal">취소</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="onApprove"> 저장 </v-btn>
        </v-card-actions>
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
      setting: {
        gridName: "account",
        columns: [],
        fields: [],
        existFavorite: false,
        layout: undefined,
        existCalendar: false,
        existAddr: false,
      },
      param: {
        type: "all",
        name: "",
        email: "",
        password: "",
        phone: "",
        coName: "",
        coNumber: "",
        work: "",
        etc: "",
      },
    };
  },
  methods: {
    reset() {
      this.param = {
        type: "all",
        name: "",
        email: "",
        password: "",
        phone: "",
        coName: "",
        coNumber: "",
        work: "",
        etc: "",
      };
    },
    closeModal() {
      this.$emit("close");
      this.reset();
    },
    onApprove() {
      this.$emit("save", this.param);
      this.reset();
    },
  },
  components: {},
};
</script>
<style>
.add {
  width: 88%;
}
div.add .select .v-input__slot {
  width: 300px !important;
}
div.add .v-select__selections {
  position: absolute;
  top: 0;
}
</style>
