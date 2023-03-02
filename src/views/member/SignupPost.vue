<template>
  <div class="pa-10 signupPost">
    <h3 style="text-align: left" class="mb-3">배송지 등록</h3>
    <hr />
    <SetPopup ref="postConfirm" />
    <div class="wrapper">
      <v-form
        ref="signupPost"
        lazy-validation
        style="width: 450px; justify-content: center"
      >
        <SignupInput
          placeholder="배송지명을 입력해 주세요."
          label="*배송지 명"
          type="text"
          v-model="param.name"
          height="65"
          required
          :rules="[this.validSet.empty(param.name, '배송지 입력해주세요')]"
          :maxlength="30"
        />
        <SignupInput
          placeholder="수령인을 입력해 주세요."
          label="*수령인"
          type="text"
          v-model="param.pickname"
          height="65"
          required
          :rules="[
            this.validSet.empty(param.pickname, '수령인을 입력해주세요'),
          ]"
          :maxlength="30"
        />
        <div class="addressSelect">
          <v-subheader
            class="my-4"
            style="width: 114px; height: 0px; margin-left: 14px"
            >배송지 구분</v-subheader
          >
          <v-radio-group v-model="param.country" row>
            <v-radio
              v-for="i in countrySet"
              :key="i.key"
              :label="`${i.text}`"
              :value="i.key"
            ></v-radio>
          </v-radio-group>
        </div>
        <template v-if="param.country === 'N'">
          <SignupInput
            placeholder="주소를 선택해 주세요."
            label="*주소"
            type="text"
            v-model="param.postcode"
            height="55"
            sideBtn="true"
            btnText="주소검색"
            :click="daumPostCode"
            required
            :rules="[
              this.validSet.empty(param.postcode, '주소를 선택해주세요'),
            ]"
            :disabled="true"
          />
          <SignupInput
            height="40"
            v-model="param.address"
            outlined
            dense
            autocomplete="off"
            class="addDetail mb-7"
            :rules="[this.validSet.empty(param.address, '주소를 입력해주세요')]"
          ></SignupInput>
          <SignupInput
            height="40"
            v-model="param.address2"
            outlined
            dense
            autocomplete="off"
            class="addDetail mb-5"
            :rules="[
              this.validSet.empty(param.address2, '상세주소를 입력해주세요'),
            ]"
          ></SignupInput>
        </template>
        <template v-else-if="param.country == 'Y'">
          <SignupInput
            height="40"
            v-model="param.address"
            outlined
            dense
            autocomplete="off"
            class="addDetailOther"
            placeholder="주소를 입력해 주세요."
            :rules="[
              this.validSet.empty(param.address, '상세주소를 입력해주세요'),
            ]"
          ></SignupInput>
        </template>
        <SignupInput
          placeholder="000-0000-0000"
          label="*연락처1"
          type="text"
          v-model="param.phone1"
          height="65"
          :rules="[
            this.validSet.empty(param.phone1, '배송지 연락처를 입력해주세요'),
          ]"
          v-mask="'###-####-####'"
        />
        <SignupInput
          placeholder="000-0000-0000"
          label="연락처2"
          type="text"
          v-model="param.phone2"
          height="65"
          v-mask="'###-####-####'"
        />
        <div style="display: flex" class="mt-3">
          <v-subheader class="my-4" style="width: 130px; height: 0px">
            기본배송지
          </v-subheader>
          <v-checkbox
            v-model="param.defaultYn"
            style="align-items: center; padding-top: 10px"
          >
            <template v-slot:label>
              <h5>기본 배송지로 설정</h5>
            </template>
          </v-checkbox>
        </div>
      </v-form>
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
import validSet from "@/assets/valid";
import SignupInput from "@/views/member/SignUpInput.vue";
import SetPopup from "@/components/SetPopup.vue";
import { mapMutations } from "vuex";
export default {
  name: "SignupPost",
  watch: {
    "param.country": function (v) {
      const phone1 = this.param.phone1;
      if (v === "Y") {
        setTimeout(() => {
          this.param.phone1 = phone1;
        }, 10);
      }
    },
  },
  data() {
    return {
      validSet,
      param: {
        pickname: "",
        phone1: "",
        phone2: "",
        postcode: "",
        name: "",
        defaultYn: false,
        address: "",
        address2: "",
        country: "N",
      },
      countrySet: [
        { key: "N", text: "국내배송지" },
        { key: "Y", text: "해외배송지" },
      ],
    };
  },
  components: {
    SignupInput,
    SetPopup,
  },
  computed: {},
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.signupPost.validate();
    },
    onApprove() {
      if (this.valid()) {
        this.SET_POPUP({
          title: "알림",
          text: "배송지가 선택되었습니다",
          height: 150,
          width: 300,
        });
        this.$refs.postConfirm.openPopup(() => {
          this.closeModal();
          this.$emit("onApprove", {
            ...this.param,
            defaultYn: this.param.defaultYn ? 1 : 0,
          });
        });
      }
    },
    reset() {
      this.param = {
        pickname: "",
        phone1: "",
        phone2: "",
        postcode: "",
        name: "",
        defaultYn: false,
        address: "",
        address2: "",
        country: "N",
      };
    },
    closeModal() {
      this.$emit("closeModal");
    },
    daumPostCode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.param.postcode = data.zonecode;
          this.param.address = data.roadAddress;
        },
      }).open();
    },
  },
};
</script>
<style lang="scss">
.signupPost {
  .cardWrapperLeft {
    display: flex;
  }
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
    margin-bottom: 26px !important;
  }
  .addDetailOther {
    width: 400px;
    margin-left: 130px;
    height: 33px;
    margin-bottom: 26px !important;
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
  .v-input--radio-group--row .v-messages.theme--light {
    display: none !important;
  }
  .addressSelect {
    display: flex;
    position: relative;
    align-items: center;
    height: 56px;
  }
}
</style>
