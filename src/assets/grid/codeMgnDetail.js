import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "항목",
    field: "index",
    width: "100",
  },
  {
    alias: "값",
    field: "val",
  },
];
_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns, o.width);
});
const noneNo = true;
export { fields, columns, noneNo };
