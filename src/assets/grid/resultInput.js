import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "code",
    alias: "Code Grade",
  },
  {
    field: "lotNo",
    alias: "Lot No",
  },
  {
    field: "request_name",
    alias: "요청자",
  },
  {
    field: "created_at",
    alias: "요청일",
  },
  {
    field: "address",
    alias: "배송지",
  },
  {
    field: "resultYn",
    alias: "결과입력",
  },
  {
    field: "etc",
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
