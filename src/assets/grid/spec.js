import _ from "lodash";
import { makeCell, makeRowSet, makeARow } from "./gridUtill";
import { APHA, g_cm3, ppm } from "./specRow";
let fields = [];
let columns = [];

const data = [
  {
    field: "spec",
    alias: "스펙명",
    indexExclusive: true,
  },
  {
    field: "unit",
    alias: "단위",
    indexExclusive: true,
  },
  {
    field: "vol",
    alias: "요청 SPEC",
    indexExclusive: true,
  },
  {
    field: "low",
    alias: "하한",
    indexExclusive: true,
  },
  {
    field: "mid",
    alias: "중한",
    indexExclusive: true,
  },
  {
    field: "hig",
    alias: "상한",
    indexExclusive: true,
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
const rowSet = makeRowSet(fields);
const row = makeARow(fields)[0];
const initRow = [];

_.each(ppm, function (spec) {
  initRow.push({ ...row, spec, unit: "ppm" });
});
_.each(APHA, function (spec) {
  initRow.push({ ...row, spec, unit: "APHA" });
});
_.each(g_cm3, function (spec) {
  initRow.push({ ...row, spec, unit: "g/cm3" });
});
export { fields, columns, rowSet, initRow };
