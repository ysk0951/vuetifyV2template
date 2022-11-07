<template>
  <v-app id="inspire">
    <v-main class="blue-grey lighten-4">
      <!-- Login Component -->
      <v-container fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

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
.v-btn .approve {
  background-color: black !important;
  color: white !important;
}
</style>
