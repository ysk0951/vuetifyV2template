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
export function makeARow(fields) {
  const rowSet = _.reduce(
    fields,
    (a, v) => {
      if (v.excelKey) {
        a.push({
          key: v.fieldName,
          value: v.excelKey,
        });
      } else {
        a.push({
          key: v.fieldName,
        });
      }
      return a;
    },
    []
  );
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
export function makeSum(row) {
  const key = _.keys(row).filter((v) => v.includes("Vol"));
  let sum = 0;
  _.each(key, function (v) {
    sum += row[v];
  });
  row.sum = Math.floor(sum * 100) / 100;
  return row;
}

export function makeSampleSet(rows) {
  const key = ["name", "unit", "spec", "row", "mid", "hig"];
  let ret = [];
  _.each(rows, function (row) {
    const data = {};
    _.each(row, (col, idx) => {
      data[key[idx]] = col;
    });
    ret.push(data);
  });
  return JSON.stringify(ret);
}

export function showSampleSet(row) {
  console.log(row);
  if (row) {
    return JSON.parse(row.data);
  }
}
