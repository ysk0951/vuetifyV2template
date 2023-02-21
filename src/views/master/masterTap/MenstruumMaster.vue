<template>
  <div>
    <v-form ref="menstrumm" lazy-validation>
      <div class="menstrumm wrapperSpace">
        <v-col cols="12" sm="6">
          <h4>Solvent</h4>
          <v-text-field
            v-model="param.solvent"
            outlined
            dense
            placeholder="solvent/solvent/solvent/solvent/solvent/solvent/solvent/solvent/"
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
      <div class="menstrumm wrapperSpace">
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
            :rules="[this.validSet.sample(param.saltVol, 2, 'value')]"
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
        용매조성 목록
        <v-btn depressed color="primary" @click="addSample">등록</v-btn>
      </div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @changePage="loadData"
      @dbClick="dbClick"
    />
  </div>
</template>
<script>
import * as menstrumm from "@/assets/grid/menstrumm";
import RealGrid from "@/components/RealGrid.vue";
import { solventMasterList } from "api/solvent/solvent";
import _ from "lodash";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      validSet,
      origin: [],
      param: {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        pageSize: "10",
      },
      grid: "menstrumm",
      settings: { ...menstrumm, hideCheckBar: true, noneNo: true },
    };
  },
  methods: {
    valid() {
      return this.$refs.menstrumm.validate();
    },
    search(v) {
      if (this.valid()) {
        solventMasterList({ ...this.param, currentPage: _.isNumber(v) ? v : 1 })
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            const page = response.data.params;
            this.origin = items;
            this.$refs.grid.loadData(items);
            this.$refs.grid.setPage(page);
          })
          .catch(() => {});
      }
    },
    addSample() {
      this.$emit("menstruumAdd");
    },
    loadData(v) {
      this.search(v);
    },
    dbClick(data) {
      this.$emit("dbClick", data);
    },
    reset() {
      this.param = {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
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
<style lang="scss"></style>
