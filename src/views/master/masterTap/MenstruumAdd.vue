<template>
  <div>
    <h3 class="mt-4 mb-2">용매조성 마스터 등록</h3>
    <hr class="mb-4" />
    <v-row v-for="(item, idx) in layout" :key="idx">
      <v-col cols="12" sm="3">
        <h4>{{ item.excelKey ? item.excelKey : item.fieldName | rm }}</h4>
        <v-text-field
          outlined
          dense
          placeholder="00.00/00.00/00.00/00.00/00.00/00.00/00.00/00.00"
        ></v-text-field>
      </v-col>
    </v-row>
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import * as menstrumm from "@/assets/grid/menstrumm";
import _ from "lodash";
export default {
  data() {
    return {
      grid: "menstrummDetail",
      settings: menstrumm,
      layout: menstrumm.fields,
    };
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    save() {},
    reset() {},
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
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
