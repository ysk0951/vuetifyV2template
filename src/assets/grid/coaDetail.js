import _ from "lodash";
import { makeCell, makeGroup } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "spec",
    alias: "ITEM",
  },
  {
    field: "low",
    alias: "LCL",
    editable: true,
  },
  {
    field: "hig",
    alias: "UCL",
    editable: true,
  },
  {
    field: "unit",
    alias: "UNIT",
  },
  {
    field: "rv",
    alias: "RESULT",
    editable: true,
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns, false, o.editable);
});
const grouping = makeGroup(data, 1, 2, "SPECIFICATION");
export { fields, columns, grouping };
