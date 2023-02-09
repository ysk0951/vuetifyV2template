<template>
  <div>
    <v-form ref="userMaster" lazy-validation>
      <div class="userMaster wrapperSpace">
        <v-row class="ml-0">
          <v-col cols="12" sm="2">
            <h4>이름</h4>
            <v-text-field
              outlined
              dense
              placeholder="이름을 입력해주세요"
              v-model="param.memberName"
              :rules="[this.validSet.name]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>기업명</h4>
            <v-text-field
              outlined
              dense
              placeholder="기업명을 입력해주세요"
              v-model="param.company"
              :rules="[this.validSet.company]"
            ></v-text-field>
          </v-col>
        </v-row>
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
</template>
<script>
import { columns, fields, height } from "@/assets/grid/userMaster";
import RealGrid from "@/components/RealGrid.vue";
import { memberList } from "api/member/member";
import _ from "lodash";
import validSet from "@/assets/valid";
export default {
  data() {
    return {
      validSet,
      grid: "userMaster",
      settings: {
        columns,
        fields,
        height,
        errorMessage: "데이터가 존재하지 않습니다",
        hideCheckBar: true,
      },
      param: {
        memberName: "",
        company: "",
        pageSize: 10,
      },
      currentPage: 1,
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    valid() {
      return this.$refs.userMaster.validate();
    },
    loadData(v) {
      this.search(v);
    },
    search(v) {
      if (this.valid()) {
        memberList({
          ...this.param,
          currentPage: _.isNumber(v) ? v : 1,
        })
          .then((res) => {
            const response = res.data;
            const items = response.data.items;
            const page = response.data.params;
            this.$refs.grid.loadData(items);
            this.$refs.grid.setPage(page);
          })
          .catch((res) => {
            console.error(res);
          })
          .finally();
      }
    },
    dbClick(data) {
      this.$emit("dbClick", data);
    },
    reset() {
      this.param = {
        memberName: "",
        company: "",
        pageSize: 10,
      };
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
