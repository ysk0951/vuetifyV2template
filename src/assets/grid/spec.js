import _ from "lodash";
import { makeCell, makeRowSet, makeARow } from "./gridUtill";
import { APHA, g_cm3, ppm } from "./specRow";
let fields = [];
let columns = [];

const data = [
  {
    field: "name",
    alias: "스펙명",
    indexExclusive: true,
  },
  {
    field: "unit",
    alias: "단위",
    indexExclusive: true,
  },
  {
    field: "spec",
    alias: "요청 SPEC",
    indexExclusive: true,
  },
  {
    field: "row",
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

_.each(ppm, function (name) {
  initRow.push({ ...row, name, dan: "ppm" });
});
_.each(APHA, function (name) {
  initRow.push({ ...row, name, dan: "APHA" });
});
_.each(g_cm3, function (name) {
  initRow.push({ ...row, name, dan: "g/cm3" });
});
export { fields, columns, rowSet, initRow };
