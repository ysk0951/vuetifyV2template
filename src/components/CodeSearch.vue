<template>
  <div class="CodeSearch">
    <SetDialogVue ref="dialog">
      <div class="pa-5 addressSelect">
        <h4>Code Grade</h4>
        <hr class="mt-3 mb-3" />
        <RealGrid
          domName="grid"
          ref="codeSearch"
          :settings="settings"
          @dbClick="dbClick"
          :nonePage="true"
        />
        <div class="wrapper mt-4">
          <v-btn depressed color="primary" @click="approve">취소</v-btn>
        </div>
      </div>
    </SetDialogVue>
  </div>
</template>

<script>
import SetDialogVue from "./SetDialog.vue";
import { mapMutations } from "vuex";
import * as settings from "@/assets/grid/codeSearch";
import RealGrid from "@/components/RealGrid.vue";
export default {
  props: ["data"],
  name: "CodeSearch",
  data: function () {
    return {
      param: {},
      settings: {
        ...settings,
        hideCheckBar: true,
        fixRow: 1,
      },
    };
  },
  watch: {
    data(v) {
      setTimeout(() => {
        this.$refs.codeSearch.loadData(v);
      }, 100);
    },
  },
  methods: {
    ...mapMutations("modal", ["SET_MODAL"]),
    ...mapMutations("popup", ["SET_POPUP"]),
    open() {
      this.SET_MODAL({
        height: 100,
        width: 800,
        closable: true,
        customApprove: true,
      });
      this.$refs.dialog.openModal();
    },
    close() {
      this.$refs.dialog.closeModal();
    },
    approve() {
      this.close();
      this.$emit("onApprove", this.param);
    },
    dbClick(v) {
      this.$emit("selectCode", v.code);
      this.close();
    },
  },
  mounted() {},
  components: {
    SetDialogVue,
    RealGrid,
  },
};
</script>
<style lang="scss">
.border {
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.5) !important;
}
.addressSelect {
  .v-subheader {
    display: inline;
  }
  .scroll {
    max-height: 420px;
    overflow: auto;
  }
}
</style>
