<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <v-container fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-overlay :value="loading">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular
            ></v-overlay>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState("loading", ["loading"]),
  },
  data: () => ({
    //
  }),
  components: {},
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
</style>
