import _ from "lodash";
import { makeCell } from "./gridUtill";
let fields = [];
let columns = [];

const data = [
  {
    field: "번호",
    indexExclusive: true,
  },
  {
    field: "이름",
    indexExclusive: true,
  },
  {
    field: "휴대폰번호",
    indexExclusive: true,
  },
  {
    field: "배송지",
    indexExclusive: true,
  },
  {
    field: "이메일주소",
    indexExclusive: true,
  },
  {
    field: "기업명",
    indexExclusive: true,
  },
  {
    field: "비고",
    indexExclusive: true,
  },
];

_.each(data, function (o) {
  makeCell(1, [o], fields, columns);
});

const height = 480;
export { height, fields, columns };
