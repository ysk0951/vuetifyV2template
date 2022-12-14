import { ValueType } from "realgrid";
import _ from "lodash";

export function makeCell(count, value, fields, columns) {
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
          key: field,
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
