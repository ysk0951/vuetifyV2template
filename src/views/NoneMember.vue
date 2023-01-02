<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <div class="service">
        <div class="wrapper mt-10">
          <v-row>
            <v-col cols="12" sm="3" class="pr-0">
              <h4>Lot No</h4>
              <v-text-field
                placeholder="Lot No를 입력해주세요"
                type="text"
                outlined
                dense
                v-model="param.lotNo"
              />
            </v-col>
            <v-col cols="12" sm="9" class="pl-0 search">
              <v-btn depressed class="ml-3 mr-3" @click="reset">초기화</v-btn>
              <v-btn depressed color="primary " @click="reset">검색</v-btn>
            </v-col>
          </v-row>
        </div>
        <h3 class="mt-4 mb-2">기본정보</h3>
        <hr class="mb-4" />
        <v-row>
          <v-col cols="12" sm="4">
            <h4>Lot No</h4>
            <v-text-field
              type="text"
              outlined
              dense
              v-model="param.lotNo"
              filled
              disabled
            />
          </v-col>
          <v-col cols="12" sm="4">
            <h4>Code Grade</h4>
            <v-text-field
              type="text"
              outlined
              dense
              v-model="param.lotNo"
              filled
              disabled
            />
          </v-col>
        </v-row>
        <h3 class="mt-4 mb-2">요청 내역</h3>
        <hr class="mb-4" />
        <RealGrid
          domName="sampleGrid"
          ref="sampleGrid"
          :settings="nmSr"
          @changePage="loadData"
          :none-page="true"
        />
        <h3 class="mt-4 mb-2">진행 상황</h3>
        <hr class="mb-4" />
        <RealGrid
          domName="detailGrid"
          ref="detailGrid"
          :settings="nmSrD"
          @changePage="loadData"
          :none-page="true"
        />
      </div>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid.vue";
import * as nmSr from "@/assets/grid/sampleRequest";
import * as nmSrD from "@/assets/grid/sampleRequestDetail";
import { mapState } from "vuex";
import { makeARow } from "@/assets/grid/gridUtill";
// import _ from "lodash";
export default {
  data() {
    return {
      param: {
        lotNo: "",
      },
      nmSr,
      nmSrD: {
        ...nmSrD,
        columns: nmSrD.filteredColumn,
        fields: nmSrD.filteredFields,
      },
      detailFilter: ["6"],
    };
  },
  computed: {
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
    RealGrid,
  },
  async created() {},
  methods: {
    loadData(v) {
      this.search(v);
    },
    search(v) {
      console.log(v);
    },
    reset() {
      this.param = {
        lotNo: "",
      };
    },
    test() {
      this.$refs.sampleGrid.loadData(makeARow(nmSr.fields));
      this.$refs.detailGrid.loadData(makeARow(nmSrD.fields));
    },
  },
  mounted() {
    this.test();
  },
};
</script>
<style lang="scss">
.full {
  height: 100%;
  width: 100%;
  background-color: white;
}
.service {
  width: 80%;
  .v-input__slot {
    width: 100% !important;
  }
  .search {
    margin: auto;
    margin-left: 0px;
  }
}
</style>
