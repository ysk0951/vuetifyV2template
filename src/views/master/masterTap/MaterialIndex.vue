<template>
  <div class="material">
    <h3 class="mt-4 mb-2">물질명 인덱스</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-row>
        <v-col cols="12" sm="2">
          <h4>연료명칭</h4>
          <v-select
            width="450"
            :items="code.M"
            outlined
            v-model="material"
            placeholder="전체"
          ></v-select>
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
    <h3 class="mt-16 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">목록</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
  </div>
</template>
<script>
import { columns, fields, height } from "@/assets/grid/materialIndex";
import RealGrid from "@/components/RealGrid.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      grid: "materialIndex",
      settings: {
        columns,
        fields,
        height,
      },
      material: "",
    };
  },
  computed: {
    ...mapState("common", ["code"]),
  },
  methods: {
    newSample() {
      this.$emit("newSample");
    },
    search() {},
    reset() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.material {
  .v-input__slot {
    width: 200px;
  }
}
</style>
