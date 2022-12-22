import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "lot_no",
    alias: "Lot No",
  },
  {
    field: "code_grade",
    alias: "Code Grade",
  },
  {
    field: "created_at",
    alias: "요청일",
    date: "yyyy-MM-dd",
  },
  {
    field: "6",
    alias: "납기일",
    date: "yyyyMMdd",
  },
  {
    field: "7",
    alias: "제품수량(kg)",
  },
  {
    field: "70",
    alias: "접수 상태",
  },
  {
    field: "8",
    alias: "제조 진행사항",
  },
  {
    field: "9",
    alias: "출하 사항",
  },
  {
    field: "address",
    alias: "배송지주소",
  },
  {
    field: "11",
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
