import { makeCell, makeRowSet } from "./gridUtill";
let fields = [];
let columns = [];
makeCell(
  10,
  [
    {
      field: "add",
    },
    {
      alias: "wt%",
      field: "addVol",
      excelKey: "wt%_",
    },
  ],
  fields,
  columns
);
makeCell(
  1,
  [
    {
      field: "sum",
      indexExclusive: true,
    },
  ],
  fields,
  columns
);
const rowSet = makeRowSet(fields);
const errorMessage = "요청하신 샘플 내역이 없습니다";
export { fields, columns, rowSet, errorMessage };
