import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "Lot No",
    field: "lot_no",
  },
  {
    alias: "요청자",
    field: "request_name",
  },
  {
    alias: "요청일",
    field: "created_at",
  },
  {
    alias: "배송지",
    field: "address",
  },
  {
    alias: "비고",
    field: "etc",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  // o.field =? o.alias;
  makeCell(1, [o], fields, columns);
});
const height = 400;
export { height, fields, columns };
