<template>
  <div>
    <h3 class="mt-4 mb-2">샘플 마스터 등록</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="4">
        <h4>마스터 복사</h4>
        <div class="wrapper">
          <v-text-field
            v-model="input.code_grade"
            outlined
            dense
            placeholder="Code Grade를 입력해주세요"
          ></v-text-field>
          <v-btn
            style="height: 40px"
            depressed
            color="primary"
            class="ml-2"
            @click="search"
            >불러오기</v-btn
          >
        </div>
      </v-col>
    </div>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">기본 정보</div>
    </h3>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="12" sm="2">
        <h4>Code Grade</h4>
        <div class="wrapper">
          <v-text-field outlined dense disabled filled></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" sm="10">
        <h4>품명</h4>
        <div class="wrapper">
          <v-text-field
            v-model="param.code_grade"
            outlined
            dense
            placeholder="품명을 입력해 주세요"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_sample_add"
      ref="sample_grid"
      :settings="settings_sample"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">실제조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_real_add"
      ref="real_grid"
      :settings="settings_real"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">제조조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_make_add"
      ref="make_grid"
      :settings="settings_make"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">세부 스펙</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_spec"
      ref="spec_grid"
      :settings="settings_spec"
      :nonePage="true"
    />
  </div>
</template>
<script>
import { sampleMasterDetail } from "api/sample/sample";
import _ from "lodash";
import * as sample from "@/assets/grid/sampleRequest";
import * as sampleSum from "@/assets/grid/sampleRequestSum";
import * as spce from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      input: {
        code_grade: "",
      },
      param: {
        name: "",
        code_grade: "",
      },
      grid: "sampleMasterAdd",
      settings_sample: {
        ...sample,
        columns: _.map(_.cloneDeep(sample.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
      },
      settings_real: {
        ...sample,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
      },
      settings_make: {
        ...sample,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
      },
      settings_spec: {
        ...spce,
        columns: _.map(_.cloneDeep(spce.columns), function (v) {
          v.editable = true;
          return v;
        }),
        height: 700,
      },
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    search() {
      sampleMasterDetail(this.input.code_grade)
        .then((res) => {
          const response = res.data.data;
          const code = response.CodeDB;
          const code_real = response.CodeDB_A;
          const code_make = response.CodeDB_B;
          const spec = response.CodeDB_Dt;
          this.$refs.sample_grid.loadData([code]);
          this.$refs.real_grid.loadData([code_real]);
          this.$refs.make_grid.loadData([code_make]);
          this.$refs.spec_grid.loadData([spec]);
          this.param.code_grade = this.input.code_grade;
        })
        .catch((res) => {
          console.error(res);
        });
    },
    reset() {
      this.param = {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        add: "",
        addVol: "",
      };
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
