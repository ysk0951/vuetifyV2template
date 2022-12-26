import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
makeCell(
  8,
  [
    {
      field: "solvent",
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
  5,
  [
    {
      field: "salt",
    },
    {
      field: "saltVal",
      alias: "M,wt%",
      excelKey: "M,wt%_",
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
