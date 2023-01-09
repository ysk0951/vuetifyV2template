import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];
const data = [
  {
    field: "계정구분",
  },
  {
    alias: "로그인 방식",
    field: "logintype",
  },
  {
    field: "member_name",
    alias: "이름",
  },
  {
    alias: "이메일 주소",
    field: "memberId",
  },
  {
    field: "company",
    alias: "기업명",
  },
  {
    field: "phone",
    alias: "휴대폰 번호",
  },
  {
    field: "사번",
  },
  {
    field: "employee_status",
    alias: "재직",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});
export { fields, columns };
