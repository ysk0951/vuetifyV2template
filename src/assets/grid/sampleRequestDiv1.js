import { makeCell, makeRowSet } from "./gridUtill";
let fields = [];
let columns = [];
makeCell(
  8,
  [
    {
      field: "solvent",
      alias: "solvent",
    },
    {
      field: "solventVol",
      alias: "vol%",
      excelKey: "vol%_",
    },
  ],
  fields,
  columns
);
const rowSet = makeRowSet(fields);
const errorMessage = "요청하신 샘플 내역이 없습니다";
export { fields, columns, rowSet, errorMessage };
