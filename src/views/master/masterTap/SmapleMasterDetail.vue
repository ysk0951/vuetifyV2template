<template>
  <div>
    <h3 class="mt-4 mb-2">기본 정보</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="2">
        <h4>Code Grade</h4>
        <v-text-field
          v-model="param.code"
          outlined
          dense
          filled
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="10">
        <h4>품명</h4>
        <v-text-field
          v-model="param.solventVol"
          outlined
          dense
          placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
        ></v-text-field>
      </v-col>
    </div>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_sample_detail"
      ref="sample_grid"
      :settings="settings_sample"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">실제조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_real_detail"
      ref="real_grid"
      :settings="settings_real"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">제조조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_make_detail"
      ref="make_grid"
      :settings="settings_make"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">세부 스펙</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_spec_detail"
      ref="spec_grid"
      :settings="settings_spec"
      :nonePage="true"
    />
    <div class="wrapper mt-4">
      <v-card-actions>
        <v-btn depressed @click="cancle">취소</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import * as sample from "@/assets/grid/sampleRequest";
import * as sampleSum from "@/assets/grid/sampleRequestSum";
import * as spce from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
// import { makeARow } from "@/assets/grid/gridUtill";
import _ from "lodash";
export default {
  props: ["data"],
  data() {
    return {
      param: {
        code: "",
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        add: "",
        addVol: "",
      },
      grid: "sampleMasterDetail",
      settings_sample: {
        ...sample,
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
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        height: 700,
      },
    };
  },
  methods: {
    loadData() {
      this.param.code = this.data.code;
      this.$refs.sample_grid.loadData([this.data]);
      this.$refs.real_grid.loadData([this.data]);
      this.$refs.make_grid.loadData([this.data]);
      this.$refs.spec_grid.loadData([this.data]);

      //TODO
      // this.$refs.real_grid.loadData(makeARow(this.settings_sample.rowSet));
      // this.$refs.make_grid.loadData(makeARow(this.settings_sample.rowSet));
      // this.$refs.spec_grid.loadData(makeARow(this.settings_spec.rowSet));
    },
    cancle() {},
    save() {},
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
  mounted() {
    this.loadData();
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
