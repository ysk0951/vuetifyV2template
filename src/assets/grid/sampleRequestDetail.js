import _ from "lodash";
import { makeCell } from "./gridUtill";
const fields = [];
const columns = [];
const filterArr = [
  "delivery_date",
  "qty",
  "request_stat",
  "producestat",
  "out_stat",
];
const errorMessage = "진행중인 사항이 없습니다";
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
    field: "delivery_date",
    alias: "납기일",
  },
  {
    field: "qty",
    alias: "제품수량(kg)",
  },
  {
    field: "request_stat",
    alias: "접수 상태",
  },
  {
    field: "producestat",
    alias: "제조 진행 사항",
  },
  {
    field: "out_stat",
    alias: "출하 사항",
  },
  {
    field: "address",
    alias: "배송지 주소",
  },
  {
    field: "etc",
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
const filteredFields = _.filter([...fields], function (v) {
  console.log(v);
  return filterArr.includes(v.fieldName);
});
const filteredColumn = _.filter([...columns], function (v) {
  return filterArr.includes(v.fieldName);
});

export { fields, columns, filteredFields, filteredColumn, errorMessage };
