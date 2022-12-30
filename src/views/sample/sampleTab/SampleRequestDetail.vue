<template>
  <div class="address">
    <h3 class="mt-4 mb-2">샘플 요청 검수</h3>
    <hr class="mb-4" />
    <RealGrid
      domName="sampleRequestDeatil"
      ref="grid"
      :settings="settings"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2">추가 정보</h3>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="12" sm="2">
        <h4>요청자</h4>
        <v-text-field
          outlined
          dense
          placeholder="요청자 이름을 입력해주세요"
          v-model="param.request_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수령자</h4>
        <v-text-field
          outlined
          dense
          placeholder="수령자 이름을 입력해주세요"
          v-model="param.pick_name"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>유무상</h4>
        <v-select
          :items="code.P"
          v-model="param.price_type"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
    </v-row>
    <h4>배송지</h4>
    <v-row style="height: 63px">
      <v-col cols="12" sm="2">
        <div class="wrapper address">
          <v-text-field
            type="text"
            v-model="param.postCode"
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
            v-model="param.address"
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
          v-model="param.request_code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>분석 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="분석 요청사항을 입력해주세요"
          v-model="param.analysis"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>포장 요청사항</h4>
        <v-select
          :items="code.C"
          v-model="param.packing"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>배송방법</h4>
        <v-select
          :items="code.D"
          v-model="param.delivery_type"
          placeholder="선택해주세요"
          outlined
          id="work"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <h4>기타 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="기타 요청사항을 입력해주세요"
          v-model="param.etc"
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
import { sampleSearch, updateSample } from "api/sample/sample";
import { mapState } from "vuex";
import RealGrid from "@/components/RealGrid.vue";
import _ from "lodash";
export default {
  props: ["data"],
  watch: {
    data: {
      deep: true,
      handler: function (v) {
        this.loadData(v);
      },
    },
  },
  data() {
    return {
      settings: {
        columns: _.map(_.cloneDeep(columns), function (v) {
          v.editable = true;
          return v;
        }),
        fields,
        rows,
        hideCheckBar: true,
      },
      fileName: "",
      param: {
        default: 0,
        postCode: this.data.postCode,
        address: this.data.address,
        price_type: "",
        packing: "",
        delivery_type: "",
        request_name: "",
        pick_name: "",
        request_code: "",
        analysis: "",
        etc: "",
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
      this.$emit("newSample");
    },
    loadData() {
      if (this.data) {
        sampleSearch(this.data)
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            this.$refs.grid.loadData(items);
          })
          .catch(() => {});
      }
    },
    read() {},
    select() {},
    cancle() {
      this.param = {
        default: 0,
        postCode: this.data.postCode,
        address: this.data.address,
        price_type: "",
        packing: "",
        delivery_type: "",
        request_name: "",
        pick_name: "",
        request_code: "",
        analysis: "",
        etc: "",
      };
    },
    valid() {
      return true;
    },
    request() {
      const row = this.$refs.grid.getJsonRow();
      if (this.valid()) {
        updateSample({ ...this.param, ...row });
      }
    },
  },
  components: {
    RealGrid,
  },
  computed: {
    ...mapState("common", ["code"]),
    otherAddress() {
      return !this.param.default;
    },
  },
  mounted() {
    this.loadData();
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
