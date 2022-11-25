<template>
  <RealGrid grid-id="realgrid1" grid-root="/lib" @rendered="gridRendered">
  </RealGrid>
</template>
<script>
import RealGrid from "realgrid";
export default {
  props: {
    setting: {
      type: Object,
    },
  },
  data() {
    return {
      data: [
        {
          KorName: "박영호",
          Gender: "남",
          Age: "71",
          Phone: "(025)6563-2802",
          ProductID: "198160731-00008",
          KorCountry: "모잠비크",
          Email: "ac@ornareFuscemollis.org",
          OrderDate: "2021-01-16",
          CardNumber: "5587-2139-9692-3644",
          Monetaru: "EUR",
          StartDate: "2018-02-25",
          EndDate: "2021-08-12",
          ToMonth: "23",
          Month: "41",
          Year: "3",
          InterestRate: "0.15",
          SaveCost: "51000",
          SaveMaturity: "14950650",
          CurrentSave: "9304950",
          Rating: "5",
          BusinessProficiency: "90",
          Address: "서울특별시 강서구 공항동 45-89",
          Button: "삭제",
        },
      ],
    };
  },
  computed: {},
  components: {
    RealGrid,
  },
  mounted() {
    // this.initGrid();
  },
  methods: {
    // gridRendered(provider, view) {
    //   // RealGridJS.setRootContext("/");
    //   this.dataProvider = provider;
    //   this.gridView = view;
    //   // 이벤트 처리
    //   this.dataProvider.onRowInserted = this.onRowInserted;
    //   this.gridView.onDataCellClicked = this.onDataCellClicked;
    // },
    // initGrid() {
    //   const setGridData = {
    //     gridName: this.setting.gridName,
    //     columns: this.setting.columns,
    //     fields: this.setting.fields,
    //     vm: this.setting.vm,
    //     existFavorite: this.setting.existFavorite,
    //     layout: this.setting.layout,
    //     existCalendar: this.setting.existCalendar,
    //     existAddr: this.setting.existAddr,
    //   };
    //   console.log(setGridData);
    //   const container = document.getElementById(setGridData.gridName);
    //   const provider = new RealGrid.LocalDataProvider(false);
    //   provider.setFields([
    //     {
    //       fieldName: "KorName",
    //       dataType: "text",
    //     },
    //     {
    //       fieldName: "Age",
    //       dataType: "number",
    //     },
    //   ]);
    //   const gridView = new RealGrid.GridView(container);
    //   gridView.setColumns([
    //     {
    //       name: "KorNameColumn",
    //       fieldName: "KorName",
    //       type: "data",
    //       width: "70",
    //       header: {
    //         text: "이름",
    //       },
    //     },
    //   ]);
    //   gridView.setDataSource(provider);
    // },
  },
};
</script>
<style></style>
