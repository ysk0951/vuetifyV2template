<template>
  <div class="wrapper">
    <div class="add">
      <v-row>
        <v-col cols="12" sm="6">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <h4>계정 구분</h4>
          <v-select
            :items="accountType"
            :item-text="'text'"
            :item-value="'key'"
            v-model="type"
            outlined
            :id="'account'"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="6">
          <h4>이름</h4>
          <v-text-field
            outlined
            dense
            placeholder="이름을 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      accountType: [
        {
          key: "all",
          text: "전체",
        },
        {
          key: "admin",
          text: "관리자",
        },
        {
          key: "user",
          text: "회원",
        },
      ],
      type: "all",
      setting: {
        gridName: "account",
        columns: [],
        fields: [],
        existFavorite: false,
        layout: undefined,
        existCalendar: false,
        existAddr: false,
      },
    };
  },
  methods: {},
  components: {},
};
</script>
<style>
.add {
  width: 88%;
}
</style>
