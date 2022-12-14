<template>
  <div class="materialIndexAdd">
    <h3 class="mt-4 mb-2">물질명 인덱스</h3>
    <v-row v-for="idx in row" :key="idx">
      <v-col cols="12" sm="4" v-for="i in col" :key="i">
        <template v-if="item(idx, i)">
          <h4>{{ item(idx, i) }}</h4>
          <v-text-field
            outlined
            dense
            :placeholder="item(idx, i) + ' 입력'"
            v-model="param[bindKey[(idx - 1) * col + i - 1]]"
          ></v-text-field>
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
import * as materialIndex from "@/assets/grid/materialIndex";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      grid: "materialIndexAdd",
      material: "",
      settings: materialIndex,
      layout: materialIndex.columns,
      col: 3,
      param: {},
      bindKey: [],
    };
  },
  computed: {
    ...mapState("common", ["code"]),
    row() {
      return Math.ceil(this.layout.length / this.col);
    },
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    save() {
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
      return this.settings.fields[index].fieldName;
    },
    setData() {
      const obj = {};
      const key = [];
      _.each(this.settings.columns, (v) => {
        key.push(v.key);
        obj[v.key] = "";
      });
      this.bindKey = key;
      this.param = obj;
    },
  },
  components: {},
  mounted() {
    this.setData();
  },
};
</script>
<style lang="scss"></style>
