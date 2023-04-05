<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-app-bar dense style="position: absolute">
        <img
          class="ci mr-8"
          alt=""
          @click="home"
        />
        <template v-if="accessToken">
          <div v-for="(item, idx) in menu" v-bind:key="idx" class="menu">
            <div class="text-center">
              <v-menu open-on-hover bottom offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    v-bind="attrs"
                    v-on="on"
                    style="height: 48px"
                  >
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="(it, idx) in item.subMenu" :key="idx">
                    <v-list-item-title>
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
        </template>
        <div class="langBoxWrapper"></div>
        <v-btn depressed v-if="accessToken" @click="openProfile">
          <v-icon disabled> mdi-account </v-icon>
        </v-btn>
        <v-btn depressed @click="account"></v-btn>
      </v-app-bar>
      <v-container fill-height fluid class="mu-4" @click="closeProfile">
        <v-layout align-center row wrap>
          <v-overlay :value="loading" style="z-index: 999">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular
          ></v-overlay>
          <router-view />
        </v-layout>
      </v-container>
      <Address ref="address" @select="addressSelect" />
      <v-card class="profile pa-6" elevation="15" v-if="profile && accessToken">
        <div class="mb-3">
          <v-row style="height: 50px" class="my-1 mx-1">
            <v-icon disabled style="margin-left: 13px; margin-bottom: 30px">
              mdi-account
            </v-icon>
            <div class="flexCol px-3">
              <div class="wrapperLeft mr-1">{{ userInfo.member_name }} 님</div>
              <div class="wrapperLeft smallText">{{ userInfo.company }}</div>
            </div>
            <v-select></v-select>
          </v-row>
        </div>
        <hr class="mb-5 mt-5" />
        <div class="wrapperLeft mb-5">기본 배송지 주소</div>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Address from "@/components/Address.vue";
import { addressbookUt } from "api/address/address";
import { userInfo } from "api/member/member";
export default {
  name: "App",
  computed: {
  },
  watch: {
  },
  data: () => ({
    profile: false,
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
  }),
  components: {
    Address,
  },
  async created() {
    /*
    SampleCode
    await this.SET_ROLE_TYPE();
    await this.SET_ALL_MENU();
    await this.SET_CODE("C");
    await this.SET_CODE("D");
    await this.SET_CODE("P");
    await this.SET_CODE("M");
    await this.SET_CODE("L");
    await this.SET_CODE("N");
    await this.SET_CODE("O");
    await this.SET_CODE("Q");
    await this.SET_CODE("R");
     */
  },
  methods: {
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
    ...mapMutations("menu", ["SET_ALL_MENU", "SELECT_MENU"]),
    ...mapMutations("common", ["SET_CODE"]),
    ...mapMutations("member", ["SET_TOKEN", "SET_USER_INFO"]),
    ...mapMutations("locale", ["SET_LOCALE"]),
  },
  mounted() {
  },
};
</script>
<style lang="scss">
.wrapper {
  justify-content: center;
  display: flex;
}
</style>
