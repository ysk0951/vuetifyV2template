import _ from "lodash";
import { makeCell, makeGroup } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "ITEM",
    alias: "ITEM",
  },
  {
    field: "LCL",
    alias: "LCL",
  },
  {
    field: "UCL",
    alias: "UCL",
  },
  {
    field: "UNIT",
    alias: "UNIT",
  },
  {
    field: "RESULT",
    alias: "RESULT",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
const height = 480;
const grouping = makeGroup(data, 1, 2, "SPECIFICATION");
export { height, fields, columns, grouping };
