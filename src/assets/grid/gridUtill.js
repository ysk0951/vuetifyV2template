import { ValueType } from "realgrid";
import _ from "lodash";

export function makeCell(count, value, fields, columns, width, editable) {
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
          dataType: ValueType.TEXT,
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
          editable: editable ? editable : false,
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
  row["saltVol1"] = row["M,wt%"];
  row["saltVol2"] = row["M,wt%_1"];
  row["saltVol3"] = row["M,wt%_2"];
  row["saltVol4"] = row["M,wt%_3"];
  row["saltVol5"] = row["M,wt%_4"];
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
export function getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}
export function setNewSum(row) {
  let sum = 0;
  sum =
    Number(getNum(row["solventVol1"])) +
    Number(getNum(row["solventVol2"])) +
    Number(getNum(row["solventVol3"])) +
    Number(getNum(row["solventVol4"])) +
    Number(getNum(row["solventVol5"])) +
    Number(getNum(row["solventVol6"])) +
    Number(getNum(row["solventVol7"])) +
    Number(getNum(row["solventVol8"])) +
    Number(getNum(row["solventVol9"])) +
    Number(getNum(row["solventVol10"])) +
    Number(getNum(row["saltVol1"])) +
    Number(getNum(row["saltVol2"])) +
    Number(getNum(row["saltVol3"])) +
    Number(getNum(row["saltVol4"])) +
    Number(getNum(row["saltVol5"])) +
    Number(getNum(row["addVol1"])) +
    Number(getNum(row["addVol2"])) +
    Number(getNum(row["addVol3"])) +
    Number(getNum(row["addVol4"])) +
    Number(getNum(row["addVol5"])) +
    Number(getNum(row["addVol6"])) +
    Number(getNum(row["addVol7"])) +
    Number(getNum(row["addVol8"])) +
    Number(getNum(row["addVol9"])) +
    Number(getNum(row["addVol10"])) +
    Number(getNum(row["addVol11"])) +
    Number(getNum(row["addVol12"])) +
    Number(getNum(row["addVol13"])) +
    Number(getNum(row["addVol14"])) +
    Number(getNum(row["addVol15"]));
  row["sum"] = sum.toFixed(2);
  return row;
}
export function checkRowEmptcheck(row) {
  return !_.isEmpty(row["solventVol1"]) && !_.isEmpty(row["saltVol1"]);
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

export function makeSampleSet(rows, lotNo) {
  const key = ["spec", "unit", "vol", "low", "mid", "hig"];
  let ret = [];
  _.each(rows, function (row) {
    const data = {};
    _.each(row, (col, idx) => {
      data[key[idx]] = col;
    });
    data.lotNo = lotNo;
    ret.push(data);
  });
  return ret;
}

export function showSampleSet(row) {
  if (row && row.data) {
    return JSON.parse(row.data);
  }
}
