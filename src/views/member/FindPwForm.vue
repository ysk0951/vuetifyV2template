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
        ></v-text-field>
      </v-col>
    </v-layout>
    <v-row>
      <v-col cols="12" sm="3">
        <v-subheader>휴대폰 번호</v-subheader>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select :items="numbers" item-value="areacode"></v-select>
      </v-col>
      <v-col cols="12" sm="6" style="padding-left: 0px">
        <v-text-field placeholder="000-0000-0000"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //id Param
      memberName: "개발자",
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
        areacode: this.areacode,
      };
      this.$emit("onApprove", param);
    },
  },
};
</script>
