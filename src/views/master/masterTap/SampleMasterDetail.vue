<template>
  <div>
    <h3 class="mt-4 mb-2">기본 정보</h3>
    <hr class="mb-4" />
    <SetPopup ref="confirm" />
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
          v-model="param.code_title"
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
import * as spec from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import { sampleMasterDetail, updateSampleMaster } from "api/sample/sample";
import { mapMutations } from "vuex";
import { makeSum, makeSampleSet, showSampleSet } from "@/assets/grid/gridUtill";
// import { makeARow } from "@/assets/grid/gridUtill";
import _ from "lodash";
export default {
  props: ["data"],
  data() {
    return {
      param: {
        code: "",
        code_title: "",
      },
      grid: "sampleMasterDetail",
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
        ...sampleSum,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
      },
      settings_make: {
        ...sampleSum,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
      },
      settings_spec: {
        ...spec,
        columns: _.map(_.cloneDeep(spec.columns), function (v) {
          v.editable = true;
          return v;
        }),
        height: 700,
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    loadData() {
      this.param.code = this.data.code;
      this.search(this.param.code);
    },
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        closable,
        text,
      });
      this.$refs.confirm.openPopup(cb);
    },
    closePopup() {
      this.$refs.confirm.closePopup();
    },
    search(code) {
      sampleMasterDetail(code)
        .then((res) => {
          const response = res.data.data;
          const CodeDB = response.CodeDB;
          const CodeDB_A = response.CodeDB_A;
          const CodeDB_B = response.CodeDB_B;
          const CodeDB_Dt = response.CodeDB_Dt;
          this.$refs.sample_grid.loadData([{ ...CodeDB, code }]);
          this.$refs.real_grid.loadData([{ ...makeSum(CodeDB_A), code }]);
          this.$refs.make_grid.loadData([{ ...makeSum(CodeDB_B), code }]);
          this.$refs.spec_grid.loadData([
            { data: showSampleSet(CodeDB_Dt), code },
          ]);
        })
        .catch((res) => {
          console.error(res);
        });
    },
    cancle() {
      this.loadData();
    },
    save() {
      this.openPopup("저장하시겠습니까?", true, () => {
        const code = this.param.code;
        const dt = this.$refs.spec_grid.getJsonAllRow();
        const sampleDetail = {
          data: makeSampleSet(dt),
        };
        updateSampleMaster({
          sample: { ...this.$refs.sample_grid.getJsonRow(), code },
          sampleA: { ...this.$refs.real_grid.getJsonRow(), code },
          sampleB: { ...this.$refs.make_grid.getJsonRow(), code },
          sampleDetail: { ...sampleDetail, code },
        }).then(() => {
          this.closePopup();
          this.openPopup("저장되었습니다", false);
        });
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
        code: "",
      };
    },
  },
  mounted() {
    this.loadData();
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
