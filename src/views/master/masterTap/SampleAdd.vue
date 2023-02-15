<template>
  <div>
    <SetPopup ref="confirm" />
    <v-form lazy-validation ref="form">
      <div class="wrapperSpace">
        <v-col cols="12" sm="4">
          <h4>마스터 복사</h4>
          <div class="wrapper">
            <v-text-field
              v-model="input.code_grade"
              outlined
              dense
              placeholder="Code Grade를 입력해주세요"
              :rules="[this.validSet.empty]"
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
    </v-form>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">기본 정보</div>
    </h3>
    <hr class="mb-4" />
    <v-row class="pl-3">
      <v-col cols="12" sm="4">
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
      <div class="wrapperSpace">
        조성<v-btn depressed color="primary" @click="addSpec"
          >세부스펙 반영</v-btn
        >
      </div>
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
    <div class="wrapper mt-4">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import { insertSampleMaster, sampleMasterDetail } from "api/sample/sample";
import {
  makeSum,
  makeARow,
  makeSampleSet,
  showSampleSet,
} from "@/assets/grid/gridUtill";
import SetPopup from "@/components/SetPopup.vue";
import _ from "lodash";
import * as sample from "@/assets/grid/sampleRequest";
import * as sampleSum from "@/assets/grid/sampleRequestSum";
import * as spec from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
import { mapMutations } from "vuex";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      validSet,
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
  mounted() {
    this.setGrid();
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.form.validate();
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
    newSample() {
      this.$emit("newSample");
    },
    addSpec() {
      const row = this.$refs.sample_grid.getJsonRow();
      const specBefore = this.$refs.spec_grid.getJsonRows();
      const key = _.keys(row);
      const rowtmp = makeARow(spec.fields)[0];
      const rowArr = [];
      let dan = "";
      _.each(key, (v) => {
        if (!v.includes("Vol")) {
          if (v.includes("solvent")) {
            dan = "vol";
          } else if (v.includes("salt")) {
            dan = "M.wt%";
          } else if (v.includes("add")) {
            dan = "wt%";
          }
          const name = row[v];
          const existSpec = _.filter(rowArr, (v) => {
            v.name = name;
          });
          console.log(v, name, existSpec);
          if (!_.isEmpty(name)) rowArr.push({ ...rowtmp, name, dan });
        }
      });
      this.$refs.spec_grid.loadData(rowArr.concat(specBefore));
    },
    setGrid() {
      this.$refs.sample_grid.loadData(makeARow(sample.fields));
      this.$refs.real_grid.loadData(makeARow(sampleSum.fields));
      this.$refs.make_grid.loadData(makeARow(sampleSum.fields));
      this.$refs.spec_grid.loadData(spec.initRow);
    },
    search() {
      if (this.valid()) {
        sampleMasterDetail(this.input.code_grade)
          .then((res) => {
            const code = this.input.code_grade;
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
            this.param.code_grade = code;
          })
          .catch((res) => {
            console.error(res);
          });
      }
    },
    reset() {
      this.param = {
        name: "",
        code_grade: "",
      };
      this.input = {
        code_grade: "",
      };
      this.setGrid();
    },
    save() {
      const code = this.input.code_grade;
      const sample = { ...this.$refs.sample_grid.getJsonRow() };
      const sampleA = { ...this.$refs.real_grid.getJsonRow() };
      const sampleB = { ...this.$refs.make_grid.getJsonRow() };
      const dt = this.$refs.spec_grid.getJsonAllRow();
      const sampleDetail = {
        data: makeSampleSet(dt),
        code,
      };
      this.openPopup("저장 하시겠습니까?", true, () => {
        insertSampleMaster({
          sample,
          sampleA,
          sampleB,
          sampleDetail,
        })
          .then(() => {
            this.openPopup("저장되었습니다", false);
          })
          .catch(() => {});
      });
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
