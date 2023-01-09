<template>
  <div>
    <SetDialogVue ref="add">
      <!-- <AddGroup /> -->
    </SetDialogVue>
    <SetPopupVue ref="addConfirm" />
    <h3 class="mt-4 mb-2">메뉴 권한 관리</h3>
    <hr class="mb-8" />
    <div>
      <div>
        <v-row class="row menuMngCol wrapper">
          <v-col cols="12" sm="2" class="menuCol">
            <div>
              <v-btn
                v-for="(item, index) in menuMgn"
                depressed
                class="type mb-3"
                :key="index"
                @click="curBtn(item)"
                :class="item === curBtnValue ? 'selected' : ''"
                >{{ item }}</v-btn
              >
            </div>
            <div class="wrapper">
              <v-card-actions>
                <v-btn depressed @click="delGroup">그룹삭제</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-btn depressed color="primary">그룹추가 </v-btn>
              </v-card-actions>
            </div>
          </v-col>
          <v-col cols="12" sm="9" class="menuCol">
            <div class="pa-5 background">
              <h4>그룹명</h4>
              <v-text-field
                :width="'300px'"
                outlined
                dense
                placeholder="이름을 입력해주세요"
                class="menuColText"
                v-model="curBtnValue"
              ></v-text-field>
              <div v-for="(item, index) in allMenu" :key="index">
                <h4>{{ item.menu }}</h4>
                <div class="selectBox">
                  <div
                    v-for="(box, idx) in item.subMenu"
                    :key="idx"
                    style="width: 150px"
                  >
                    <v-checkbox v-model="checkBox[box.code]">
                      <template v-slot:label>
                        <h5>{{ box.menu }}</h5>
                      </template></v-checkbox
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="wrapperEnd">
              <v-card-actions>
                <v-btn depressed @click="cancle">취소</v-btn>
              </v-card-actions>
              <v-card-actions class="pr-0">
                <v-btn depressed color="primary" @click="save">저장 </v-btn>
              </v-card-actions>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import _ from "lodash";
import SetDialogVue from "@/components/SetDialog";
import { columns, fields, rows, height } from "@/assets/grid/account";
// import AddGroup from "@/views/admin/user/AddGroup";
import SetPopupVue from "@/components/SetPopup.vue";
import { updateRole } from "api/member/member";
export default {
  computed: {
    ...mapState("select", ["workType", "menuMgn", "roleSet"]),
    ...mapState("menu", ["allMenu"]),
  },
  components: {
    SetDialogVue,
    // AddGroup,
    SetPopupVue,
  },
  data() {
    return {
      curBtnValue: "",
      grid: "menuMgn",
      settings: { columns, fields, rows, height },
      checkBox: {},
      originCode: {},
    };
  },
  mounted() {
    this.loadData();
    setTimeout(() => {
      this.curBtn("회원");
    }, 100);
  },
  methods: {
    ...mapMutations("modal", [
      "SET_DIALOG_TITLE",
      "SET_DIALOG_TEXT",
      "SET_HIGHT",
      "SET_MAX_WIDTH",
      "SET_MODAL",
      "RESET_MODAL",
    ]),
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
    curBtn(v) {
      this.curBtnValue = v;
      const idx = _.findIndex(this.roleSet, function (o) {
        return o.roleName === v;
      });
      const roles = this.roleSet[idx].roles;
      this.loadData();
      _.forEach(roles.split(","), (v) => {
        this.checkBox[v] = true;
      });
    },
    loadData() {
      this.checkBox = _.reduce(
        this.allMenu,
        function (a, v) {
          _.each(v.subMenu, function (o) {
            if (o.code) {
              a[o.code] = false;
            }
          });
          return a;
        },
        {}
      );
    },
    search() {
      this.SET_MODAL({
        height: 600,
        width: 750,
        closable: true,
      });
      this.$refs.add.openModal();
    },
    delGroup() {},
    cancle() {
      this.setModal("취소하시겠습니까", true);
    },
    setModal(msg, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        closable: closable,
        text: msg,
      });
      this.$refs.addConfirm.openPopup(cb);
    },
    save() {
      this.setModal("저장 하시겠습니까", true, this.saveExec);
    },
    saveExec() {
      const checked = _.pickBy(this.checkBox, function (v) {
        return v;
      });
      const key = _.keys(checked).join(",");
      updateRole({
        roleName: this.curBtnValue,
        roles: key,
      })
        .then(async () => {
          await this.SET_ROLE_TYPE();
          this.setModal("저장되었습니다", false, () => {});
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss">
.type {
  width: 100%;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.3) !important;
}
.menuCol {
  display: flex;
  flex-direction: column;
  margin: 5px;
  margin-bottom: 15px !important;
  justify-content: space-between;
  .menuColText {
    .v-input__slot {
      width: 300px !important;
    }
  }
}
.selectBox {
  // display: flex;
  display: -webkit-inline-box;
  width: 150px;
}
.selected {
  background-color: rgba(0, 0, 0, 0.2) !important;
}
</style>
