import _ from "lodash";
import { makeCell, makeGroup } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "no",
    alias: "ITEM",
  },
  {
    field: "1",
    alias: "LCL",
  },
  {
    field: "2",
    alias: "UCL",
  },
  {
    field: "3",
    alias: "UNIT",
  },
  {
    field: "4",
    alias: "RESULT",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

makeGroup(columns, [1, 2], "SPECIFICATION");
console.log(columns);
const height = 480;
export { height, fields, columns };
