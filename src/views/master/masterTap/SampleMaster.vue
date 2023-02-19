<template>
  <div>
    <v-form ref="sampleMaster" lazy-validation>
      <div class="sampleMaster wrapperSpace">
        <v-col cols="12" sm="6">
          <h4>Solvent</h4>
          <v-text-field
            v-model="param.solvent"
            outlined
            dense
            placeholder="solvent/solvent/solvent/solvent/solvent/solvent/solvent/solvent"
            :rules="[this.validSet.sample(param.solvent, 8, 'key')]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>Solvent vol</h4>
          <v-text-field
            v-model="param.solventVol"
            outlined
            dense
            placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
            :rules="[this.validSet.sample(param.solventVol, 8, 'value')]"
          ></v-text-field>
        </v-col>
      </div>
      <div class="sampleMaster wrapperSpace">
        <v-col cols="12" sm="6">
          <h4>Salt</h4>
          <v-text-field
            v-model="param.salt"
            outlined
            dense
            placeholder="salt/salt/salt"
            :rules="[this.validSet.sample(param.salt, 2, 'key')]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>Salt vol</h4>
          <v-text-field
            v-model="param.saltVol"
            outlined
            dense
            placeholder="00.00/00.00/00.00"
            v-mask="'##.##/##.##/##.##'"
            :rules="[this.validSet.sample(param.saltVol, 2, 'value')]"
          ></v-text-field>
        </v-col>
      </div>
      <div class="sampleMaster wrapperSpace">
        <v-col cols="12" sm="6">
          <h4>Add</h4>
          <v-text-field
            v-model="param.add"
            outlined
            dense
            placeholder="add/add/add/add/add/add/add/add/add/add"
            :rules="[this.validSet.sample(param.add, 9, 'key')]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>Add vol</h4>
          <v-text-field
            v-model="param.addVol"
            outlined
            dense
            placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
            :rules="[this.validSet.sample(param.addVol, 9, 'value')]"
          ></v-text-field>
        </v-col>
      </div>
    </v-form>
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <h3 class="mt-16 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">
        샘플 목록
        <v-btn depressed color="primary" @click="addSample">등록</v-btn>
      </div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="search"
      @dbClick="dbClick"
    />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/sampleMaster";
import { sampleMasterList } from "api/sample/sample";
import RealGrid from "@/components/RealGrid.vue";
import _ from "lodash";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      validSet,
      param: {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        add: "",
        addVol: "",
        pageSize: "100",
      },
      grid: "sampleMaster",
      settings: {
        columns,
        fields,
        height,
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    valid() {
      return this.$refs.sampleMaster.validate();
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      if (this.valid()) {
        sampleMasterList({
          ...this.param,
          currentPage: _.isNumber(v) ? v : 1,
        }).then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          _.each(items, function (v) {
            v.work = v.employee_status;
          });
          this.$refs.grid.loadData(items);
          this.$refs.grid.setPage(page);
        });
      }
    },
    addSample() {
      this.$emit("sampleAdd");
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
    dbClick(v) {
      this.$emit("sampleMasterDetail", v);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.sampleMaster {
  height: 80px;
}
</style>
