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
          headerText = alias ? `${alias}` : `${field}${v}`;
        }
        fields.push({
          fieldName: indexExclusive ? `${field}` : `${field}${v}`,
          dataType: o.date ? ValueType.DATE : ValueType.TEXT,
          datetimeFormat: o.date,
          excelKey,
        });
        columns.push({
          name: `${field}${v}`,
          fieldName: indexExclusive ? `${field}` : `${field}${v}`,
          key: field,
          type: "data",
          styles: {
            textAlignment: "center",
          },
          header: {
            text: headerText,
            showTooltip: true,
          },
          editable: false,
        });
      });
    }
  }
}

export function makeGroup(data, start, end, name) {
  const ret = [];
  const items = [];
  _.each(data, (v, i) => {
    if (i >= start && i < end) {
      items.push(v.field + "1");
    } else if (i === end) {
      items.push(v.field + "1");
      ret.push({
        name,
        items,
        direction: "horizontal",
        header: {
          text: name,
        },
      });
    } else {
      ret.push(v.field + "1");
    }
  });
  return ret;
}
export function makeRowSet(fields) {
  _.reduce(
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
}
export function makeARow(rowSet) {
  return [
    _.reduce(
      rowSet,
      (a, v) => {
        a[v.key] = "";
        return a;
      },
      {}
    ),
  ];
}
