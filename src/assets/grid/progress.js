import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "lotNo",
    alias: "Lot No",
  },
  {
    field: "Code Grade",
    alias: "Code Grade",
  },
  {
    field: "납기일",
    alias: "납기일",
  },
  {
    field: "qty",
    alias: "제품수량(kg)",
  },
  {
    field: "접수상태",
    alias: "접수 상태",
  },
  {
    field: "producestat",
    alias: "제조 진행사항",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
const errorMessage = "항목이 존재하지 않습니다";
const hideCheckBar = true;
export { fields, columns, errorMessage, hideCheckBar };
