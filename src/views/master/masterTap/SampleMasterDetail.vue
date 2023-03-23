<template>
  <div>
    <SetPopup ref="confirm" />
    <h3 class="mb-2">샘플 마스터 상세</h3>
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
      <v-col cols="12" sm="2">
        <h4>w/w</h4>
        <v-text-field
          v-model="param.wwval"
          outlined
          dense
          filled
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="8">
        <h4>품명</h4>
        <v-text-field
          v-model="param.code_title"
          outlined
          dense
          placeholder="품명을 입력해 주세요."
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
      @changeData="addSpec"
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
      @changeData="changeDataReal"
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
      @changeData="changeDataMake"
    />
    <h3 class="mt-8 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">
        세부 스펙
        <div>
          <v-btn depressed @click="specAdd">추가</v-btn>
          <v-btn depressed color="primary" @click="specDel">삭제</v-btn>
        </div>
      </div>
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
import * as sampleSum from "@/assets/grid/sampleRequestSumWt";
import * as spec from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import { sampleMasterDetail, updateSampleMaster } from "api/sample/sample";
import { mapMutations } from "vuex";
import {
  makeSum,
  makeSampleSet,
  setNewSum,
  makeARow,
} from "@/assets/grid/gridUtill";
// import { makeARow } from "@/assets/grid/gridUtill";
import _ from "lodash";
export default {
  props: ["data"],
  data() {
    return {
      key: {
        solvent1: "solventVol1",
        solvent2: "solventVol2",
        solvent3: "solventVol3",
        solvent4: "solventVol4",
        solvent5: "solventVol5",
        solvent6: "solventVol6",
        solvent7: "solventVol7",
        solvent8: "solventVol8",
        solvent9: "solventVol9",
        solvent10: "solventVol10",
      },
      param: {
        code: "",
        code_title: "",
      },
      grid: "sampleMasterDetail",
      settings_sample: {
        ...sample,
        columns: _.map(
          _.filter(
            _.cloneDeep(sample.columns),
            (v) => v.fieldName !== "lot_no"
          ),
          function (v) {
            v.editable = true;
            return v;
          }
        ),
        hideCheckBar: true,
        height: 150,
        noneNo: true,
      },
      settings_real: {
        ...sampleSum,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
        noneNo: true,
      },
      settings_make: {
        ...sampleSum,
        columns: _.map(_.cloneDeep(sampleSum.columns), function (v) {
          v.editable = true;
          return v;
        }),
        hideCheckBar: true,
        height: 150,
        noneNo: true,
      },
      settings_spec: {
        ...spec,
        columns: _.map(_.cloneDeep(spec.columns), function (v) {
          v.editable = true;
          return v;
        }),
        height: 700,
        noneNo: true,
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    ...mapMutations("menu", [
      "REMOVE_SELECT_MENU",
      "SET_SELECT_MENU_TAB_BY_CODE",
    ]),
    loadData() {
      var chk = false;
      if (this.param.code != this.data.code) {
        chk = true;
      }
      this.param.code = this.data.code;
      if (chk) {
        this.search(this.param.code);
      }
    },
    ...mapMutations("popup", ["SET_POPUP"]),
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text,
        closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    specAdd() {
      const row = this.$refs.spec_grid.getJsonRows();
      const add = makeARow(spec.fields);
      this.$refs.spec_grid.loadData(row.concat(add));
    },
    specDel() {
      const row = this.$refs.spec_grid.getJsonRows();
      const idx = this.$refs.spec_grid.getCheckedRowIdx();
      if (idx.length < 1) {
        this.openPopup("삭제할 행을 선택해주세요");
      } else {
        this.openPopup("삭제하시겠습니까", true, () => {
          const ret = _.filter(row, (v, index) => {
            return !idx.includes(index);
          });
          this.$refs.spec_grid.loadData(ret);
        });
      }
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
          this.param.code_title = CodeDB.code_title;
          this.param.wwval = CodeDB.wwval;
          this.$refs.spec_grid.loadData(CodeDB_Dt);
        })
        .catch((res) => {
          console.error(res);
        });
    },
    cancle() {
      this.openPopup("취소 하시겠습니까?", true, () => {
        this.REMOVE_SELECT_MENU("sampleDetail");
        this.SET_SELECT_MENU_TAB_BY_CODE("SPMGMT");
      });
    },
    save() {
      this.openPopup("저장하시겠습니까?", true, () => {
        const code = this.param.code;
        const code_title = this.param.code_title;
        const dt = this.$refs.spec_grid.getJsonAllRow();
        const sum1 = this.$refs.real_grid.getJsonRow().sum;
        const sum2 = this.$refs.make_grid.getJsonRow().sum;
        if (sum1 > 100 || sum2 > 100) {
          this.openPopup("SUM 정보를 확인해 주세요");
        } else {
          const sampleDetail = _.each(makeSampleSet(dt), (v) => {
            v.code = code;
          });
          updateSampleMaster({
            sample: {
              ...this.$refs.sample_grid.getJsonRow(),
              code,
              code_title,
            },
            sampleA: { ...this.$refs.real_grid.getJsonRow(), code },
            sampleB: { ...this.$refs.make_grid.getJsonRow(), code },
            sampleDetail,
          }).then(() => {
            this.closePopup();
            this.openPopup("저장되었습니다", false);
          });
        }
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
    setNewSum(ref) {
      const row = this.$refs[ref].getJsonRow();
      const sum = [setNewSum(row)];
      this.$refs[ref].loadData(sum);
    },
    changeDataReal() {
      this.setNewSum("real_grid");
    },
    changeDataMake() {
      this.setNewSum("make_grid");
    },
    addSpec() {
      const row = this.$refs.sample_grid.getJsonRow();
      const key = _.keys(row);
      const beforeSpec = this.$refs.spec_grid.getJsonRows();
      const fixSpec = beforeSpec.slice(-11);
      const rowArr = [];
      let unit = "";
      let vol = "";
      _.each(key, (v) => {
        if (!v.includes("Vol")) {
          if (v.includes("solvent")) {
            unit = "vol";
            vol = Number(row[this.key[v]]);
          } else if (v.includes("salt")) {
            unit = "M.wt%";
          } else if (v.includes("add")) {
            unit = "wt%";
          }
          const spec = row[v];
          if (!_.isEmpty(spec)) {
            rowArr.push({ spec, unit, vol, low: 0, mid: 0, hig: 0 });
          }
        }
      });
      console.log(rowArr);
      this.$refs.spec_grid.loadData(rowArr.concat(fixSpec));
    },
  },
  mounted() {
    this.loadData();
    this.specBefore = this.$refs.spec_grid.getJsonRows();
  },
  components: {
    RealGrid,
    SetPopup,
  },
};
</script>
<style lang="scss"></style>
