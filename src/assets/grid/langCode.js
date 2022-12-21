import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "ROUTE",
  },
  {
    alias: "CODE",
  },
  {
    alias: "KO",
  },
  {
    alias: "EN",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.field = o.alias;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
