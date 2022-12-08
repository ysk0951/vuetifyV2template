import _ from "lodash";
import { ValueType } from "realgrid";

let fields = [];
let columns = [];
function makeCell(count, value) {
  for (var v = 1; v <= count; v++) {
    _.each(value, (o) => {
      const field = o.field;
      const needIndex = o.needIndex;
      fields.push({
        fieldName: `${field}${v}`,
        dataType: ValueType.TEXT,
      });
      columns.push({
        name: `${field}${v}`,
        fieldName: `${field}${v}`,
        type: "data",
        styles: {
          textAlignment: "center",
        },
        header: {
          text: needIndex ? `${field}${v}` : `${field}`,
          showTooltip: true,
        },
        editable: true,
      });
    });
  }
}
makeCell(8, [
  {
    field: "solvent.",
    needIndex: true,
  },
  {
    field: "vol%",
    needIndex: false,
  },
]);
makeCell(3, [
  {
    field: "Salt",
    needIndex: true,
  },
  {
    field: "M,wt%",
    needIndex: false,
  },
]);
makeCell(10, [
  {
    field: "Add.",
    needIndex: true,
  },
  {
    field: "wt%",
    needIndex: false,
  },
]);

export const rowSet = _.reduce(
  fields,
  (a, v) => {
    a.push(v.fieldName);
    return a;
  },
  []
);
const height = 480;
export { fields, columns, height };
