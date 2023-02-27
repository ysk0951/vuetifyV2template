import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "name",
    alias: "스펙명",
  },
  {
    field: "dan",
    alias: "단위",
  },
  {
    field: "spec",
    alias: "요청 SPEC",
  },
  {
    field: "row",
    alias: "하한",
  },
  {
    field: "hig",
    alias: "상한",
  },
  {
    field: "1",
    alias: "공차",
  },
  {
    field: "2",
    alias: "결과입력",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
