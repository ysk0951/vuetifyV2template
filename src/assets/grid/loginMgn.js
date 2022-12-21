import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    alias: "계정구분",
  },
  {
    alias: "로그인 방식",
  },
  {
    alias: "이름",
  },
  {
    alias: "이메일 주소",
  },
  {
    alias: "기업명",
  },
  {
    alias: "휴대폰 번호",
  },
  {
    alias: "사번",
  },
  {
    alias: "재직",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  o.field = o.alias;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
