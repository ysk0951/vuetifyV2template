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
    date: "yyyy-MM-dd",
  },
  {
    field: "postcode",
    alias: "우편번호",
    editable: true,
  },
  {
    alias: "배송지",
    field: "address",
  },
  {
    field: "address2",
    alias: "상세주소",
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
export { fields, columns };
