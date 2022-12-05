<template>
  <v-flex xs12>
    <div class="pa-10">
      <div class="pa-5 background">
        <div>
          <h4>이름</h4>
        </div>
        <v-text-field
          :width="'300px'"
          outlined
          dense
          placeholder="이름을 입력해주세요"
          v-model="name"
        ></v-text-field>
      </div>
      <div class="wrapperEnd">
        <v-card-actions>
          <v-btn depressed @click="reset">초기화</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="search">검색</v-btn>
        </v-card-actions>
      </div>
      <h3 class="mt-4 mb-2">목록</h3>
      <hr class="mb-4 px-10" />
      <RealGrid :domName="grid" ref="grid" :settings="settings" />
    </div>
  </v-flex>
</template>
<script>
import RealGrid from "@/components/RealGrid";
import { columns, fields, rows } from "@/assets/grid/group";
export default {
  name: "AddGroup",
  components: {
    RealGrid,
  },
  data() {
    return {
      name: "",
      grid: "group",
      settings: { columns, fields, rows },
    };
  },
  methods: {
    reset() {},
    search() {},
  },
};
</script>
