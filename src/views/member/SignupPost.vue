<template>
  <div class="pa-10">
    <h3 style="text-align: left" class="mb-3">배송지 등록</h3>
    <hr />
    <div class="cardWrapperLeft">
      <SignupInput
        placeholder="배송지 입력해주세요"
        label="배송지 명*"
        type="password"
        v-model="param.postName"
        height="55"
      />
      <SignupInput
        placeholder="수령인을 입력해주세요"
        label="수령인*"
        type="password"
        v-model="param.personName"
        height="55"
      />
      <SignupInput
        placeholder="주소를 선택해주세요"
        label="주소*"
        type="text"
        v-model="param.address"
        height="55"
        sideBtn="true"
        btnText="주소검색"
        :disabled="true"
        :click="daumPostCode"
      />
      <v-text-field
        v-model="param.addDetail1"
        outlined
        dense
        autocomplete="off"
        class="addDetail"
      ></v-text-field>
      <v-text-field
        v-model="param.addDetail2"
        outlined
        dense
        autocomplete="off"
        class="addDetail"
      ></v-text-field>
      <SignupInput
        placeholder="000-0000-0000"
        label="배송지 연락처1"
        type="password"
        v-model="param.phone1"
        height="55"
      />
      <SignupInput
        placeholder="000-0000-0000"
        label="배송지 연락처2"
        type="password"
        v-model="param.phone2"
        height="55"
      />
      <div style="display: flex">
        <v-subheader class="my-4" style="width: 130px">
          기본배송지
        </v-subheader>
        <v-checkbox
          v-model="param.default"
          style="align-items: center; padding-top: 14px"
        >
          <template v-slot:label>
            <h5>기본 배송지로 설정</h5>
          </template>
        </v-checkbox>
      </div>
    </div>
    <div class="wrapper">
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
import SignupInput from "@/views/member/SignupInput.vue";
export default {
  data() {
    return {
      param: {
        postName: "",
        phone1: "",
        phone2: "",
        address: "",
        personName: "",
        default: false,
        addDetail1: "",
        addDetail2: "",
      },
    };
  },
  components: {
    SignupInput,
  },
  computed: {},
  methods: {
    onApprove() {
      this.$emit("onApprove", this.param);
      this.closeModal();
    },
    closeModal() {
      this.$emit("closeModal");
    },
    daumPostCode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.param.address = data.zonecode;
          this.param.addDetail1 = data.roadAddress + data.buildingName;
        },
      }).open();
    },
  },
};
</script>
<style scoped>
.cardWrapper {
  display: flex;
  justify-content: center;
}
.col {
  flex-direction: column;
}
.addDetail {
  width: 400px;
  margin-top: 17px;
  margin-left: 130px;
  height: 33px;
}
table {
  border: 1px solid;
  border-collapse: collapse;
  width: 60%;
  margin-top: 15px;
}
th,
td {
  border: 1px solid;
}
</style>
