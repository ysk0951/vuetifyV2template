import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "no",
    alias: "번호",
  },
  {
    field: "1",
    alias: "Lot No",
  },
  {
    field: "2",
    alias: "Code Grade",
  },
  {
    field: "3",
    alias: "이름",
  },
  {
    field: "4",
    alias: "기업명",
  },
  {
    field: "5",
    alias: "요청일",
  },
  {
    field: "6",
    alias: "제조예정일",
  },
  {
    field: "7",
    alias: "제조 진행사항",
  },
  {
    field: "8",
    alias: "출하 진행사항",
  },
  {
    field: "9",
    alias: "출하 예정일",
  },
  {
    field: "10",
    alias: "납기일",
  },
  {
    field: "11",
    alias: "상태",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

const height = 480;
export { height, fields, columns };
