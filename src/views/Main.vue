<template>
  <v-container fill-height fluid class="mt-4">
    <SetDialog ref="modal" />
    <div class="pa-10 full">
      <v-row>
        <v-col cols="12" sm="3">
          <v-btn>123</v-btn>
        </v-col>
      </v-row>

      <div>그래프</div>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("menu", ["menu"]),
  },
  components: {
    SetDialog,
  },
  async created() {},
  methods: {
    newSample() {},
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
