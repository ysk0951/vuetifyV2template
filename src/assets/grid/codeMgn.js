import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "공통코드명",
    field: "gubun",
  },
  {
    alias: "코드",
    field: "code",
  },
];
_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
