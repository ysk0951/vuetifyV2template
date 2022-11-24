<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-app-bar dense style="position: absolute">
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
  },
  data: () => ({
    locale: "ko",
    language: [
      { value: "ko", text: "한국어" },
      { value: "en", text: "English" },
    ],
    //
  }),
  watch: {
    locale: function (v) {
      console.log(v);
      this.SET_LOCALE(v);
    },
  },
  components: {},
  created() {
    this.SET_LOCALE(this.locale);
  },
  methods: {
    ...mapMutations("locale", ["SET_LOCALE"]),
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
</style>
