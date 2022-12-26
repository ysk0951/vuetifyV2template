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
    field: "rmav",
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
    field: "mw",
    alias: "분자량",
  },
  {
    field: "toxic_subs_yn",
    alias: "유독물질 유무",
  },
  {
    field: "stat_standard",
    alias: "법정 기준",
  },
  {
    field: "stat_standard_vol",
    alias: "법정 기준 함량",
  },
  {
    field: "toxic_no",
    alias: "유독물질번호",
  },
  {
    field: "new_subs_yn",
    alias: "신규물질여부",
  },
  {
    field: "gc_analy_not",
    alias: "GC분석불가",
  },
  {
    field: "init_boiling_p",
    alias: "초기끊는점",
  },
  {
    field: "ex_subs",
    alias: "기존물질",
  },
  {
    field: "toxic_subs",
    alias: "유독물질",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
