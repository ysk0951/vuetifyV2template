import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "Lot No",
    alias: "Lot No",
  },
  {
    field: "Code Grade",
    alias: "Code Grade",
  },
  {
    field: "request_name",
    alias: "이름",
  },
  {
    field: "기업명",
    alias: "기업명",
  },
  {
    field: "created_at",
    alias: "요청일",
  },
  //TODO :: 맞추기
  {
    field: "제조예정일",
    alias: "제조예정일",
  },
  {
    field: "제조 진행사항",
    alias: "제조진행사항",
  },
  {
    field: "출하 진행사항",
    alias: "출하진행사항",
  },
  {
    field: "출하 예정일",
    alias: "출하예정일",
  },
  {
    field: "납기일",
    alias: "납기일",
  },
  {
    field: "stat",
    alias: "상태",
  },
  {
    field: "pdf",
    alias: "PDF",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
