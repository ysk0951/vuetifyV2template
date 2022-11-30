<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.key">
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <template v-if="item.key === 'id'">
            <Accont />
          </template>
          <template v-if="item.key === 'pw'">
            <AccontPw />
          </template>
          <template v-if="item.key === 'menu'">
            <MenuMgn />
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import Accont from "@/views/admin/user/Account.vue";
import AccontPw from "@/views/admin/user/AccountPw.vue";
import MenuMgn from "@/views/admin/user/MenuMng.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tab: 0,
      items: [
        {
          key: "id",
          value: "아이디 관리",
        },
        {
          key: "pw",
          value: "비밀번호 관리",
        },
        {
          key: "menu",
          value: "메뉴권한 관리",
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
    SetDialog,
    Accont,
    AccontPw,
    MenuMgn,
  },
  async created() {
    this.SET_MENU({ memberid: this.accessToken });
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
