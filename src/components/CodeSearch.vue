<template>
  <div class="CodeSearch">
    <SetDialogVue ref="dialog">
      <div class="pa-5 addressSelect">
        <h4>Code Grade</h4>
        <hr class="mt-3 mb-3" />
        <RealGrid domName="grid" ref="codeSearch" :settings="settings" />
        <div class="wrapper">
          <v-btn depressed color="primary" @click="approve">취소</v-btn>
        </div>
      </div>
    </SetDialogVue>
  </div>
</template>

<script>
import SetDialogVue from "./SetDialog.vue";
import { mapMutations } from "vuex";
import { insertBook } from "api/address/address";
import * as settings from "@/assets/grid/sampleRequest";
import { addressbookList, addressbookDel } from "api/address/address";
import RealGrid from "@/components/RealGrid.vue";
export default {
  name: "CodeSearch",
  data: function () {
    return {
      param: {},
      settings,
    };
  },
  watch: {},
  methods: {
    ...mapMutations("modal", ["SET_MODAL"]),
    ...mapMutations("popup", ["SET_POPUP"]),
    deleteAdd(v) {
      addressbookDel({ idx: v.idx }).then(() => {
        this.loadData();
      });
    },
    selectAdd(v) {
      this.$emit("select", v);
      this.close();
    },
    closePost() {
      this.$refs.postModal.closeModal();
      this.SET_MODAL({
        width: 800,
        closable: true,
        customApprove: true,
      });
    },
    async approvePost(post) {
      this.param.post = post;
      // eslint-disable-next-line no-unused-vars
      const resAddress = await insertBook({
        ...post,
        memberId: this.param.email,
      });
      this.loadData();
    },
    open() {
      this.SET_MODAL({
        height: 100,
        width: 800,
        closable: true,
        customApprove: true,
      });
      this.loadData(() => {
        this.$refs.dialog.openModal();
      });
    },
    loadData(cb) {
      addressbookList()
        .then((res) => {
          const response = res.data;
          this.addresList = response.data;
          cb();
        })
        .catch(() => {});
    },
    close() {
      this.$refs.dialog.closeModal();
    },
    addAddress() {
      this.SET_MODAL({
        width: 650,
        closable: true,
        customApprove: true,
      });
      this.$refs.postModal.openModal();
    },
    approve() {
      this.close();
      this.$emit("onApprove", this.param);
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
