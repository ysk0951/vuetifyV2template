<template>
  <v-container fill-height fluid class="mt-4">
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="item.key">
          <template v-if="locale === 'ko'">
            {{ item.menu }}
          </template>
          <template v-else-if="locale === 'en'">
            {{ item.menu_eng }}
          </template>
          <v-btn
            icon
            @click="removeTab(index)"
            class="ml-2"
            v-if="item.closeable"
            ><v-icon x-small>mdi-close</v-icon></v-btn
          >
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="tab"
        :style="'min-width:' + 100 + 'px;padding-top:16px'"
      >
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.code === 'COMGMT'">
            <COA @dbClick="coaDetail" ref="COMGMT" />
          </template>
          <template v-if="item.code === 'coaDetail'">
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
    ...mapState("locale", ["locale"]),
  },
  components: {
    COA,
    COADetail,
  },
  created() {
    this.SET_MENU();
    this.setTab();
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
    setTab() {
      const menu = this.$route.query.menu;
      this.items = this.getTab(menu);
      const ref = _.reduce(
        this.items,
        (a, c) => {
          if ((c.menu_eng = menu)) {
            a = c.code;
          }
          return a;
        },
        ""
      );
      setTimeout(() => {
        const tmp = this.$refs[ref];
        if (tmp) {
          const component = this.$refs[ref][0];
          if (_.has(component, "loadData")) {
            component.loadData();
          }
        } else {
          this.$router.push({ name: "main" });
        }
      }, 100);
    },
    findTab(code, menu, menu_eng, target, closeable, data) {
      let idx = _.findIndex(this.items, function (v) {
        return v.code === code;
      });
      if (idx === -1) {
        this.items.push({
          code,
          menu,
          menu_eng,
          closeable,
          url: "/",
        });
        idx = _.findIndex(this.items, function (v) {
          return v.code === code;
        });
      }
      this.tab = idx;
      this[target] = data;
    },
    coaDetail(data) {
      this.findTab(
        "coaDetail",
        "COA 상세",
        "COA Detail",
        "coaDetailData",
        true,
        data
      );
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
