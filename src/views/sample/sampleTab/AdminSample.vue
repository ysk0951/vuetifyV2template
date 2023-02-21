<template>
  <div class="address adminsample">
    <SetPopup ref="confirm" />
    <Address ref="address" @select="onAddress" />
    <div>
      <h4 class="mt-4 mb-2">파일 업로드</h4>
    </div>
    <div class="wrapperSpace">
      <div class="wrapperFlex file">
        <v-text-field
          placeholder="파일을 선택해주세요"
          type="text"
          v-model="file.name"
          outlined
          dense
          disabled
          filled
        />
        <input
          class="d-none"
          ref="uploader"
          type="file"
          @change="onFileChanged"
        />
        <v-btn
          depressed
          class="ml-3 mr-3"
          color="primary fileBtn"
          @click="upload"
          :loading="isSelecting"
          >파일선택</v-btn
        >
        <v-btn depressed class="fileBtn" @click="read">불러오기</v-btn>
        <v-btn
          depressed
          color="info mx-3"
          class="fileBtn"
          @click="downloadSample"
          >샘플 양식</v-btn
        >
      </div>
    </div>
    <h3 class="mt-4 mb-2">요청 목록</h3>
    <hr class="mb-4" />
    <RealGrid
      :domName="grid"
      ref="grid"
      :settings="settings"
      @click="checkRow"
    />
    <template v-if="checkRows">
      <v-form lazy-validation ref="newSample">
        <h3 class="mt-4 mb-2">추가 정보</h3>
        <hr class="mb-4" />
        <v-row class="px-2">
          <v-col cols="12" sm="2">
            <h4>*요청자</h4>
            <v-text-field
              outlined
              dense
              v-model="param.request_name"
              placeholder="요청자 이름을 입력해주세요"
              :rules="[
                this.validSet.empty(
                  param.request_name,
                  '요청자 이름을 입력해주세요'
                ),
                this.validSet.name,
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>*요청자 이메일</h4>
            <v-text-field
              outlined
              dense
              v-model="param.memberId"
              placeholder="요청자 이메일을 입력해주세요"
              :rules="[
                this.validSet.empty(
                  param.memberId,
                  '요청자 이메일을 입력해주세요'
                ),
                this.validSet.email,
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <div class="wrapperSpace" style="height: 24px">
              <h4>*수령자</h4>
              <v-checkbox v-model="param.same">
                <template v-slot:label>
                  <h5>요청자와 동일</h5>
                </template></v-checkbox
              >
            </div>
            <v-text-field
              outlined
              dense
              placeholder="수령자 이름을 입력해주세요"
              v-model="param.pick_name"
              :rules="[
                this.validSet.empty(
                  param.pick_name,
                  '수령자 이름을 입력해주세요'
                ),
                this.validSet.name,
              ]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>유무상</h4>
            <v-select
              :items="code.P"
              v-model="param.price_type"
              placeholder="선택해주세요"
              outlined
              id="work"
            ></v-select>
          </v-col>
        </v-row>
        <h4 class="mb-3">배송지 선택</h4>
        <v-row style="height: 63px" class="px-2">
          <v-col cols="12" sm="6">
            <div class="wrapper address">
              <v-text-field
                placeholder="주소를 입력해주세요"
                type="text"
                outlined
                dense
                disabled
                filled
                v-model="param.address"
                :rules="[
                  this.validSet.empty(param.address, '주소를 입력해주세요'),
                ]"
              />
              <v-btn
                depressed
                color="primary"
                class="ml-3 mr-3 fileBtn"
                @click="searchAddress"
                >주소검색</v-btn
              >
            </div>
          </v-col>
        </v-row>
        <v-row class="px-2">
          <v-col cols="12" sm="2">
            <h4>*Qty(kg)</h4>
            <v-text-field
              outlined
              dense
              placeholder="(kg)"
              v-model="param.qty"
              :rules="[this.validSet.empty(param.qty, 'Qty를 입력해주세요')]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>요청 자재코드</h4>
            <v-text-field
              outlined
              dense
              placeholder="요청 자재코드를 입력해주세요"
              v-model="param.request_code"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>분석 요청사항</h4>
            <v-text-field
              outlined
              dense
              placeholder="분석 요청사항을 입력해주세요"
              v-model="param.analysis"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>포장 요청사항</h4>
            <v-select
              :items="code.C"
              v-model="param.packing"
              placeholder="선택해주세요"
              outlined
              id="work"
            ></v-select>
          </v-col>
        </v-row>
        <v-row class="px-2">
          <v-col cols="12" sm="2">
            <h4>배송방법</h4>
            <v-select
              :items="code.D"
              v-model="param.delivery_type"
              placeholder="선택해주세요"
              outlined
              id="work"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="2">
            <h4>납기일</h4>
            <v-menu
              v-model="picker"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="param.derivery_date"
                  placeholder="납기일을 선택해 주세요."
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
                v-model="param.derivery_date"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="4">
            <h4>기타 요청사항</h4>
            <v-text-field
              outlined
              dense
              placeholder="기타 요청사항을 입력해주세요"
              v-model="param.etc"
            ></v-text-field>
          </v-col> </v-row
      ></v-form>
    </template>
    <div class="wrapper">
      <div class="wrapper mt-16">
        <v-card-actions>
          <v-btn depressed @click="cancle">취소</v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn depressed color="primary" @click="request">샘플 요청</v-btn>
        </v-card-actions>
      </div>
    </div>
  </div>
