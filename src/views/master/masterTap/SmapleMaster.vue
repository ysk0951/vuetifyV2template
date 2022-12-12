<template>
  <div>
    <h3 class="mt-4 mb-2">샘플 마스터 관리</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="6">
        <h4>Solvent</h4>
        <v-text-field
          v-model="param.solvent"
          outlined
          dense
          placeholder="solvent/solvent/solvent/solvent/solvent/solvent/solvent/solvent/"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <h4>Solvent Vol</h4>
        <v-text-field
          v-model="param.solventVol"
          outlined
          dense
          placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
        ></v-text-field>
      </v-col>
    </div>
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="6">
        <h4>Salt</h4>
        <v-text-field
          v-model="param.salt"
          outlined
          dense
          placeholder="salt/salt/salt"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <h4>Salt vol</h4>
        <v-text-field
          v-model="param.saltVol"
          outlined
          dense
          placeholder="00.00/00.00/00.00"
        ></v-text-field>
      </v-col>
    </div>
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="6">
        <h4>Add</h4>
        <v-text-field
          v-model="param.add"
          outlined
          dense
          placeholder="add/add/add/add/add/add/add/add/add/add"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <h4>Add Vol</h4>
        <v-text-field
          v-model="param.addVol"
          outlined
          dense
          placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
        ></v-text-field>
      </v-col>
    </div>
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
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/sampleMaster";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      param: {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        add: "",
        addVol: "",
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
      console.log("newSample");
      this.$emit("newSample");
    },
    search() {},
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
