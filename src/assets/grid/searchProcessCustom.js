import _ from "lodash";
import { makeCell, makeRowSet } from "./gridUtill";
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
    field: "delivery_date",
    alias: "납기일",
  },
  {
    field: "qty",
    alias: "제품수량(kg)",
  },
  {
    field: "stat",
    alias: "접수 상태",
  },
  {
    field: "producestat",
    alias: "제조 진행 사항",
  },
  {
    field: "releasestat",
    alias: "출하 사항",
  },
  {
    field: "stat_standard",
    alias: "보증서",
  },
];
_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
const rowSet = makeRowSet(fields);
const errorMessage = "요청하신 샘플 내역이 없습니다";
export { fields, columns, rowSet, errorMessage };
