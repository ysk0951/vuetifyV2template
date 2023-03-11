import _ from "lodash";
import { makeCell, makeGroup } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "spec",
    alias: "성분",
  },
  {
    field: "vol",
    alias: "함량비",
    editable: true,
  },
  {
    field: "vol2",
    alias: "계산비",
    editable: true,
  },
  {
    field: "qty",
    alias: "투입량",
    editable: true,
  },
  {
    field: "low",
    alias: "하한",
    editable: true,
  },
  {
    field: "hig",
    alias: "상한",
    editable: true,
  },
  {
    field: "rqty",
    alias: "실투입량",
    editable: true,
  },
  {
    field: "bigo",
    alias: "비고",
    editable: true,
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns, false, o.editable);
});
const hideCheckBar = true;
const noneNo = true;
const grouping = makeGroup(data, 4, 5, "투입범위");
export { fields, columns, hideCheckBar, noneNo, grouping };
