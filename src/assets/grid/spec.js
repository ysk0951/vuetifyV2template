import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];

const data = [
  {
    field: "name",
    alias: "스펙명",
    indexExclusive: true,
  },
  {
    field: "dan",
    alias: "단위",
    indexExclusive: true,
  },
  {
    field: "request_spec",
    alias: "요청 SPEC",
    indexExclusive: true,
  },
  {
    field: "b",
    alias: "하한",
    indexExclusive: true,
  },
  {
    field: "m",
    alias: "중한",
    indexExclusive: true,
  },
  {
    field: "u",
    alias: "상한",
    indexExclusive: true,
  },
  {
    field: "etc",
    alias: "비고",
    indexExclusive: true,
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
