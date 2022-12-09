import _ from "lodash";
import { ValueType } from "realgrid";

let fields = [];
let columns = [];
function makeCell(count, value) {
  for (var v = 1; v <= count; v++) {
    {
      _.each(value, (o) => {
        const field = o.field;
        const alias = o.alias;
        let excelKey;
        if (o.excelKey) {
          v > 1
            ? (excelKey = `${o.excelKey}${v - 1}`)
            : (excelKey = o.excelKey.slice(0, -1));
        }
        const indexExclusive = o.indexExclusive;
        let headerText = "";
        if (indexExclusive) {
          headerText = alias ? `${alias}` : `${field}`;
        } else {
          headerText = alias ? `${alias}${v}` : `${field}${v}`;
        }
        fields.push({
          fieldName: `${field}${v}`,
          dataType: ValueType.TEXT,
          excelKey,
        });
        columns.push({
          name: `${field}${v}`,
          fieldName: `${field}${v}`,
          type: "data",
          styles: {
            textAlignment: "center",
          },
          header: {
            text: headerText,
            showTooltip: true,
          },
          editable: true,
        });
      });
    }
  }
}
makeCell(8, [
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
]);
makeCell(3, [
  {
    field: "salt",
  },
  {
    field: "soltVal",
    alias: "M,wt%",
    indexExclusive: true,
    excelKey: "M,wt%_",
  },
]);
makeCell(10, [
  {
    field: "add",
  },
  {
    alias: "wt%",
    field: "addVol",
    indexExclusive: true,
    excelKey: "wt%_",
  },
]);

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
const height = 480;
export { fields, columns, height, rowSet };
