import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "spec",
    alias: "스펙명",
  },
  {
    field: "unit",
    alias: "단위",
  },
  {
    field: "vol",
    alias: "요청 SPEC",
  },
  {
    field: "low",
    alias: "하한",
  },
  {
    field: "hig",
    alias: "상한",
  },
  {
    field: "sub",
    alias: "공차",
  },
  {
    field: "rv",
    alias: "결과입력",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.editable = true;
  makeCell(1, [o], fields, columns, false, o.editable);
});
export { fields, columns };
