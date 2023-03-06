import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "lot_no",
    alias: "Lot No",
  },
  {
    field: "code",
    alias: "Code Grade",
  },
  {
    field: "qty",
    alias: "수량",
  },
  {
    field: "out_due_date",
    alias: "출하예정일",
  },
  {
    field: "request_name",
    alias: "요청자",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
