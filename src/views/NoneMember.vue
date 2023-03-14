<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-form ref="nonMember" lazy-validation>
        <div class="service">
          <div class="wrapper mt-10">
            <v-row>
              <v-col cols="12" sm="3" class="px-2 sch pa-1 mb-2">
                <h4>Lot No</h4>
                <div class="wrapper">
                  <v-text-field
                    placeholder="Lot No를 입력해주세요"
                    type="text"
                    outlined
                    dense
                    v-model="param.lot_no"
                  />
                  <div class="wrapperEnd">
                    <v-btn depressed outlined class="ml-3 mr-3" @click="reset"
                      >초기화</v-btn
                    >
                    <v-btn depressed color="primary " @click="search"
                      >검색</v-btn
                    >
                  </div>
                </div>
              </v-col>
            </v-row>
          </div>
          <h3 class="mt-4 mb-2">기본정보</h3>
          <hr class="mb-4" />
          <v-row>
            <v-col cols="12" sm="4" class="px-3">
              <h4>Lot No</h4>
              <v-text-field
                type="text"
                outlined
                dense
                v-model="param.lot_no"
                filled
                disabled
              />
            </v-col>
            <v-col cols="12" sm="4">
              <h4>요청 자재코드</h4>
              <v-text-field
                type="text"
                outlined
                dense
                v-model="request_code"
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
                filled
                disabled
                v-model="code"
              />
            </v-col>
          </v-row>
          <h3 class="mt-16 mb-2">진행 상황</h3>
          <hr class="mb-4" />
          <RealGrid
            domName="detailGrid"
            ref="detailGrid"
            :settings="nmSrD"
            @changePage="loadData"
            :none-page="true"
          />
        </div>
      </v-form>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import RealGrid from "@/components/RealGrid.vue";
import * as nmSr from "@/assets/grid/sampleRequest";
import * as nmSrD from "@/assets/grid/sampleRequestDetail";
import { mapState } from "vuex";
import { searchproduce, sampleSearch } from "api/sample/sample";
// import _ from "lodash";
export default {
  data() {
    return {
      code: "",
      request_code: "",
      param: {
        lot_no: "",
        pageSize: "10",
      },
      nmSr: {
        ...nmSr,
        hideCheckBar: true,
      },
      nmSrD: {
        ...nmSrD,
        hideCheckBar: true,
        columns: nmSrD.filteredColumn,
        fields: nmSrD.filteredFields,
      },
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
    valid() {
      return this.$refs.nonMember.validate();
    },
    loadData(v) {
      this.search(v);
    },
    async search(v) {
      if (this.valid()) {
        await this.getSmapleRequest(v);
        await this.getMakingProcess(v);
      }
    },
    reset() {
      this.param = {
        lotNo: "",
      };
    },
    async getSmapleRequest() {
      try {
        const res = await sampleSearch({ ...this.param, currentPage: 1 });
        const response = res.data;
        const items = response.data.items;
        const res_produce = await searchproduce({
          ...this.param,
          currentPage: 1,
        });
        const response_produce = res_produce.data;
        const items_produce = response_produce.data.items;
        if (items && items.length > 0) {
          this.request_code = items[0].request_code;
          this.code = items_produce[0].code;
        }
        if (items_produce && items_produce.length > 0) {
          this.$refs.detailGrid.loadData(items_produce, ["delivery_date"]);
        }
      } catch (err) {
        console.error(err);
      }
    },
    async getMakingProcess() {},
  },
  mounted() {},
};
</script>
<style lang="scss">
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
