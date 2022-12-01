<template>
  <div>
    <v-layout row style="margin-top: 18px">
      <v-col cols="12" sm="3">
        <v-subheader>이름</v-subheader>
      </v-col>
      <v-col cols="12" sm="9">
        <v-text-field
          placeholder="이름을 입력해주요"
          v-model="memberName"
          :rules="[this.validSet.empty]"
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-layout>
    <v-row>
      <v-col cols="12" sm="3">
        <v-subheader>휴대폰 번호</v-subheader>
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          outlined
          dense
          placeholder="+82"
          v-model="areacode"
          :rules="[this.validSet.empty]"
          v-mask="'+##'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" style="padding-left: 0px">
        <v-text-field
          placeholder="000-0000-0000"
          v-model="phone"
          outlined
          dense
          :rules="[this.validSet.empty]"
          v-mask="'###-####-####'"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="wrapper" style="margin-top: 215px">
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
import validSet from "@/assets/valid";
export default {
  name: "FindIdForm",
  data() {
    return {
      validSet,
      //id Param
      memberName: "",
      phone: "",
      areacode: "",
      numbers: [1, 2],
    };
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    onApprove() {
      const param = {
        memberName: this.memberName,
        phone: this.phone,
        areacode: this.areacode.replace("+", ""),
      };
      this.$emit("onApprove", param, "id");
    },
  },
};
</script>
