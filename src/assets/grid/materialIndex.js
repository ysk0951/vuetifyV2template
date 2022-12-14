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
    alias: "원료약어",
  },
  {
    alias: "화학물질명",
  },
  {
    alias: "관용명 몇 이명",
  },
  {
    alias: "CAS NO",
  },
  {
    alias: "분자량",
  },
  {
    alias: "유독물질 유무",
  },
  {
    alias: "법정 기준",
  },
  {
    alias: "법정 기준 함량",
  },
  {
    alias: "유독물질번호",
  },
  {
    alias: "신규물질여부",
  },
  {
    alias: "GC분석불가",
  },
  {
    alias: "초기끊는점",
  },
  {
    alias: "기존물질",
  },
  {
    alias: "유독물질",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

const height = 480;
export { height, fields, columns };
