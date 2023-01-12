<template>
  <div>
    <SetDialogVue ref="add">
      <!-- <AddGroup /> -->
    </SetDialogVue>
    <SetPopupVue ref="addConfirm" />
    <h3 class="mt-4 mb-2">메뉴 권한 관리</h3>
    <hr class="mb-8" />
    <v-form ref="form" lazy-validation>
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
                  :class="menuMgnClass(item)"
                  >{{ item }}</v-btn
                >
              </div>
              <div class="wrapper">
                <v-card-actions>
                  <v-btn depressed @click="delGroup">그룹삭제</v-btn>
                </v-card-actions>
                <v-card-actions>
                  <v-btn depressed color="primary" @click="addGroup"
                    >그룹추가
                  </v-btn>
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
                  :rules="[this.validSet.empty]"
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
    </v-form>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { columns, fields, rows, height } from "@/assets/grid/account";
import { deleteRole, updateRole, insertRole } from "api/member/member";
import _ from "lodash";
import SetDialogVue from "@/components/SetDialog";
import SetPopupVue from "@/components/SetPopup.vue";
import validSet from "@/assets/valid";
export default {
  computed: {
    ...mapState("select", ["workType", "menuMgn", "roleSet"]),
    ...mapState("menu", ["allMenu"]),
  },
  components: {
    SetDialogVue,
    SetPopupVue,
  },
  data() {
    return {
      validSet,
      curBtnValue: "",
      grid: "menuMgn",
      fixIndex: ["회원", "관리자", "임직원"],
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
    ...mapMutations("select", ["SET_ROLE_TYPE"]),
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
    valid() {
      return this.$refs.form.validate();
    },
    menuMgnClass(item) {
      let ret = "";
      if (item === this.curBtnValue) {
        ret += "selected ";
      }
      if (this.fixIndex.includes(item)) {
        ret += "fix";
      }
      return ret;
    },
    curBtn(v) {
      this.curBtnValue = v;
      const idx = _.findIndex(this.roleSet, function (o) {
        return o.roleName === v;
      });
      this.loadData();
      if (idx > -1) {
        const roles = this.roleSet[idx].roles;
        _.forEach(roles.split(","), (v) => {
          this.checkBox[v] = true;
        });
      }
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
    addGroup() {
      const roles = _.keys(this.checkBox)
        .filter((v) => this.checkBox[v])
        .join(",");
      const param = {
        roleName: this.curBtnValue,
        roles,
      };
      const idx = _.findIndex(this.roleSet, (o) => {
        return o.roleName === this.curBtnValue;
      });
      if (idx > -1) {
        this.setModal("동일한 이름의 그룹이 존재합니다");
      } else {
        this.setModal("그룹 추가하시겠습니까?", true, () => {
          insertRole(param)
            .then(() => {
              this.setModal("그룹 추가되었습니다", true, async () => {
                await this.SET_ROLE_TYPE();
              });
            })
            .catch((err) => {
              this.setModal(err, true, () => {
                this.loadData();
              });
            });
        });
      }
    },
    delGroup() {
      const roles = this.curBtnValue;
      if (this.fixIndex.includes(roles)) {
        this.setModal("삭제할수 없는 그룹입니다");
      } else {
        deleteRole(roles)
          .then(async () => {
            await this.SET_ROLE_TYPE();
            this.setModal("삭제되었습니다", false, () => {
              this.curBtn("회원");
            });
          })
          .catch(() => {});
      }
    },
    cancle() {
      this.setModal("취소하시겠습니까", true, () => {
        this.curBtn(this.curBtnValue);
      });
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
      if (this.valid()) {
        this.setModal("저장 하시겠습니까", true, this.saveExec);
      }
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
.fix {
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: white;
}
</style>
