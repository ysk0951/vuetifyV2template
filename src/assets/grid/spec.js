import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];

const data = [
  {
    field: "번호",
  },
  {
    field: "단위",
  },
  {
    field: "요청 SPEC",
  },
  {
    field: "하한",
  },
  {
    field: "중한",
  },
  {
    field: "상한",
  },
  {
    field: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

const height = 700;
export { height, fields, columns };
