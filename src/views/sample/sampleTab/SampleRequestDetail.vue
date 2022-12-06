<template>
  <div class="address">
    <h3 class="mt-4 mb-2">샘플 요청 검수</h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
    <h3 class="mt-4 mb-2">추가 정보</h3>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="12" sm="2">
        <h4>요청자</h4>
        <v-text-field
          outlined
          dense
          placeholder="요청자 이름을 입력해주세요"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수령자</h4>
        <v-text-field
          outlined
          dense
          placeholder="수령자 이름을 입력해주세요"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>유무상</h4>
        <v-select :items="price" outlined id="work"></v-select>
      </v-col>
    </v-row>
    <h4>배송지</h4>
    <v-row style="height: 63px">
      <v-col cols="12" sm="2">
        <div class="wrapper address">
          <v-text-field
            type="text"
            v-model="fileName"
            outlined
            dense
            disabled
            filled
          />
        </div>
      </v-col>
      <v-col cols="12" sm="4">
        <div class="wrapper address">
          <v-text-field
            type="text"
            v-model="fileName"
            outlined
            dense
            disabled
            filled
          />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="2">
        <h4>Qty(kg)</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청 자재코드</h4>
        <v-text-field
          outlined
          dense
          placeholder="요청 자재코드를 입력해주세요"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>분석 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="분석 요청사항을 입력해주세요"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>포장 요청사항</h4>
        <v-select :items="this.package" outlined id="work"></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>포장 요청사항</h4>
        <v-select :items="this.package" outlined id="work"></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <h4>기타 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="기타 요청사항을 입력해주세요"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="wrapper">
      <div class="wrapper mt-16">
        <v-card-actions>
          <v-btn depressed @click="cancle">취소</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="request">완료</v-btn>
        </v-card-actions>
      </div>
    </div>
  </div>
</template>
<script>
import { columns, fields, rows } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      grid: "sampleRequestDetail",
      settings: {
        columns,
        fields,
        rows,
        height: 100,
      },
      fileName: "",
      price: ["전체", "유상", "무상"],
      package: ["선택", "AI", "P", "S", "18L", "50L", "200L", "말통"],
      param: {
        default: 0,
      },
      address: [
        {
          key: "default",
          text: "기본배송지",
        },
        {
          key: "other",
          text: "다른 배송지",
        },
      ],
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    read() {},
    select() {},
    cancle() {},
    request() {},
  },
  components: {
    RealGrid,
  },
  computed: {
    otherAddress() {
      return !this.param.default;
    },
  },
};
</script>
<style lang="scss">
.fileBtn {
  height: 41px !important;
}
.file .v-text-field__details {
  display: none !important;
}
.aLink {
  color: blue !important;
  text-decoration: underline;
}
.file .v-input__slot {
  width: 300px;
}
.address .v-input__slot {
  width: 100%;
}
.address .row {
  height: 100px;
}
</style>
