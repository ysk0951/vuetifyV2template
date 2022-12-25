import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "code",
    alias: "자재코드",
  },
  {
    field: "ex_subs",
    alias: "원료약어",
  },
  {
    field: "chemical_name",
    alias: "화학물질명",
  },
  {
    field: "common_name",
    alias: "관용명 몇 이명",
  },
  {
    field: "cas_no",
    alias: "CAS NO",
  },
  {
    field: "init_boiling_p",
    alias: "분자량",
  },
  {
    field: "6",
    alias: "유독물질 유무",
  },
  {
    field: "stat_standard_vol",
    alias: "법정 기준",
  },
  {
    field: "8",
    alias: "법정 기준 함량",
  },
  {
    field: "rmav",
    alias: "유독물질번호",
  },
  {
    field: "10",
    alias: "신규물질여부",
  },
  {
    field: "11",
    alias: "GC분석불가",
  },
  {
    field: "12",
    alias: "초기끊는점",
  },
  {
    field: "13",
    alias: "기존물질",
  },
  {
    field: "14",
    alias: "유독물질",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
