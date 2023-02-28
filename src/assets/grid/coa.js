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
    field: "code",
    alias: "Code Grade",
  },
  {
    field: "request_name",
    alias: "이름",
  },
  {
    field: "company",
    alias: "기업명",
  },
  {
    field: "created_at",
    alias: "요청일",
  },
  {
    field: "produce_due_date",
    alias: "제조예정일",
  },
  {
    field: "produce_date",
    alias: "제조진행사항",
  },
  {
    field: "out_date",
    alias: "출하진행사항",
  },
  {
    field: "out_due_date",
    alias: "출하예정일",
  },
  {
    field: "derivery_date",
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
