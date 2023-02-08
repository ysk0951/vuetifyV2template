<template>
  <div>
    <div class="wrapperSpace mt-4">
      <v-row class="pl-2">
        <v-col cols="12" sm="3">
          <h4>Code Grade</h4>
          <v-text-field
            outlined
            dense
            placeholder="Code Grade를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>Lot No</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot No를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "resultInput",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    reset() {},
    search() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
