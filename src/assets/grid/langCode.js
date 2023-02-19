import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "route",
  },
  {
    field: "code",
  },
  {
    field: "ko",
  },
  {
    field: "en",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.alias = o.field.toUpperCase();
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
