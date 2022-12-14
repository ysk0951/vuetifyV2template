<template>
  <div>
    <h3 class="mt-4 mb-2">샘플 마스터 등록</h3>
    <hr class="mb-4" />
    <div class="confirmSample wrapperSpace">
      <v-col cols="12" sm="4">
        <h4>마스터 복사</h4>
        <div class="wrapper">
          <v-text-field
            v-model="param.code_grade"
            outlined
            dense
            placeholder="Code Grade를 입력해주세요"
          ></v-text-field>
          <v-btn style="height: 40px" depressed color="primary" class="ml-2"
            >불러오기</v-btn
          >
        </div>
      </v-col>
    </div>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">기본 정보</div>
    </h3>
    <hr class="mb-4" />
    <v-row>
      <v-col cols="12" sm="2">
        <h4>Code Grade</h4>
        <div class="wrapper">
          <v-text-field outlined dense disabled filled></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" sm="10">
        <h4>품명</h4>
        <div class="wrapper">
          <v-text-field
            v-model="param.name"
            outlined
            dense
            placeholder="품명을 입력해 주세요"
          ></v-text-field>
        </div>
      </v-col>
    </v-row>
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_sample"
      ref="grid"
      :settings="settings_sample"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">실제조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_real"
      ref="grid"
      :settings="settings_real"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">제조조성</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_make"
      ref="grid"
      :settings="settings_make"
      :nonePage="true"
    />
    <h3 class="mt-4 mb-2 pl-1 pr-1">
      <div class="wrapperSpace">세부 스펙</div>
    </h3>
    <hr class="mb-4" />
    <RealGrid
      domName="settings_spec"
      ref="grid"
      :settings="settings_spec"
      :nonePage="true"
    />
  </div>
</template>
<script>
import * as sample from "@/assets/grid/sampleRequest";
import * as spce from "@/assets/grid/spec";
import RealGrid from "@/components/RealGrid.vue";
export default {
  data() {
    return {
      param: {
        name: "",
        code_grdae: "",
      },
      grid: "sampleMasterAdd",
      settings_sample: { ...sample, height: 150 },
      settings_real: { ...sample, height: 150 },
      settings_make: { ...sample, height: 150 },
      settings_spec: { ...spce, height: 700 },
    };
  },
  methods: {
    newSample() {
      console.log("newSample");
      this.$emit("newSample");
    },
    search() {},
    reset() {
      this.param = {
        solvent: "",
        solventVol: "",
        salt: "",
        saltVol: "",
        add: "",
        addVol: "",
      };
    },
  },
  components: {
    RealGrid,
  },
};
</script>
<style lang="scss">
.confirmSample {
  .v-text-field__details {
    display: none;
  }
}
</style>
