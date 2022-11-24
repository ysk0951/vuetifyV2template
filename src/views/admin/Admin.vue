<template>
  <v-container fill-height fluid>
    <SetDialog ref="modal" />
    <div
      class="pa-10"
      style="background-color: wheat; height: 100%; width: 100%"
    >
      <v-tabs v-model="tab">
        <v-tab v-for="item in items" :key="item.key">
          {{ item.value }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" :style="'min-width:' + 100 + 'px'">
        <v-tab-item v-for="item in items" :key="item.key">
          <v-card flat> </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-container>
</template>
<script>
import SetDialog from "@/components/SetDialog";
export default {
  data() {
    return {
      tab: 0,
      items: [
        {
          key: "id",
          value: "아이디 관리",
        },
      ],
    };
  },
  components: {
    SetDialog,
  },
};
</script>
<style scoped></style>
