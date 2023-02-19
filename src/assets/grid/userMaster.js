import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];

const data = [
  {
    field: "member_name",
    alias: "이름",
  },
  {
    field: "phone",
    alias: "휴대폰번호",
  },
  {
    field: "address",
    alias: "기본 배송지",
  },
  {
    field: "email",
    alias: "이메일 주소",
  },
  {
    field: "company",
    alias: "기업명",
  },
  {
    field: "memo",
    alias: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
