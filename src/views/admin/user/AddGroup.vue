<template>
  <v-flex xs12>
    <div class="wrapper">
      <div class="pa-10">
        <v-row>
          <v-col cols="12" sm="3">
            <v-subheader>이름</v-subheader>
          </v-col>
          <v-text-field
            :width="'300px'"
            outlined
            dense
            placeholder="이름을 입력해주세요"
            v-model="name"
          ></v-text-field>
        </v-row>
      </div>
    </div>
  </v-flex>
</template>
<script>
export default {
  name: "AddGroup",
  data() {
    return {
      name: "",
    };
  },
};
</script>
