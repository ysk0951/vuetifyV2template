import { makeCell, makeRowSet } from "./gridUtill";
let fields = [];
let columns = [];
makeCell(
  1,
  [
    {
      alias: "lot No",
      field: "lot_no",
      indexExclusive: true,
    },
  ],
  fields,
  columns
);
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
makeCell(
  3,
  [
    {
      field: "salt",
    },
    {
      field: "soltVol",
      alias: "M,wt%",
      excelKey: "M,wt%_",
    },
  ],
  fields,
  columns
);
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
const rowSet = makeRowSet(fields);
const errorMessage = "요청하신 샘플 내역이 없습니다";
export { fields, columns, rowSet, errorMessage };
