import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
makeCell(
  1,
  [
    {
      field: "code",
      alias: "Code Grade",
      indexExclusive: true,
    },
  ],
  fields,
  columns
);
makeCell(
  1,
  [
    {
      field: "wwval",
      alias: "w/w",
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

const rowSet = _.reduce(
  fields,
  (a, v) => {
    if (v.excelKey) {
      a.push({
        key: v.fieldName,
        value: v.excelKey,
      });
    }
    return a;
  },
  []
);
export { fields, columns, rowSet };
