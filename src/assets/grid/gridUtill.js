import { ValueType } from "realgrid";
import _ from "lodash";

export function makeCell(count, value, fields, columns, width) {
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
          width: width ? width : "200px",
          fillWidth: width ? 0 : 1,
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

export function filterExel(input) {
  const row = { ...input };
  row["solventVol1"] = row["vol%"];
  row["solventVol2"] = row["vol%_1"];
  row["solventVol3"] = row["vol%_2"];
  row["solventVol4"] = row["vol%_3"];
  row["solventVol5"] = row["vol%_4"];
  row["solventVol6"] = row["vol%_5"];
  row["solventVol7"] = row["vol%_6"];
  row["solventVol8"] = row["vol%_7"];
  row["solventVol9"] = row["vol%_8"];
  row["solventVol10"] = row["vol%_9"];
  row["soltVol1"] = row["M,wt%"];
  row["soltVol2"] = row["M,wt%_1"];
  row["soltVol3"] = row["M,wt%_2"];
  row["soltVol4"] = row["M,wt%_3"];
  row["soltVol5"] = row["M,wt%_4"];
  row["addVol1"] = row["wt%"];
  row["addVol2"] = row["wt%_1"];
  row["addVol3"] = row["wt%_2"];
  row["addVol4"] = row["wt%_3"];
  row["addVol5"] = row["wt%_4"];
  row["addVol6"] = row["wt%_5"];
  row["addVol7"] = row["wt%_6"];
  row["addVol8"] = row["wt%_7"];
  row["addVol9"] = row["wt%_8"];
  row["addVol10"] = row["wt%_9"];
  row["addVol11"] = row["wt%_10"];
  row["addVol12"] = row["wt%_11"];
  row["addVol13"] = row["wt%_12"];
  row["addVol14"] = row["wt%_13"];
  row["addVol15"] = row["wt%_14"];
  return row;
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
  if (row) {
    return JSON.parse(row.data);
  }
}
