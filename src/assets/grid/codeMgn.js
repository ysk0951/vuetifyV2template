import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "공통코드명",
  },
  {
    alias: "코드",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.field = o.alias;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
