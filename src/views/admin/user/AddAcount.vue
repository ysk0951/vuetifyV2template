<template>
  <div class="wrapper addAcount">
    <div class="add">
      <h3 style="text-align: left" class="mt-4">정보 입력</h3>
      <hr class="mb-3" />
      <v-form lazy-validation ref="form">
        <v-row>
          <v-col cols="12" sm="6" class="select">
            <h4>계정 구분</h4>
            <v-select
              :items="this.roleType"
              v-model="input.roles"
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
              v-model="input.member_name"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
              :rules="[
                this.validSet.name,
                this.validSet.empty(input.member_name, `이름을 입력해주세요`),
              ]"
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
              v-model="input.memberId"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
              :rules="[
                this.validSet.email,
                this.validSet.empty(
                  input.memberId,
                  '이메일 주소를 입력해주세요'
                ),
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <h4>비밀 번호</h4>
            <v-text-field
              outlined
              dense
              type="password"
              placeholder="비밀번호를 입력해주세요"
              v-model="input.memberpw"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
              :rules="[
                this.validSet.empty(input.memberpw, '비밀번호를 입력해주세요'),
                this.validSet.password,
              ]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <h4>휴대폰 번호</h4>
            <v-text-field
              outlined
              dense
              placeholder="휴대폰 번호를 입력해주세요"
              v-model="input.phone"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
              v-mask="'###-####-####'"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <h4>가업명</h4>
            <v-text-field
              outlined
              dense
              placeholder="기업을 입력해주세요"
              v-model="input.company"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
              :rules="[this.validSet.company]"
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
              v-model="input.employeeCode"
              :rules="[
                this.validSet.empty(input.employeeCode, '사번을 입력해주세요'),
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" class="select">
            <h4>재직</h4>
            <v-select
              :items="this.workType"
              v-model="input.employeeStatus"
              outlined
              id="work"
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
              v-model="input.memo"
              :readonly="!focus"
              @focus="focus = true"
              @blur="focus = false"
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
      </v-form>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      validSet,
      focus: false,
      input: {
        employeeStatus: "전체",
        roles: "",
        member_name: "",
        memberId: "",
        company: "",
        employeeCode: "",
        phone: "",
      },
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
        memo: "",
        memberpw: "",
      },
    };
  },
  methods: {
    valid() {
      return this.$refs.form.validate();
    },
    reset() {
      this.input = {
        employeeStatus: "전체",
        roles: "전체",
        member_name: "",
        memberId: "",
        company: "",
        employeeCode: "",
      };
    },
    closeModal() {
      this.$emit("close");
      this.reset();
    },
    onApprove() {
      if (this.valid()) {
        this.$emit("save", this.input);
        this.closeModal();
      }
    },
  },
  mounted() {
    this.reset();
    this.input.roles = this.roleType[0];
  },
  components: {},
  computed: { ...mapState("select", ["workType", "roleType"]) },
};
</script>
<style lang="scss">
.addAcount {
  .add {
    width: 88%;
    .select .v-input__slot {
      width: 100% !important;
    }
  }
  .row {
    margin: auto;
    margin-top: 0px;
    height: 85px;
  }
}

/* div.add .v-select__selections {
  position: absolute;
  top: 0;
} */
</style>
