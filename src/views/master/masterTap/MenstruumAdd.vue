<template>
  <div class="menstrumm">
    <h3 class="mt-4 mb-2">용매조성 마스터 등록</h3>
    <hr class="mb-4" />
    <v-row v-for="idx in row" :key="idx">
      <v-col
        cols="12"
        :sm="item(idx, i) === '비고' ? 6 : 3"
        v-for="i in col"
        :key="i"
      >
        <template v-if="item(idx, i)">
          <h4>{{ item(idx, i) }}</h4>
          <template v-if="item(idx, i) === 'SUM'">
            <v-text-field outlined dense disabled filled></v-text-field
          ></template>
          <template v-else-if="item(idx, i) === '비고'">
            <v-text-field
              outlined
              dense
              :placeholder="item(idx, i) + '입력'"
              v-model="param[bindKey[(idx - 1) * col + i - 1]]"
            ></v-text-field>
          </template>
          <template v-else-if="item(idx, i) === '밀도'">
            <v-text-field
              outlined
              dense
              :placeholder="item(idx, i) + '입력'"
              v-model="param[bindKey[(idx - 1) * col + i - 1]]"
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
              outlined
              dense
              :placeholder="item(idx, i) + '입력'"
              v-model="param[bindKey[(idx - 1) * col + i - 1]]"
            ></v-text-field>
          </template>
        </template>
      </v-col>
    </v-row>
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="setData">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import * as menstrumm from "@/assets/grid/menstrumm";
import { insertSolventMaster } from "api/solvent/solvent";
import _ from "lodash";
export default {
  data() {
    return {
      grid: "menstrummDetail",
      settings: menstrumm,
      layout: menstrumm.columns,
      col: 4,
      param: {},
      bindKey: [],
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    save() {
      insertSolventMaster({ ...this.param })
        .then(() => {})
        .catch(() => {});
      console.log(this.param);
    },
    item(idx, i) {
      const index = (idx - 1) * this.col + i - 1;
      if (index < this.layout.length) {
        const ret = this.layout[index];
        return ret.header.text;
      } else {
        return;
      }
    },
    bindModel(idx, i) {
      const index = (idx - 1) * this.col + i - 1;
      const field = this.settings.fields[index].fieldName;
      switch (field) {
        case "SUM1":
          return "sum";
        case "비고1":
          return "memo";
        case "밀도1":
          return "mildo";
        default:
          return field;
      }
    },
    setData() {
      const obj = {};
      const key = [];
      _.each(this.settings.fields, (v) => {
        if (v.fieldName === "SUM1") {
          key.push("sum");
          obj.sum = "";
        } else if (v.fieldName === "비고1") {
          key.push("memo");
          obj.memo = "";
        } else if (v.fieldName === "밀도1") {
          key.push("mildo");
          obj.mildo = "";
        } else {
          key.push(v.fieldName);
          obj[v.fieldName] = "";
        }
      });
      this.bindKey = key;
      this.param = obj;
    },
  },
  computed: {
    row() {
      return Math.ceil(this.layout.length / this.col);
    },
  },
  components: {},
  filters: {
    rm(v) {
      const idx = _.indexOf(v, "%");
      if (idx > -1) {
        return v.slice(0, idx + 1);
      } else {
        return v;
      }
    },
  },
  mounted() {
    this.setData();
    console.log(this.bindKey);
  },
};
</script>
<style lang="scss">
.menstrumm {
  .row {
    margin-top: 0px;
  }
}
</style>
