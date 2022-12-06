<template>
  <div class="address">
    <h3 class="mt-4 mb-2">관리자 샘플 요청</h3>
    <hr class="mb-4" />
    <div>
      <h4 class="mt-4 mb-2">파일 업로드</h4>
    </div>
    <div class="wrapperSpace">
      <div class="wrapperFlex file">
        <v-text-field
          placeholder="파일을 선택해주세요"
          type="text"
          v-model="fileName"
          outlined
          dense
          disabled
          filled
        />
        <v-btn depressed class="ml-3 mr-3 fileBtn" @click="read"
          >불러오기</v-btn
        >
        <v-btn depressed color="primary fileBtn" @click="select"
          >파일선택</v-btn
        >
      </div>
    </div>
    <div class="mb-3">
      <a class="aLink">샘플 다운로드</a>
    </div>
    <h3 class="mt-4 mb-2">요청 목록</h3>
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
        <h4>요청자 이메일</h4>
        <v-text-field
          outlined
          dense
          placeholder="요청자 이메일을 입력해주세요"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <div class="wrapperSpace" style="height: 24px">
          <h4>수령자</h4>
          <v-checkbox>
            <template v-slot:label>
              <h5>요청자와 동일</h5>
            </template></v-checkbox
          >
        </div>
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
    <h4>배송지 선택</h4>
    <v-row style="height: 46px">
      <v-col cols="12" sm="3" class="mb-0">
        <v-radio-group row v-model="param.default">
          <v-radio
            v-for="(n, i) in address"
            :key="n.key"
            :label="n.text"
            :value="i"
          ></v-radio
        ></v-radio-group>
      </v-col>
    </v-row>
    <template v-if="param.default === 1">
      <v-row style="height: 63px">
        <v-col cols="12" sm="6">
          <div class="wrapper address">
            <v-text-field
              placeholder="주소를 입력해주세요"
              type="text"
              v-model="fileName"
              outlined
              dense
              disabled
              filled
            />
            <v-btn
              depressed
              color="primary"
              class="ml-3 mr-3 fileBtn"
              @click="read"
              >주소검색</v-btn
            >
            <v-btn depressed color="primary" class="fileBtn" @click="select"
              >주소록</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </template>
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
      <v-col cols="12" sm="4">
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
          <v-btn depressed color="primary" @click="request">샘플 요청</v-btn>
        </v-card-actions>
      </div>
    </div>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      grid: "newSample",
      settings: {
        columns,
        fields,
        rows,
        height,
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
