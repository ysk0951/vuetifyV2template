<template>
  <v-container fill-height fluid class="mt-4">
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="item.key">
          {{ item.value }}
          <v-btn
            icon
            @click="removeTab(index)"
            class="ml-2"
            v-if="item.closeable"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'coa'">
            <COA @dbClick="coaDetail" />
          </template>
          <template v-if="item.key === 'coaDetail'">
            <COADetail :data="coaDetailData" />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import _ from "lodash";
import COA from "@/views/document/documentTap/COA";
import COADetail from "@/views/document/documentTap/COADetail";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      coaDetailData: {},
      tab: 0,
      items: [
        {
          key: "coa",
          value: "COA 관리",
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
    COA,
    COADetail,
  },
  created() {
    this.SET_MENU();
  },
  methods: {
    ...mapMutations("menu", ["SET_MENU"]),
    reset() {
      this.coaDetailData = {};
    },
    removeTab(index) {
      this.items.splice(index, 1);
      this.tab = 0;
    },
    findTab(key, value, target, closeable, data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.key === key;
      });
      if (idx === -1) {
        this.items.push({
          key,
          value,
          closeable,
        });
        idx = _.findIndex(this.items, function (v) {
          return v.key === key;
        });
      }
      this.tab = idx;
      this[target] = data;
    },
    coaDetail(data) {
      this.findTab("coaDetail", "COA 상세", "coaDetailData", true, data);
    },
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
