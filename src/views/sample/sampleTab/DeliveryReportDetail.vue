<template>
  <div class="deliveryReportDetail">
    <CodeSearch ref="code" />
    <SetPopup ref="confirm" />
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
    <h3 class="mt-4 mb-2">추가 정보</h3>
    <hr class="mb-4" />
    <v-form ref="form" lazy-validation>
      <h4>Code Grade</h4>
      <div class="wrapperSpace">
        <div class="wrapperFlex">
          <div></div>
          <v-text-field
            type="text"
            v-model="codeGrade"
            outlined
            dense
            disabled
            filled
            :rules="[
              (v) => {
                return !!v || 'Code Grade를 선택해주세요';
              },
            ]"
          />
          <v-btn depressed class="ml-3 mr-3 fileBtn" @click="read">검색</v-btn>
          <v-btn depressed color="primary fileBtn" @click="select"
            >신규생성</v-btn
          >
        </div>
      </div>
      <v-row style="height: 90px" class="px-2">
        <v-col cols="12" sm="3">
          <h4>영업분류</h4>
          <v-text-field
            outlined
            dense
            placeholder="영업분류를 입력해 주세요"
            v-model="param.salestype"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청일</h4>
          <v-text-field
            outlined
            dense
            placeholder="YYYY-MM-DD"
            v-model="param.request_date"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
            v-model="param.request_user"
            disabled
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>요청 업체명</h4>
          <v-text-field
            outlined
            disabled
            filled
            dense
            placeholder="요청업체명을 입력해주세요"
            v-model="param.request_company"
            class="pr-2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row style="height: 90px" class="px-2">
        <v-col cols="12" sm="3">
          <h4>제조 예정일</h4>
          <v-menu
            v-model="picker_1"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="param.produce_due_date"
                placeholder="제조 예정일을 선택해주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              v-model="param.produce_due_date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>제조 진행사항</h4>
          <v-menu
            v-model="picker_2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="param.produce_date"
                placeholder="제조 진행사항을 선택해 주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              v-model="param.produce_date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>출하 진행 사항</h4>
          <v-menu
            v-model="picker_3"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="param.out_date"
                placeholder="출하진행사항을 선택해 주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              v-model="param.out_date"
              @input="menu = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3" style="padding-right: 12px">
          <h4>출하 예정일</h4>
          <v-menu
            v-model="picker_4"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                placeholder="출하 예정일을 선택해 주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker no-title @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row style="height: 90px" class="px-2">
        <v-col cols="12" sm="3">
          <h4>납기 예정일</h4>
          <v-menu
            v-model="picker_5"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="param.derivery_due_date"
                placeholder="납기일을 선택해 주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              no-title
              @input="menu = false"
              v-model="param.derivery_due_date"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>납기일</h4>
          <v-menu
            v-model="picker_6"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                placeholder="납기일을 선택해 주세요"
                append-icon="mdi-calendar"
                outlined
                dense
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker no-title @input="menu = false"></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>수령처</h4>
          <v-text-field
            outlined
            dense
            placeholder="수령처를 입력해주세요"
            v-model="param.pickpart"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">
          <h4>유/무상</h4>
          <v-select
            :items="code.P"
            v-model="param.price_type"
            placeholder="선택해주세요"
            outlined
            id="work"
            style="width: 100%"
            class="pr-2"
          ></v-select>
        </v-col>
      </v-row>
      <v-row style="height: 90px" class="pl-2">
        <v-col cols="12" sm="3">
          <h4>Qty(kg)</h4>
          <v-text-field
            outlined
            dense
            placeholder="(kg)"
            v-model="param.qty"
          ></v-text-field>
        </v-col>
      </v-row>
      <div class="wrapper">
        <v-card-actions>
          <v-btn depressed @click="cancle">취소</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="save">완료 </v-btn>
        </v-card-actions>
      </div>
    </v-form>
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import { mapState, mapMutations } from "vuex";
import RealGrid from "@/components/RealGrid.vue";
import CodeSearch from "@/components/CodeSearch.vue";
import SetPopup from "@/components/SetPopup.vue";
import validSet from "@/assets/valid";
import { produceupdate } from "api/sample/sample";
export default {
  props: ["data"],
  data() {
    return {
      codeGrade: "",
      picker_1: false,
      picker_2: false,
      picker_3: false,
      picker_4: false,
      picker_5: false,
      picker_6: false,
      validSet,
      grid: "delivaryReportDetail",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      param: {
        salestype: "",
        request_date: "",
        request_user: "",
        request_company: "",
        produce_due_date: "",
        produce_date: "",
        out_date: "",
        derivery_due_date: "",
        pickpart: "",
        price_type: "",
        qty: "",
      },
    };
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    valid() {
      return this.$refs.form.validate();
    },
    setModal(msg, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        closable: closable,
        text: msg,
      });
      this.$refs.confirm.openPopup(cb);
    },
    search() {},
    reset() {
      this.param = {
        salestype: "",
        request_date: "",
        request_user: "",
        request_company: "",
        produce_due_date: "",
        produce_date: "",
        out_date: "",
        derivery_due_date: "",
        pickpart: "",
        price_type: "",
        qty: "",
      };
    },
    read() {
      this.$refs.code.open();
    },
    select() {},
    cancle() {
      this.setModal("취소하시겠습니까", true, () => {
        this.reset();
      });
    },
    save() {
      if (this.valid()) {
        this.setModal("저장 하시겠습니까", true, () => {
          this.saveExec();
        });
      }
    },
    saveExec() {
      produceupdate({
        ...this.param,
        code: this.codeGrade,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.setModal(err);
        });
    },
  },
  computed: {
    ...mapState("common", ["code"]),
  },
  mounted() {
    this.$refs.grid.loadData([this.data]);
  },
  components: {
    RealGrid,
    CodeSearch,
    SetPopup,
  },
};
</script>
<style lang="scss">
.deliveryReportDetail {
  .v-input__slot {
    width: 100%;
  }
}
</style>
