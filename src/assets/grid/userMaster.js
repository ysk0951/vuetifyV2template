import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];

const data = [
  {
    field: "번호",
  },
  {
    field: "이름",
  },
  {
    field: "휴대폰번호",
  },
  {
    field: "배송지",
  },
  {
    field: "이메일주소",
  },
  {
    field: "기업명",
  },
  {
    field: "비고",
  },
];

_.each(data, function (o) {
  o.indexExclusive = true;
  makeCell(1, [o], fields, columns);
});

export { fields, columns };
