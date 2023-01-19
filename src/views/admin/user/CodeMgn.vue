<template>
  <div>
    <h3 class="mt-4 mb-2">공통코드 관리</h3>
    <hr class="mb-4" />
    <v-form ref="form" lazy-validation>
      <div class="service login">
        <div class="filter">
          <v-row class="row">
            <v-col cols="12" sm="3">
              <h4>공통코드명</h4>
              <v-text-field
                outlined
                dense
                placeholder="공통코드명을 입력해주세요"
                v-model="input.gubun"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="wrapperSpace">
          <div></div>
          <div class="wrapper">
            <v-card-actions>
              <v-btn depressed @click="reset">초기화</v-btn>
            </v-card-actions>
            <v-card-actions>
              <v-btn depressed color="primary" @click="search">검색</v-btn>
            </v-card-actions>
          </div>
        </div>
        <h3 class="mt-16 mb-2 pl-1 pr-1">
          <div class="wrapperSpace">목록</div>
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
    </v-form>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/codeMgn";
import { getCodeAll } from "api/common";
import { mapMutations, mapState } from "vuex";
import RealGrid from "@/components/RealGrid.vue";
import validSet from "@/assets/valid";
import _ from "lodash";
export default {
  data() {
    return {
      input: {
        gubun: "",
      },
      settings: {
        columns,
        fields,
        rows,
        height,
        hideCheckBar: true,
      },
      grid: "codeMgn",
      validSet,
      currentPage: 1,
      pageSize: 10,
      saveParam: {},
    };
  },
  computed: {
    ...mapState("select", ["workType", "roleType"]),
  },
  mounted() {
    this.SET_POPUP({
      title: "알림",
      height: 150,
      width: 300,
      customApprove: true,
    });
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    reset() {
      this.input = {
        gubun: "",
      };
    },
    loadData(v) {
      this.search(v);
    },
    valid() {
      return this.$refs.form.validate();
    },
    search(v) {
      if (this.valid()) {
        console.log(v);
        getCodeAll({
          ...this.input,
          currentPage: _.isNumber(v) ? v : 1,
        }).then((res) => {
          const response = res.data;
          const items = response.data.items;
          const page = response.data.params;
          this.$refs.grid.loadData(items);
          this.$refs.grid.setPage(page);
          // setTimeout(() => {
          //   this.$refs.grid.gv.refresh(true);
          // }, 300);

          // }
        });
      }
    },
    dbClick(data) {
      this.$emit("dbClick", data);
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style>
.login .v-input__slot {
  width: 100% !important;
}
</style>
