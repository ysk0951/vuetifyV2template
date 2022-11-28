<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-app-bar dense style="position: absolute">
        <template v-if="accessToken">
          <div class="text-center" v-for="(item, idx) in menu" v-bind:key="idx">
            <v-menu offset-y open-on-hover>
              <template v-slot:activator="{ on, attrs }">
                <v-btn depressed v-bind="attrs" v-on="on">
                  {{ item.menu }}
                </v-btn>
              </template>
              <v-list>
                <v-list-item v-for="(item, index) in item.subMenu" :key="index">
                  <v-list-item-title @click="routing(item.menu)">{{
                    item.menu
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </template>
        <div class="langBoxWrapper">
          <div class="langBox">
            <v-select
              :items="language"
              :item-text="'text'"
              :item-value="'value'"
              v-model="locale"
            ></v-select>
          </div>
        </div>
      </v-app-bar>
      <v-container fill-height fluid class="mu-4">
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
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState("loading", ["loading"]),
    ...mapState("member", ["accessToken"]),
    ...mapState("menu", ["menu"]),
  },
  data: () => ({
    locale: "ko",
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
  }),
  watch: {
    locale: function (v) {
      this.SET_LOCALE(v);
    },
  },
  components: {},
  async created() {
    this.SET_LOCALE(this.locale);
  },
  methods: {
    ...mapMutations("locale", ["SET_LOCALE"]),
    routing(v) {
      console.log(v);
    },
  },
};
</script>
<style>
.wrapper {
  justify-content: center;
  display: flex;
}

.wrapperSpace {
  justify-content: space-between;
  display: flex;
}
.wrapperFlex {
  display: flex;
}

.langBox {
  width: 80px;
  justify-content: end;
  font-size: 10px;
}

.langBoxWrapper {
  display: flex;
  justify-content: end;
  width: 100%;
}
.v-btn.v-size--default {
  font-size: 0.95rem !important;
}
.container {
  padding: 0 0 0 0px !important;
}
.v-toolbar__content {
  height: 48px !important;
}
.menu {
  height: 48px !important;
}
div.v-menu__content.theme--light.menuable__content__active > div {
  padding: 0px;
}
</style>