</template>
<script>
import { getSample } from "api/file";
import validSet from "@/assets/valid";
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import Address from "@/components/Address.vue";
import { mapMutations, mapState } from "vuex";
import * as XLSX from "xlsx";
import _ from "lodash";
import { insertSample } from "api/sample/sample";
import { filterExel } from "@/assets/grid/gridUtill";

export default {
  watch: {
    "param.same": function (v) {
      if (v) {
        this.param.pick_name = this.param.request_name;
      }
    },
  },
  data() {
    return {
      picker: false,
      grid: "adminSample",
      settings: {
        columns: _.map(
          _.filter(_.cloneDeep(columns), (v) => v.fieldName !== "lot_no"),
          function (v) {
            v.editable = true;
            return v;
          }
        ),
        fields,
        rows,
        height,
        radio: true,
      },
      validSet,
      checkRows: false,
      codeSet: {},
      file: "",
      param: {
        default: 0,
        price_type: "",
        packing: "",
        etc: "",
        same: false,
        address: "",
        qty: "",
        request_code: "",
        request_name: "",
        pick_name: "",
        memberId: "",
        analysis: "",
        delivery_type: "",
        derivery_date: "",
      },
      isSelecting: false,
      address: [
        {
          key: "default",
          text: "기본배송지",
        },
        {
          key: "other",
          text: "다른 배송지",
        },
      ],
      tmpResult: [],
    };
  },
  computed: {
    ...mapState("common", ["code"]),
    otherAddress() {
      return !this.param.default;
    },
  },
  methods: {
    ...mapMutations("popup", ["SET_POPUP", "SET_POPUP_TEXT"]),
    checkRow(v) {
      if (v.clickData) {
        this.checkRows = true;
      }
    },
    onAddress(v) {
      console.log(v);
    },
    reset() {
      this.param = {
        default: 0,
        price_type: "",
        packing: "",
        etc: "",
        same: false,
        address: "",
        qty: "",
        request_code: "",
        request_name: "",
        pick_name: "",
        memberId: "",
        analysis: "",
        delivery_type: "",
        derivery_date: "",
      };
      this.checkRows = false;
    },
    valid() {
      return this.$refs.newSample.validate();
    },
    newSample() {
      this.$emit("newSample");
    },
    upload() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const input = e.target;
      const that = this;
      let reader = new FileReader();
      reader.onload = function () {
        let fileData = reader.result;
        let wb = XLSX.read(fileData, { type: "binary" });
        wb.SheetNames.forEach((sheetName) => {
          let rowObj = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          that.tmpResult = rowObj;
        });
      };
      this.file = input.files[0];
      reader.readAsArrayBuffer(input.files[0]);
    },
    read() {
      const rows = _.cloneDeep(this.tmpResult);
      let rowsForGrid = this.makeRowForm(rows);
      this.$refs.grid.loadData(rowsForGrid);
    },
    makeRowForm(rows) {
      let rowsForGrid = [];
      _.forEach(rows, (row) => {
        row = filterExel(row);
        rowsForGrid.push(row);
      });
      return rowsForGrid;
    },
    addressBook() {
      this.$refs.address.open();
    },
    cancle() {
      this.reset();
    },
    request() {
      const row = this.$refs.grid.getCheckedRow();
      if (row.length > 0 && this.valid()) {
        _.each(row, (v) => {
          const data = {
            ...this.param,
            ...v,
            memberId: "yskimweb@gmail.com",
          };
          insertSample(data).then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openConfirm(body.errorMessage);
            } else {
              this.openConfirm(body.message, false, () => {
                const idx = this.$refs.grid.getCheckedRowIdxRadio();
                const before = this.$refs.grid.getJsonRows();
                const updateRow = _.filter(before, (v, index) => {
                  return index !== idx;
                });
                this.$refs.grid.loadData(updateRow);
                this.$refs.grid.setColor();
              });
            }
          });
        });
      }
    },
    downloadSample() {
      this.openConfirm("샘플을 다운로드 하시겠습니까", true, getSample);
    },
    openConfirm(message, closable, cb) {
      this.SET_POPUP({
        title: "알림",
        height: 150,
        width: 300,
        text: message,
        closable: closable,
      });
      this.$refs.confirm.openPopup(cb);
    },
    searchAddress() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          this.param.address = `[${data.zonecode}] ${data.roadAddress}`;
        },
      }).open();
    },
  },
  components: {
    RealGrid,
    Address,
    SetPopup,
  },
  mounted() {
    this.reset();
  },
};
</script>
<style lang="scss">
.fileBtn {
  height: 41px !important;
}
.file .v-text-field__details {
  display: none !important;
}
.aLink {
  color: blue !important;
  text-decoration: underline;
}
.file .v-input__slot {
  width: 300px;
}
.address .v-input__slot {
  width: 100%;
}
.address .row {
  height: 100px;
}
.adminsample {
  .v-input--selection-controls__input {
    margin-right: 0px;
  }
}
</style>
