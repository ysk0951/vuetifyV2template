<template>
  <div class="address">
    <h3 class="mb-2">샘플요청 상세</h3>
    <SetPopup ref="confirm" />
    <RealGrid
      domName="sampleRequestDeatil"
      ref="grid"
      :settings="settings"
      :nonePage="true"
      class="mt-4"
    />
    <h3 class="mt-4 mb-5">추가 정보</h3>
    <v-row class="pl-2">
      <v-col cols="12" sm="2">
        <h4>요청자</h4>
        <v-text-field
          outlined
          dense
          v-model="param.request_name"
          placeholder="요청자를 입력해 주세요."
          disabled
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청업체명</h4>
        <v-text-field
          outlined
          dense
          v-model="param.request_company"
          placeholder="요청업체명을 입력해 주세요."
          disabled
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수령자</h4>
        <v-text-field
          outlined
          dense
          v-model="param.pick_name"
          placeholder="수령자를 입력해 주세요."
          disabled
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>수령업체명</h4>
        <v-text-field
          outlined
          dense
          v-model="param.pick_company"
          placeholder="수령업체명 입력해 주세요."
          disabled
          filled
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="pl-2">
      <v-col cols="12" sm="2">
        <h4>우편번호</h4>
        <v-text-field
          type="text"
          :value="data.postcode"
          outlined
          dense
          disabled
          filled
        />
      </v-col>
      <v-col cols="12" sm="4">
        <h4>배송지주소</h4>
        <v-text-field
          type="text"
          :value="
            (data.address ? data.address : '') +
            ` ` +
            (data.address2 ? data.address2 : '')
          "
          outlined
          dense
          disabled
          filled
        />
      </v-col>
      <v-col cols="12" sm="2">
        <h4>유무상</h4>
        <v-select
          :items="code.P"
          v-model="param.price_type"
          placeholder="선택"
          outlined
          id="work"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="pl-2">
      <v-col cols="12" sm="2">
        <h4>Qty(kg)</h4>
        <v-text-field
          outlined
          dense
          placeholder="(kg)"
          v-model="param.qty"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>요청 자재코드</h4>
        <v-text-field
          outlined
          dense
          placeholder="요청 자재코드를 입력해 주세요."
          v-model="param.request_code"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>분석 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="분석 요청사항을 입력해 주세요."
          v-model="param.analysis"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="2">
        <h4>포장 요청사항</h4>
        <v-select
          :items="code.C"
          v-model="param.packing"
          placeholder="선택"
          outlined
          id="work"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="pl-2">
      <v-col cols="12" sm="2">
        <h4>배송방법</h4>
        <v-select
          :items="code.D"
          v-model="param.delivery_type"
          placeholder="선택"
          outlined
          id="work"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <h4>기타 요청사항</h4>
        <v-text-field
          outlined
          dense
          placeholder="기타 요청사항을 입력해 주세요."
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
import { columns, fields, rows } from "@/assets/grid/sampleRequestLotNo";
import { sampleSearch, updateSample } from "api/sample/sample";
import { mapMutations, mapState } from "vuex";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import _ from "lodash";
export default {
  props: ["data"],
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
        noneNo: true,
      },
      fileName: "",
      param: {
        default: 0,
        postcode: this.data.postcode,
        address: this.data.address,
        address2: this.data.address2,
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
    ...mapMutations("popup", ["SET_POPUP"]),
    ...mapMutations("menu", ["REMOVE_SELECT_MENU"]),
    loadData() {
      if (this.data) {
        sampleSearch(this.data)
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            this.$refs.grid.loadData(items);
            const item = items[0];
            this.param = { ...item };
          })
          .catch(() => {});
      }
    },
    cancle() {
      this.openPopup(
        "취소하시겠습니까",
        () => {
          this.param = {
            default: 0,
            postcode: "",
            address: "",
            price_type: "",
            packing: "",
            delivery_type: "",
            request_code: "",
            analysis: "",
            etc: "",
          };
          this.REMOVE_SELECT_MENU("sampleRequestDetail");
        },
        true
      );
    },
    valid() {
      return true;
    },
    openPopup(text, cb, closable) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    request() {
      const row = this.$refs.grid.getJsonRow();
      if (this.valid()) {
        updateSample({ ...this.param, ...row })
          .then(() => {
            this.openPopup("저장되었습니다", () => {
              this.REMOVE_SELECT_MENU("sampleRequestDetail");
            });
          })
          .catch(() => {
            this.openPopup("서버에러, 관리자에게 문의하세요", this.cancle());
          });
      }
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapState("common", ["code"]),
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
.file {
  .v-text-field__details {
    display: none !important;
  }
  .v-input__slot {
    width: 300px;
  }
}
.aLink {
  color: blue !important;
  text-decoration: underline;
}
.address {
  .v-input__slot {
    width: 100%;
  }
  .row {
    height: 100px;
  }
}
</style>
