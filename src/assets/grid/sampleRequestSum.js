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
makeCell(
  3,
  [
    {
      field: "salt",
    },
    {
      field: "saltVol",
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
export { fields, columns, rowSet };
