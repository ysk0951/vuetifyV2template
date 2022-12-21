import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "Lot No",
  },
  {
    alias: "요청자",
  },
  {
    alias: "요청일",
  },
  {
    alias: "배송지",
  },
  {
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.field = o.alias;
  makeCell(1, [o], fields, columns);
});
const height = 400;
export { height, fields, columns };
