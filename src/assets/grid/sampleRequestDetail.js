import _ from "lodash";
import { makeCell } from "./gridUtill";
const fields = [];
const columns = [];
const filterArr = ["dueDate", "7", "70", "8", "9"];
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
    field: "dueDate",
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
const filteredFields = _.filter([...fields], function (v) {
  return filterArr.includes(v.fieldName);
});
const filteredColumn = _.filter([...columns], function (v) {
  return filterArr.includes(v.fieldName);
});

export { fields, columns, filteredFields, filteredColumn, errorMessage };
