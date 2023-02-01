<template>
  <div class="materialIndexAdd">
    <h3 class="mt-4 mb-2">물질명 인덱스 등록</h3>
    <SetPopup ref="confirm" />
    <v-form ref="form" lazy-validation>
      <v-row v-for="idx in row" :key="idx" class="px-2">
        <v-col cols="12" sm="4" v-for="i in col" :key="i">
          <template v-if="item(idx, i)">
            <h4>{{ item(idx, i) }}</h4>
            <v-text-field
              outlined
              dense
              :placeholder="item(idx, i) + ' 입력'"
              v-model="param[bindKey[(idx - 1) * col + i - 1]]"
            ></v-text-field>
          </template>
        </v-col>
      </v-row>
    </v-form>
    <div class="wrapper">
      <v-card-actions>
        <v-btn depressed @click="setData">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="save">저장</v-btn>
      </v-card-actions>
    </div>
  </div>
</template>
<script>
import * as materialIndex from "@/assets/grid/materialIndex";
import { mapState, mapMutations } from "vuex";
import { insertSubsMaster } from "api/subIndex/subIndex";
import _ from "lodash";
import validSet from "@/assets/valid";
import SetPopup from "@/components/SetPopup.vue";
export default {
  data() {
    return {
      grid: "materialIndexAdd",
      material: "",
      settings: materialIndex,
      layout: materialIndex.columns,
      col: 3,
      param: {},
      bindKey: [],
      validSet,
    };
  },
  computed: {
    ...mapState("common", ["code"]),
    row() {
      return Math.ceil(this.layout.length / this.col);
    },
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP"]),
    valid() {
      return this.$refs.form.validate();
    },
    openPopup(text, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        closable,
        text,
      });
      this.$refs.confirm.openPopup(cb);
    },
    save() {
      if (this.valid()) {
        this.openPopup("저장하시겠습니까?", true, () => {
          insertSubsMaster(this.param)
            .then(() => {
              this.openPopup("저장되었습니다", false, () => {
                this.setData();
              });
            })
            .catch(() => {
              this.openPopup("관리자에게 문의하세요", false);
            });
        });
      }
    },
    item(idx, i) {
      const index = (idx - 1) * this.col + i - 1;
      if (index < this.layout.length) {
        const ret = this.layout[index];
        return ret.header.text;
      } else {
        return;
      }
    },
    bindModel(idx, i) {
      const index = (idx - 1) * this.col + i - 1;
      return this.settings.fields[index].fieldName;
    },
    setData() {
      const obj = {};
      const key = [];
      _.each(this.settings.columns, (v) => {
        key.push(v.key);
        obj[v.key] = "";
      });
      this.bindKey = key;
      this.param = obj;
    },
  },
  components: {
    SetPopup,
  },
  mounted() {
    this.setData();
  },
};
</script>
<style lang="scss"></style>
