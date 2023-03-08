<template>
  <div class="address newSample">
    <SetPopup ref="confirm" />
    <Address ref="address" @select="onAddress" p:userId="userId" />
    <h3 class="mb-2">신규 샘플 요청</h3>
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
          <v-col cols="12" sm="2" class="mr-3">
            <h4>요청자</h4>
            <v-text-field
              outlined
              dense
              v-model="param.request_name"
              filled
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" class="mx-3">
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
          <v-col cols="12" sm="2" class="mx-3">
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
        <h4>*배송지 선택</h4>
        <v-row style="height: 46px" class="px-2 mt-1">
          <v-col cols="12" sm="3" class="my-0">
            <v-radio-group row v-model="param.default">
              <v-radio
                v-for="(n, i) in address"
                :key="n.key"
                :label="n.text"
                :value="i"
              ></v-radio
            ></v-radio-group>
          </v-col>
        </v-row>
        <template v-if="param.default === 0">
          <v-row style="height: 63px" class="px-2">
            <v-col cols="12" sm="6">
              <div class="wrapper address">
                <v-text-field
                  type="text"
                  outlined
                  dense
                  disabled
                  filled
                  :value="param.address"
                />
              </div>
            </v-col>
          </v-row>
          <v-row style="height: 63px" class="px-2">
            <v-col cols="12" sm="6">
              <div class="wrapper address">
                <v-text-field
                  type="text"
                  disabled
                  filled
                  outlined
                  dense
                  :value="param.address2"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <template v-if="param.default === 1">
          <v-row style="height: 63px" class="px-2">
            <v-col cols="12" sm="4">
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
                <v-btn
                  depressed
                  color="primary"
                  class="fileBtn"
                  @click="addressBook"
                  >주소록</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row style="height: 63px" class="px-2">
            <v-col cols="12" sm="6">
              <div class="wrapper address">
                <v-text-field
                  placeholder="상세주소를 입력해 주세요"
                  type="text"
                  outlined
                  dense
                  v-model="param.address2"
                  :rules="[
                    this.validSet.empty(param.address2, '주소를 입력해주세요'),
                  ]"
                />
              </div>
            </v-col>
          </v-row>
        </template>
        <v-row class="px-2">
          <v-col cols="12" sm="2">
            <h4>*Qty(kg)</h4>
            <v-text-field
              outlined
              dense
              placeholder="(kg)"
              v-model="param.qty"
              :rules="[
                this.validSet.empty(param.qty, 'Qty를 입력해주세요'),
                this.validSet.numberDot,
              ]"
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
        <v-row class="px-2 mb-16">
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
                  v-model="param.delivery_date"
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
                v-model="param.delivery_date"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6">
            <h4>기타 요청사항</h4>
            <v-text-field
              outlined
              dense
              placeholder="기타 요청사항을 입력해주세요"
              v-model="param.etc"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
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
import { insertSample } from "api/sample/sample";
import { userInfo } from "api/member/member";
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";
import SetPopup from "@/components/SetPopup.vue";
import Address from "@/components/Address.vue";
import validSet from "@/assets/valid";
import * as XLSX from "xlsx";
import _ from "lodash";
import { mapMutations, mapState } from "vuex";
import { filterExel, checkRowEmptcheck } from "@/assets/grid/gridUtill";
export default {
  watch: {
    "param.same": function (v) {
      if (v) {
        this.param.pick_name = this.param.request_name;
      }
    },
    "param.default": function (v) {
      if (v === 0) {
        this.param.address = this.defaultAddress.address;
        this.param.address2 = this.defaultAddress.address2;
        this.param.postcode = this.defaultAddress.postcode;
      } else {
        this.param.address = "";
        this.param.address2 = "";
        this.param.postcode = "";
      }
    },
  },
  data() {
    return {
      grid: "newSample",
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
      userId: "",
      param: {
        default: 0,
        price_type: "",
        packing: "",
        etc: "",
        same: false,
        address: "",
        address2: "",
        qty: "",
        request_code: "",
        request_name: "",
        pick_name: "",
        analysis: "",
        delivery_date: "",
        postcode: "",
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
      picker: false,
    };
  },
  computed: {
    ...mapState("common", ["code"]),
    ...mapState("member", ["defaultAddress"]),
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
    async reset() {
      this.param = {
        default: 0,
        price_type: "",
        packing: "",
        etc: "",
        same: false,
        address: this.defaultAddress.address,
        address2: this.defaultAddress.address2,
        qty: "",
        request_code: "",
        request_name: "",
        pick_name: "",
        analysis: "",
        delivery_date: "",
        postcode: this.defaultAddress.postcode,
      };
      this.file = "";
      this.checkRows = false;
      try {
        const res = await userInfo();
        const member_data = res.data.data;
        this.param.request_name = member_data.member_name;
        this.userId = member_data.memberId;
      } catch (error) {
        console.log(error);
      }
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
      this.openConfirm("취소하시겠습니까", true, () => {
        this.reset();
      });
    },
    request() {
      const row = this.$refs.grid.getCheckedRow();
      if (!checkRowEmptcheck(row[0])) {
        this.openConfirm("필수 항목이 없습니다. 입력항목을 확인해주세요");
      } else if (row.length > 0 && this.valid()) {
        _.each(row, (v) => {
          console.log(v, this.param);
          const data = {
            ...this.param,
            ...v,
          };
          insertSample(data).then((res) => {
            const body = res.data;
            if (!_.isEmpty(body.errorCode)) {
              this.openConfirm(body.errorMessage);
              this.reset();
            } else {
              this.openConfirm(body.message, false, () => {
                const idx = this.$refs.grid.getCheckedRowIdxRadio();
                const before = this.$refs.grid.getJsonRows();
                const updateRow = _.filter(before, (v, index) => {
                  return index !== idx;
                });
                this.$refs.grid.loadData(updateRow);
                this.reset();
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
          this.param.address = data.address;
          this.param.address2 = data.address2;
          this.param.postcode = data.zonecode;
        },
      }).open();
    },
    onAddress(data) {
      this.param.postcode = data.zonecode;
      this.param.address = data.address;
      this.param.address2 = data.address2;
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
.address {
  .v-input__slot {
    width: 100%;
  }
  .row {
    height: 100px;
  }
}
.v-input--checkbox {
  .v-input__slot {
    top: -21px;
  }
}
.newSample {
  .v-input--selection-controls__input {
    margin-right: 0px;
  }
  .v-input--radio-group {
    margin-top: 0px;
  }
}
</style>
