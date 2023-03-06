import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "spec",
    alias: "성분",
  },
  {
    field: "vol",
    alias: "함량비",
  },
  {
    field: "qty",
    alias: "계산비",
  },
  {
    field: "qty_",
    alias: "투입량",
  },
  {
    field: "log",
    alias: "하한",
  },
  {
    field: "hig",
    alias: "상한",
  },
  {
    field: "out_due_date",
    alias: "실투입량",
  },
  {
    field: "etc",
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns, false, true);
});
export { fields, columns };
