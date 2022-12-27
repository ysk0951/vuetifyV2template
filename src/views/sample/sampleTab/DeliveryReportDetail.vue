<template>
  <div>
    <h3 class="mt-4 mb-2">납품 일보</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-row>
        <v-col cols="12" sm="2">
          <h4>Lot Co</h4>
          <v-text-field
            outlined
            dense
            placeholder="Lot Co를 입력해주세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="2">
          <h4>요청자</h4>
          <v-text-field
            outlined
            dense
            placeholder="요청자를 입력해주세요"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="wrapperEnd">
      <v-card-actions>
        <v-btn depressed @click="reset">초기화</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn depressed color="primary" @click="search">검색</v-btn>
      </v-card-actions>
    </div>
    <div class="wrapperSpace">
      <div>
        <h4 class="mt-4 mb-2">목록</h4>
      </div>
    </div>
    <RealGrid :domName="grid" ref="grid" :settings="settings" />
    <h3 class="mt-4 mb-2">추가 정보</h3>
    <hr class="mb-4" />
    <h4>Code Grade</h4>
    <div class="wrapperSpace">
      <div class="wrapperFlex">
        <div></div>
        <v-text-field
          type="text"
          v-model="fileName"
          outlined
          dense
          disabled
          filled
        />
        <v-btn depressed class="ml-3 mr-3 fileBtn" @click="read">검색</v-btn>
        <v-btn depressed color="primary fileBtn" @click="select"
          >신규생성</v-btn
        >
      </div>
    </div>
    <v-row style="height: 90px">
      <v-col cols="12" sm="3">
        <h4>영업분류</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>요청일</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>요청자</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px">
      <v-col cols="12" sm="3">
        <h4>요청 업체명</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조 예정일</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>제조 진행사항</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px">
      <v-col cols="12" sm="3">
        <h4>출하 진행 사항</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>출하 예정일</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>납기 예정일</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px">
      <v-col cols="12" sm="3">
        <h4>납기일</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>수령처</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
      <v-col cols="12" sm="3">
        <h4>유/무상</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
      </v-col>
    </v-row>
    <v-row style="height: 90px">
      <v-col cols="12" sm="3">
        <h4>Qty(kg)</h4>
        <v-text-field outlined dense placeholder="00:00"></v-text-field>
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
  </div>
</template>
<script>
import { columns, fields, rows, height } from "@/assets/grid/sampleRequest";
import RealGrid from "@/components/RealGrid.vue";

export default {
  data() {
    return {
      grid: "delivaryReportDetail",
      settings: {
        columns,
        fields,
        rows,
        height,
      },
      param: {
        default: 0,
      },
      price: ["전체", "유상", "무상"],
      package: ["선택", "AI", "P", "S", "18L", "50L", "200L", "말통"],
      fileName: "",
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    search() {},
    reset() {},
    read() {},
    select() {},
    cancle() {},
    save() {},
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss"></style>
