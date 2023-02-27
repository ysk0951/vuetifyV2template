<template>
  <div>
    <SetPopup ref="confirm" />
    <v-form lazy-validation ref="form">
      <div class="wrapperSpace">
        <v-col cols="12" sm="4">
          <h4>*마스터 복사</h4>
          <div class="wrapper">
            <v-text-field
              v-model="input.code_grade"
              outlined
              dense
              placeholder="Code Grade를 입력해 주세요."
              :rules="[
                this.validSet.empty(
                  input.code_grade,
                  'Code Grade를 입력해주세요'
                ),
              ]"
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
            v-model="param.code_title"
            outlined
            dense
            placeholder="품명을 입력해 주세요."
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      class="sample_grid"
      domName="settings_sample_add_div1"
      ref="sample_grid_div1"
      :settings="settings_div1"
      :nonePage="true"
      @changeData="addSpec('sample_grid_div1')"
    />
    <RealGrid
      class="sample_grid"
      domName="settings_sample_add_div2"
      ref="sample_grid_div2"
      :settings="settings_div2"
      :nonePage="true"
    />
    <RealGrid
      class="sample_grid"
      domName="settings_sample_add_div3"
      ref="sample_grid_div3"
      :settings="settings_div3_noSum"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">실제조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      class="real_grid"
      domName="settings_real_add_div1"
      ref="real_grid_div1"
      :settings="settings_div1"
      :nonePage="true"
      @changeData="changeDataReal"
    />
    <RealGrid
      class="real_grid"
      domName="settings_real_add_div2"
      ref="real_grid_div2"
      :settings="settings_div2"
      :nonePage="true"
      @changeData="changeDataReal"
    />
    <RealGrid
      class="real_grid"
      domName="settings_real_add_div3"
      ref="real_grid_div3"
      :settings="settings_div3"
      :nonePage="true"
      @changeData="changeDataReal"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">제조조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      class="make_grid"
      domName="settings_make_add_div1"
      ref="make_grid_div1"
      :settings="settings_div1"
      :nonePage="true"
      @changeData="changeDataMake"
    />
    <RealGrid
      class="make_grid"
      domName="settings_make_add_div2"
      ref="make_grid_div2"
      :settings="settings_div2"
      :nonePage="true"
      @changeData="changeDataMake"
    />
    <RealGrid
      class="make_grid"
      domName="settings_make_add_div3"
      ref="make_grid_div3"
      :settings="settings_div3"
      :nonePage="true"
      @changeData="changeDataMake"
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
  setNewSum,
} from "@/assets/grid/gridUtill";
import SetPopup from "@/components/SetPopup.vue";
import _ from "lodash";
import * as sample1 from "@/assets/grid/sampleRequestDiv1";
import * as sample2 from "@/assets/grid/sampleRequestDiv2";
import * as sample3 from "@/assets/grid/sampleRequestDiv3";
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
        code_title: "",
        code_grade: "",
      },
      grid: "sampleMasterAdd",
      specBefore: [],
      settings_div1: this.gridSetting(sample1, false),
      settings_div2: this.gridSetting(sample2, false),
      settings_div3: this.gridSetting(sample3, false),
      settings_div3_noSum: this.gridSetting(sample3, true),
      settings_spec: this.gridSetting(spec, false, 700),
    };
  },
  mounted() {
    this.setGrid();
    this.specBefore = this.$refs.spec_grid.getJsonRows();
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.form.validate();
    },
    gridSetting(sample, existSum, height) {
      return {
        ...sample,
        columns: existSum
          ? _.map(
              _.filter(
                _.cloneDeep(sample3.columns),
                (v) => v.fieldName !== "sum"
              ),
              function (v) {
                v.editable = true;
                return v;
              }
            )
          : _.map(_.cloneDeep(sample.columns), function (v) {
              v.editable = true;
              return v;
            }),
        hideCheckBar: true,
        height: height ? height : 150,
        noneNo: true,
      };
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
    setNewSum(ref) {
      let tmp = {};
      for (let i = 1; i <= 3; i++) {
        tmp = { ...tmp, ...this.$refs[ref + i].getJsonRow() };
      }
      console.log(tmp);
      const sum = [setNewSum(tmp)];
      this.$refs[ref + 3].loadData(sum);
    },
    changeDataReal() {
      this.setNewSum("real_grid_div");
    },
    changeDataMake() {
      this.setNewSum("make_grid_div");
    },
    addSpec(ref) {
      const row = this.$refs[ref].getJsonRow();
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
          if (!_.isEmpty(name)) {
            rowArr.push({ ...rowtmp, name, dan });
          }
        }
      });
      this.$refs.spec_grid.loadData(rowArr.concat(this.specBefore));
    },
    setGrid() {
      const gridKey = ["sample_grid_div", "real_grid_div", "make_grid_div"];
      const sampleKey = [sample1.fields, sample2.fields, sample3.fields];
      this.setGridExec(gridKey, sampleKey);
      this.$refs.spec_grid.loadData(spec.initRow);
    },
    setGridExec(g, s) {
      _.each(g, (v) => {
        for (let i = 1; i <= 3; i++) {
          console.log(v, i, makeARow(s[i - 1]));
          this.$refs[v + i].loadData(makeARow(s[i - 1]));
        }
      });
    },
    setGridExecSearch(g, s) {
      _.each(g, (v) => {
        for (let i = 1; i <= 3; i++) {
          this.$refs[v + i].loadData([s[v]]);
        }
      });
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
            const gridKey = [
              "sample_grid_div",
              "real_grid_div",
              "make_grid_div",
            ];
            const sampleKey = {
              sample_grid_div: { ...CodeDB, code },
              real_grid_div: { ...makeSum(CodeDB_A), code },
              make_grid_div: { ...makeSum(CodeDB_B), code },
            };
            this.setGridExecSearch(gridKey, sampleKey);
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
      const sum1 = this.$refs.real_grid_div3.getJsonRow().sum;
      const sum2 = this.$refs.make_grid_div3.getJsonRow().sum;
      if (sum1 > 100 || sum2 > 100) {
        this.openPopup("SUM 정보를 확인해 주세요");
      } else {
        const code = this.input.code_grade;
        const sample = {
          ...this.$refs.sample_grid_div1.getJsonRow(),
          ...this.$refs.sample_grid_div2.getJsonRow(),
          ...this.$refs.sample_grid_div3.getJsonRow(),
          code_title: this.param.code_title,
        };
        const sampleA = {
          ...this.$refs.real_grid_div1.getJsonRow(),
          ...this.$refs.real_grid_div2.getJsonRow(),
          ...this.$refs.real_grid_div3.getJsonRow(),
        };
        const sampleB = {
          ...this.$refs.make_grid_div1.getJsonRow(),
          ...this.$refs.make_grid_div2.getJsonRow(),
          ...this.$refs.make_grid_div3.getJsonRow(),
        };
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
              this.$emit("save");
            })
            .catch(() => {});
        });
      }
    },
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss" scope>
.sample_grid {
  margin-bottom: 10px !important;
  .rg-header {
    background-color: #edf1d6;
  }
}
.real_grid {
  margin-bottom: 10px !important;
  .rg-header {
    background-color: #e1eedd;
  }
}
.make_grid {
  margin-bottom: 10px !important;
  .rg-header {
    background-color: #9dc08b;
  }
}
</style>
