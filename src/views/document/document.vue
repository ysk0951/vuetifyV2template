<template>
  <v-container fill-height fluid class="mt-4">
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.key">
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'coa'">
            <COA />
          </template>
          <template v-if="item.key === 'cda'">
            <CDA />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import CDA from "@/views/document/documentTap/CDA";
import COA from "@/views/document/documentTap/COA";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tab: 1,
      items: [
        {
          key: "cda",
          value: "CDA 관리",
        },
        {
          key: "coa",
          value: "COA 상세",
        },
      ],
    };
  },
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  components: {
    CDA,
    COA,
  },
  async created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
  },
};
</script>
<style scoped>
.full {
  height: 100%;
  width: 100%;
  background-color: white;
}
</style>
