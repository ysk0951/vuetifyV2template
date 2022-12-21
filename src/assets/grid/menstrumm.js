import _ from "lodash";
import { makeCell } from "./gridUtill";
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
      indexExclusive: true,
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
      field: "soltVal",
      alias: "M,wt%",
      indexExclusive: true,
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
      indexExclusive: true,
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
      field: "밀도",
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
      field: "SUM",
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
      field: "비고",
      indexExclusive: true,
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
